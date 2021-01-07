import Vue from "vue";
import Vuex from "vuex";

//load vuex
Vue.use(Vuex);

//create store

// import axios from 'axios'
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
      state.invoice['clientName'] = invoiceObject.client_name
      state.invoice.discount = invoiceObject.discount
      state.invoice.date = invoiceObject.date
      state.invoice.invoiceNumber = invoiceObject.invoice_number
      state.invoice.id = invoiceObject.id
    },
    updateItems(state, itemsArray) {
      console.log("mutations ", itemsArray)
      state.items = itemsArray
    }
  },

  actions: {
    recieveInvoice({ commit }, invoice) {
      commit('updateInvoice', invoice)
    },

    // async recieveItems({ commit, state}) {
    //   const response = await axios.get(
    recieveItems ({ commit }, itemsArray) {
      console.log(itemsArray)

      // console.log("actions///", getters.getInvoiceID)
      // axios.get(
      //     'http://localhost:8084/api/v1/invoices/' + state.invoice.id)
      //     .then((response) => {
      //     let data = response.data
      //     console.log("in actions", data.items)
      //     // for (var i=0; i < this.clientsData.length; i++){
      //     //   var data = this.clientsData[i] 
      //     //     var object = {
      //     //       name: data.name, 
      //     //       id: data.id
      //     //       }
      //     //   this.items.push(object)
      //     // }
          // commit('updateItems', data.items)
          var getInvoiceID = []
          commit('updateItems', getInvoiceID)

      // })
      // .catch(error => {
      //   console.log(error.response)
      // });
        
          // for (var i=0; i < invoice.length; i++){
          //   var data = this.clientsData[i] 
          //     var object = {
          //       name: data.name, 
          //       id: data.id
          //       }
          //   this.items.push(object)
          // }
     
      
    },     
  },
  modules: {},

  getters: {
    getInvoice: (state) => {
      return state.invoice
    },
    getItems: (state) => {
      return state.items
    },
    getInvoiceID: (state) => {
      console.log("getter", state.invoice.id)
      return state.invoice.id
    },
  },

});
