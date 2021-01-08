<template>
  <v-app>
    <v-card-title class="mx-auto mt-3">
        <h2 class="display-0.5" >INVOICES </h2>
    </v-card-title>

    <!-- table Section -->

    <v-card width="800" class="mx-auto mt-3">
        <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="20"
            class="elevation-1"
            hide-default-footer
        ></v-data-table>
    </v-card>
    
    <!-- Button Create New Invoice -->
    <v-card
      width="130" 
      class="mx-auto mt-10"
      flat
    >
        <div class="d-flex flex-row-reverse">
            <v-btn
            class="ma-2"
            outlined
            color="indigo"
            to="/CreateInvoice">New Invoice

            </v-btn>
        </div>
    </v-card>

  </v-app>
</template>

<script>

import axios from 'axios';

export default {
  name: "MainHome",
  
  mounted: function(){
    axios.get('http://localhost:8084/api/v1/invoices')
      .then((response) => {
        var invoiceData = response.data
        for (var i=0; i < invoiceData.length; i++){
          var data = invoiceData[i]
          var object = {
              invoiceNumber: data.invoice_number,
              client: data.client_name,
              subtotal: data.subtotal,
              discount: data.discount,
              total: data.total,
            }
          this.desserts.push(object)
        }
    });
  },

  data () {

    return {

      headers: [
        {
            text: 'Invoice Number',
            align: 'start',
            sortable: false,
            value: 'invoiceNumber',
        },
        { 
            text: 'Client', 
            value: 'client', 
            sortable: false,
        },
        { 
            text: 'Subtotal', 
            value: 'subtotal', 
            sortable: false,
        },
        { 
            text: 'Discount', 
            value: 'discount', 
            sortable: false,
        },
        { 
            text: 'Total', 
            value: 'total',
            sortable: false,
        },
      ],

      desserts: [
      ]
    }
  },
};
</script>

<style scoped></style>
