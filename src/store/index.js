import Vue from "vue";
import Vuex from "vuex";

//load vuex
Vue.use(Vuex);

//create store

import axios from 'axios'
import { updateField, getField  } from 'vuex-map-fields'
export default new Vuex.Store({
  
  state: {
    invoice: {
      invoiceNumber: 0,
      clientName: 'Erika',
      discount: '0',
      date: '13-abril-1994',
      id: 0
    },
    items: [
    ]
  },
  mutations: {
    updateInvoice(state, invoiceObject) {
      
      state.invoice.clientName = invoiceObject.client_name
      state.invoice.discount = invoiceObject.discount
      state.invoice.date = invoiceObject.date
      state.invoice.invoiceNumber = invoiceObject.invoice_number
      state.invoice.id = invoiceObject.id
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
    getField
  },

});
