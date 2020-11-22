import { clamp, sign } from "./math";

const accel = 3;
const dampening = 30;
const deltaMin = 1;
const vMax = 100;

const state = {
  velocity: 0,
  destination: 0,
  intervalId: null as number | null,
};

function vMul(delta: number) {
  return 1 - Math.exp(-delta / dampening);
}

function scrollStep() {
  const position = window.scrollY;
  const deltaSign = sign(state.destination - position);
  const delta = Math.abs(state.destination - position);

  if (delta < deltaMin) {
    window.scrollTo(0, state.destination);
    window.clearInterval(state.intervalId!);

    state.velocity = 0;
    state.destination = 0;
    state.intervalId = null;
  } else {
    state.velocity =
      clamp(state.velocity + deltaSign * accel, -vMax, vMax) * vMul(delta);

    if (Math.abs(state.velocity) < 1) {
      state.velocity = Math.sign(state.velocity)
    }

    window.scrollTo(0, window.scrollY + state.velocity);
  }
}

export function scrollToCenter(element: HTMLElement) {
  const { height } = element.getBoundingClientRect();

  state.destination = clamp(
    element.offsetTop - (window.innerHeight - height) / 2,
    0,
    Infinity
  );

  // restart animation if it's not running
  if (state.intervalId === null) {
    state.intervalId = window.setInterval(scrollStep, 10);
  }
}
