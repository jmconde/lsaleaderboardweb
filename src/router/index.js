import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Aircrafts from '../views/Aircrafts.vue';
import PilotsList from '../views/PilotsList.vue';
import LiveMap from '../views/LiveMap.vue';
import Map from '../views/Map.vue';
import FlightLog from '../views/FlightLog.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/alltime",
    name: "All Time",
    component: PilotsList,
    // component: () => import(/* webpackChunkName: "about" */ "../views/Leaderboard.vue"),
  },
  {
    path: "/aircrafts",
    name: "Aircrafts",
    component: Aircrafts,
  },
  {
    path: "/live",
    name: "LiveMap",
    component: Map,
  },
  {
    path: "/log",
    name: "FlightLog",
    component: FlightLog,
  },
];

const router = new VueRouter({
  mode: "hash",
  routes
});


export default router;