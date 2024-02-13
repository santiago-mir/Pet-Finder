import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class UpdatePassword extends HTMLElement {
  connectedCallback() {
    if (!state.getToken()) {
      Router.go("/home");
    }
    this.render();
  }
  addListeners() {
    const formEl = this.querySelector(".form");
    formEl?.addEventListener("submit", (event) => {
      event.preventDefault();
      let target = event.target as any; // cast target;
      state.updateUserPassword(
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
  }

  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="login-container">
    <h1 class="text">Actualiza tu Contraseña</h1>
    <form class="form">
    <label class="label">
    Nueva Contraseña
    <input class="input password" name="password" type="password" />
    </label>
    <label class="label">
    Confirmar nueva contraseña
    <input class="input password" name="confirmation" type="password" />
    <span>Mostrar contraseña <input class="checkbox" type="checkbox"/></span>
    </label>
    <button class="button">Guardar</button>
    </form>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("update-password-page", UpdatePassword);
