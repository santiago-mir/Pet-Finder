import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class UpdatePassword extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {}

  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    soy el update password
    `;
    this.addListeners();
  }
}
customElements.define("update-password-page", UpdatePassword);
