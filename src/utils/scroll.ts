import { clamp, sign } from "./math";

const accel = 5;
const dampening = 50;
const deltaMin = 5;
const vMax = 100;

const state = {
  container: null as HTMLElement | null,
  velocity: 0,
  destination: 0,
  intervalId: null as number | null,
};

function vMul(delta: number) {
  return 1 - Math.exp(-delta / dampening);
}

function scrollStep() {
  const position = state.container!.scrollTop;
  const deltaSign = sign(state.destination - position);
  const delta = Math.abs(state.destination - position);

  if (delta < deltaMin) {
    state.container!.scrollTop = state.destination;
    window.clearInterval(state.intervalId!);

    state.container = null;
    state.velocity = 0;
    state.destination = 0;
    state.intervalId = null;
  } else {
    state.velocity =
      clamp(state.velocity + deltaSign * accel, -vMax, vMax) * vMul(delta);

    state.container!.scrollTop += state.velocity;
  }
}

export function scrollToCenter(element: HTMLElement) {
  state.container = element.parentElement;

  const { height } = element.getBoundingClientRect();
  state.destination = clamp(
    element.offsetTop - (window.innerHeight - height) / 2,
    0,
    state.container!.scrollHeight - state.container!.clientHeight
  );

  // restart animation if it's not running
  if (state.intervalId === null) {
    state.intervalId = window.setInterval(scrollStep, 10);
  }
}
