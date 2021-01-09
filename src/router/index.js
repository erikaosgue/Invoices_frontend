import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CreateItem from "../views/CreateItem.vue";
import CreateInvoice from "../views/CreateInvoice.vue";
import ShowInvoicesItems from "../views/ShowInvoicesItems"
import CreateFullInvoice from "../views/CreateFullInvoice"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/CreateInvoice",
    name: "CreateInvoice",
    component: CreateInvoice
  },
  {
    path: "/CreateItem",
    name: "CreateItem",
    component: CreateItem
  },
  {
    path: "/ShowInvoicesItems",
    name: "ShowInvoicesItems",
    component: ShowInvoicesItems
  },
  {
    path: "/CreateFullInvoice",
    name: "CreateFullInvoice",
    params: {},
    component: CreateFullInvoice
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
