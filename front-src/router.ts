import { Router } from "@vaadin/router";
const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/login", component: "login-page" },
  { path: "/signup", component: "signup-page" },
  { path: "/instructions", component: "instructions-page" },
  { path: "/lost-pets", component: "lost-pets-page" },
  { path: "/report-pet", component: "report-pet-page" },
  { path: "/report-created", component: "report-created-page" },
  { path: "/user-data", component: "user-data-page" },
  { path: "/update-data", component: "update-data-page" },
  { path: "/update-password", component: "update-password-page" },
  { path: "(.*)", redirect: "/" },
]);
