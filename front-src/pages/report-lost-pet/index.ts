import { state } from "../../state.ts";
import { Router } from "@vaadin/router";
import { Dropzone } from "dropzone";
import { initMap } from "../../../lib/mapbox.ts";

class ReportPet extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    let myDropzone = new Dropzone("#dropzone", {
      url: "/falsa",
      clickable: true,
      autoProcessQueue: false,
    });
    myDropzone.on("thumbnail", (file) => {
      console.log(file.dataURL);
    });
    initMap();
  }
  render() {
    this.innerHTML = `
    <script id="search-js" defer="" src="https://api.mapbox.com/search-js/v1.0.0-beta.18/web.js"></script>
    <custom-header></custom-header>
    <h1>Repotar Mascota</h1>
    <p>Ingresá la siguiente información para realizar el reporte de la mascota</p>
    <form class="form">
    <label class="label">
    Nombre
    <input class="input" name="name" type="text" />
    </label>
    <div id="dropzone">Mi dropzone</div>
    <div id="map" style="width: 400px; height: 400px"></div>
    </form>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("report-pet-page", ReportPet);
