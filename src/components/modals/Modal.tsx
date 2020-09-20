import React from "react";
import ReactDOM from "react-dom";

import "../../css/Modal.css";

interface Props {
  title: string;
  onRequestHide: (() => void) | null;
}

export class Modal extends React.Component<Props> {
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
    return ReactDOM.createPortal(
      <>
        <div className="title">{this.props.title}</div>
        <div className="content">{this.props.children}</div>
      </>,
      this.modalDiv
    );
  };
}
