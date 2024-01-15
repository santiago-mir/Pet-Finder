import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class LostPets extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {}
  render() {
    this.innerHTML = `
    soy lost pets
    `;
    this.addListeners();
  }
}
customElements.define("lost-pets-page", LostPets);
