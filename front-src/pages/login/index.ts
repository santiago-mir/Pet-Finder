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
    const showPassword = document.querySelector(".checkbox");
    const password = document.querySelector(".password");
    showPassword?.addEventListener("click", (ev) => {
      let showPassCast = showPassword as any; // cast
      let passCast = password as any; // cast
      if (showPassCast.checked) {
        passCast.type = "text";
      } else {
        passCast.type = "password";
      }
    });
  }
  render() {
    const loginURL = require("url:../../assets/login.png");
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="login-container">
    <h1 class="title">Iniciar Sesion</h1>
    <p class="text">Ingresa tu mail y contraseña para iniciar sesion</p>
    <form class="form">
    <label class="label">
    Email
    <input class="input" name="email" type="email" />
    </label>
    <label class="label">
    Contraseña
    <input class="input password" name="password" type="password" />
    <span>Mostrar contraseña <input class="checkbox" type="checkbox"/></span>
    </label>
    <button class="button">Inicia sesion</button>
    </form>
    <p class="text">¿Aun no tenes cuenta? <a href="./signup">Registrate</a> </p>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("login-page", Login);
