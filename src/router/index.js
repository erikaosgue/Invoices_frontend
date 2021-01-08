import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CreateItem from "../views/CreateItem.vue";
import CreateInvoice from "../views/CreateInvoice.vue";
import ShowInvoicesItems from "../views/ShowInvoicesItems"
import CreateFullInvoice from "../views/CreateFullInvoice"
// import DisplayInvoices from "../components/DisplayInvoices"


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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/CreateInvoice.vue")
  },
  {
    path: "/CreateItem",
    name: "CreateItem",
    component: CreateItem
  },
  {
    path: "/ShowInvoicesItems",
    // path: "/ShowInvoicesItems/:id",
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
