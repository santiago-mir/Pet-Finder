import { state } from "../../state.ts";
import { Router } from "@vaadin/router";
import { Dropzone } from "dropzone";
import { initMap } from "../../../lib/mapbox.ts";

class ReportPet extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    let dataURL;
    let myDropzone = new Dropzone("#dropzone", {
      url: "/falsa",
      clickable: true,
      autoProcessQueue: false,
    });
    myDropzone.on("thumbnail", (file) => {
      dataURL = file.dataURL;
    });
    const locationData = initMap();
    const formEl = this.querySelector(".form");
    formEl?.addEventListener("submit", (event) => {
      event.preventDefault();
      let target = event.target as any;
      console.log(target.name.value, dataURL, locationData);
    });
  }
  render() {
    this.innerHTML = `
    <script id="search-js" defer="" src="https://api.mapbox.com/search-js/v1.0.0-beta.18/web.js"></script>
    <custom-header></custom-header>
    <div class="report-container">
    <h1>Repotar Mascota</h1>
    <p>Ingresá la siguiente información para realizar el reporte de la mascota</p>
    <form class="form">
    <label class="label">
    Nombre
    <input class="input" name="name" type="text" />
    </label>
    <div id="dropzone">Subi una imagen de tu mascota</div>
    <h3>Donde viste a tu mascota por ultima vez?</h3>
    <div id="map" style="width: 400px; height: 400px"></div>
    <button type="submit" class="button"> Reportar Mascota </button>
    <button class="button"> Cancelar </button>
    </form>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("report-pet-page", ReportPet);
