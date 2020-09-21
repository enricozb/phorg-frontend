import React, { ReactElement } from "react";
import ReactDOM from "react-dom";

import "../../css/Modal.css";
import { ReactComponent as TimesSVG } from "../../img/times.svg";

interface Props {
  title: string;
  onRequestHide: (() => void) | null;
  leftButton: ReactElement | null;
  rightButton: ReactElement | null;
}

export class Modal extends React.Component<Props> {
  public static defaultProps = {
    onRequestHide: null,
    leftButton: null,
    rightButton: null,
  };

  modalDiv: HTMLDivElement;
  modalOverlay = document.getElementById("modal-overlay");

  constructor(props: Props) {
    super(props);
    this.modalDiv = document.createElement("div");
    this.modalDiv.classList.add("modal");
    this.modalOverlay!.onclick = this.clickOutside;
  }

  componentDidMount = () => {
    this.modalOverlay!.style.display = "flex";
    document.getElementById("modal-overlay")!.appendChild(this.modalDiv);
  };

  componentWillUnmount = () => {
    this.modalOverlay!.style.display = "none";
    document.getElementById("modal-overlay")!.removeChild(this.modalDiv);
  };

  clickOutside = (e: Event) => {
    if (e.target === this.modalOverlay) {
      this.requestHide();
    }
  };

  requestHide = () => {
    if (this.props.onRequestHide) {
      this.props.onRequestHide();
    }
  };

  render = () => {
    const closeModalButton = (
      <button className="icon" onClick={this.requestHide}>
        <TimesSVG />
      </button>
    );

    const closeButtonVisibile =
      this.props.onRequestHide === null ? "hidden" : "visible";
    const rightButton = this.props.rightButton ?? closeModalButton;
    const rightVisible = this.props.rightButton === null ? "hidden" : "visible";

    return ReactDOM.createPortal(
      <>
        <div className="title">
          <div style={{ visibility: closeButtonVisibile }}>{closeModalButton}</div>
          <div>{this.props.title}</div>
          <div style={{ visibility: rightVisible }}>{rightButton}</div>
        </div>
        <div className="content">{this.props.children}</div>
      </>,
      this.modalDiv
    );
  };
}
