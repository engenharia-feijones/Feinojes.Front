import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import IndexHome from "../views/Home/Index.vue";
import IndexAbout from "../views/About/Index.vue";
import IndexService from "../views/Service/Index.vue";

const routes = [
  { path: "/", name: "Home", component: IndexHome },
  { path: "/about", name: "About", component: IndexAbout },
  { path: "/services", name: "Service", component: IndexService },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name === "Home" && !from.name) {
    const { data } = await axios.get("https://api.db-ip.com/v2/free/self");
    const ipAddress = { ip: data.ipAddress, date: "" };
    axios.post("https://ssacapsapi.azurewebsites.net/api/AcessIP", ipAddress);
  }

  next();
});

// router.beforeEach(async (to, from, next) => {
//   if (to.name === "Home" && !from.name) {
//     const { data } = await axios.get("http://ip-api.com/json");
//     const ipAddress = {
//       ip: data.query,
//       latitude: data.lat?.toString(),
//       longitude: data.lon?.toString(),
//       city: data.city,
//       region: data.region,
//     };
//     axios.post("https://traceripapi.azurewebsites.net/api/AcessIP", ipAddress);
//   }

//   next();
// });
export default router;
