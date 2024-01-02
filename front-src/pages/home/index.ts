import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class Home extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    const buttonEl = this.querySelector(".button");
    buttonEl?.addEventListener("click", () => {
      Router.go("/login");
    });
  }
  render() {
    this.innerHTML = `
    <button class="button">Soy la home</button>
    `;
    this.addListeners();
  }
}
customElements.define("home-page", Home);
