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
    <custom-header></custom-header>
  
    <div><h1>Contenido de la pagina</h1></div>

    <button class="button">Dar mi Ubicacion Actual </button>
    <div></div>
    <button class="button">Como funciona Pet Finder?</button>
    `;
    this.addListeners();
  }
}
customElements.define("home-page", Home);
