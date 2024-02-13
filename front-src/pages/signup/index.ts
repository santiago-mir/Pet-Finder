import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class Signup extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    const formEl = this.querySelector(".form");
    formEl?.addEventListener("submit", (event) => {
      event.preventDefault();
      let target = event.target as any;
      state.signUpUser(
        target.name.value,
        target.email.value,
        target.password.value,
        target.confirmation.value
      );
    });
    const showPassword = document.querySelector(".checkbox");
    const password = document.querySelectorAll(".password");
    showPassword?.addEventListener("click", (ev) => {
      let showPassCast = showPassword as any; // cast
      let passCast = password as any; // cast
      if (showPassCast.checked) {
        for (let element of passCast) {
          element.type = "text";
        }
      } else {
        for (let element of passCast) {
          element.type = "password";
        }
      }
    });
    state.suscribe(() => {
      Router.go("/home");
    });
  }
  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="login-container">
    <h1 class="title">Registrate</h1>
    <p class="text">Ingresa los siguientes datos para realizar el registro</p>
    <form class="form">
    <label class="label">
    Nombre
    <input class="input" name="name" type="text" />
    </label>
    <label class="label">
    Email
    <input class="input" name="email" type="email" />
    </label>
    <label class="label">
    Contraseña
    <input class="input password" name="password" type="password" />
    </label>
    <label class="label">
    Confirmar contraseña
    <input class="input password" name="confirmation" type="password" />
    <span>Mostrar contraseña <input class="checkbox" type="checkbox"/></span>
    </label>
    <button class="button">Registrarme</button>
    </form>
    <p class="text">¿Ya tenes cuenta? <a href="./login">Inicia Sesion</a> </p>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("signup-page", Signup);
