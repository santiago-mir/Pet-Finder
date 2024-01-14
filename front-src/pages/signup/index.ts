import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class Signup extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {}
  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="login-container">
    <h1>Registrate</h1>
    <p>Ingresa los siguientes datos para realizar el registro</p>
    <form class="form">
    <label class="label">
    Email
    <input class="input" name="email" type="email" />
    </label>
    <label class="label">
    Contraseña
    <input class="input" name="password" type="text" />
    </label>
    <label class="label">
    Confirmar contraseña
    <input class="input" name="confirm-password" type="text" />
    </label>
    <button class="button">Registrarme</button>
    </form>
    <p>¿Ya tenes cuenta? <a href="./login">Inicia Sesion</a> </p>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("signup-page", Signup);
