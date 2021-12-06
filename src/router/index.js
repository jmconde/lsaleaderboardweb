import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Leaderboard from '../views/Leaderboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/all-time",
    name: "All Time",
    component: Leaderboard,
    // component: () => import(/* webpackChunkName: "about" */ "../views/Leaderboard.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});


export default router;