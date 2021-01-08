import Vue from "vue";
import Vuex from "vuex";

//load vuex
Vue.use(Vuex);

//create store

import axios from 'axios'

import { updateField, getField  } from 'vuex-map-fields'

export default new Vuex.Store({
  
  state: {
    invoice: {},
    items: []
  },
  mutations: {
    updateInvoice(state, invoiceObject) {

      state.invoice = invoiceObject
      console.log(state.invoice)
      
     
    },
    updateItems(state, itemsArray) {
      state.items = itemsArray
    },
    updateField
  },

  actions: {
    recieveInvoice({ commit }, invoice) {
      commit('updateInvoice', invoice)
    },

    
    recieveItems ({ commit }, invoice_id) {

      axios.get(
          'http://localhost:8084/api/v1/invoices/' + invoice_id + '/items')
          .then((response) => {
          let arrayItems = response.data
          commit('updateItems', arrayItems)
          })
          .catch(error => {
            console.log("error message", error.response)
          })      
    },     
  },
  modules: {},

  getters: {
    getInvoice(state) {
      console.log("The getter items",state.items)
      return state.invoice
    },
    getAllItems(state) {
      return state.items
    },
    getField
  },

});
