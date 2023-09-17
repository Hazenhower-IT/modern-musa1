import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Models3D from "../views/Models3D.vue";
import Illustrazioni from "../views/Illustrazioni.vue";
import Grafica from "../views/Grafica.vue";
import MotionGraphics from "../views/MotionGraphics.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/models-3d",
      name: "Models3D",
      component: Models3D,
    },
    {
      path: "/illustrazioni",
      name: "illustrazioni",
      component: Illustrazioni,
    },
    {
      path: "/grafica",
      name: "grafica",
      component: Grafica,
    },
    {
      path: "/motion-graphics",
      name: "motionGraphics",
      component: MotionGraphics,
    },

  ],
});

export default router;
