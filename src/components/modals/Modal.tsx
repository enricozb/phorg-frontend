import React from "react";
import ReactDOM from "react-dom";

import "../../css/Modal.css";

interface Props {
  onRequestHide: (() => void) | null;
}

export class Modal extends React.Component<Props> {
  public static defaultProps = {
    onRequestHide: null,
  };

  modalDiv = document.createElement("div");
  modalOverlay = document.getElementById("modal-overlay");

  constructor(props: Props) {
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
    if (this.props.onRequestHide) {
      this.props.onRequestHide();
    }
  };

  render = () => {
    return ReactDOM.createPortal(
      this.props.children,
      this.modalDiv
    );
  };
}
