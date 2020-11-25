import React from "react";
import ReactDOM from "react-dom";

import "../../css/Modal.css";

export interface ModalProps {
  onRequestHide?: (() => void);
}

export class Modal extends React.Component<ModalProps> {
  modalDiv = document.createElement("div");
  modalOverlay = document.getElementById("modal-overlay");

  constructor(props: ModalProps) {
    super(props);
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
    this.props.onRequestHide?.();
  };

  render = () => {
    return ReactDOM.createPortal(
      this.props.children,
      this.modalDiv
    );
  };
}
