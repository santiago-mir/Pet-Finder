import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class Login extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    const buttonEl = this.querySelector(".button");
    buttonEl?.addEventListener("click", () => {
      Router.go("/home");
    });
  }
  render() {
    this.innerHTML = `
    <button class="button">Soy El login</button>
    `;
    this.addListeners();
  }
}
customElements.define("login-page", Login);
