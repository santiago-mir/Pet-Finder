import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class Login extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    const formEl = this.querySelector(".form");
    formEl?.addEventListener("submit", (event) => {
      event.preventDefault();
      let target = event.target as any;
      state.signInUser(target.email.value, target.password.value);
      state.suscribe(() => {
        Router.go("/home");
      });
    });
  }
  render() {
    const loginURL = require("url:../../assets/login.png");
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="login-container">
    <h1>Iniciar Sesion</h1>
    <p>Ingresa tu mail y contraseña para iniciar sesion</p>
    <form class="form">
    <label class="label">
    Email
    <input class="input" name="email" type="email" />
    </label>
    <label class="label">
    Contraseña
    <input class="input" name="password" type="text" />
    </label>
    <button class="button">Inicia sesion</button>
    </form>
    <p>¿Aun no tenes cuenta? <a href="./signup">Registrate</a> </p>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("login-page", Login);
