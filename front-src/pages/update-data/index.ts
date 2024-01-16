import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class UpdateData extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {}

  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    soy el update data
    `;
    this.addListeners();
  }
}
customElements.define("update-data-page", UpdateData);
