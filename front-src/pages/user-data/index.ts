import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class UserData extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {}

  render() {
    this.innerHTML = `
    soy la user data
    `;
    this.addListeners();
  }
}
customElements.define("user-data-page", UserData);
