<template>
    <div>

    <v-card-title class="mx-auto mt-3">
        <h3 class="display-0.5 mx-auto"  > 
            {{ getInvoice.clientName }}
        </h3>
    </v-card-title>

    <!-- table Section -->

    <v-card width="500" class="mx-auto mt-3">
        <v-data-table
            :headers="headers"
            :items=getInvoiceData
            :items-per-page="5"
            class="elevation-1"
            hide-default-footer
            hide-default-header
        ></v-data-table>
    </v-card>
    
    <v-spacer></v-spacer>

    </div>
</template>

<script>


// import { mapGetters } from 'vuex';

export default {
  name: "DisplayInvoices",


  computed: {
    getInvoice () {
      console.log("here1")
      var invoice = this.$store.state.invoice
      // console.log("invo", invoice)
      return invoice
      // return this.$store.state.invoice
    },
    getInvoiceData () {
      console.log("here2")
      var invoice = this.$store.state.invoice
       var invoiceData = [
        {
            name: 'Invoice Number:',
            value: invoice.invoiceNumber,
        },
        {
            name: 'Date:',
            value: invoice.date,
        },
        {
            name: 'Discount:',
            value: invoice.discount,
        },
      ]
      return invoiceData
    },
    getInvoiceID () {
      console.log("here3")
    //   var id = this.$store.state.invoice
    //   console.log("the id", id)
    //   return id
      return this.$store.state.invoice
    },
  },


  data () {
    console.log("here1")
    return {
      invoice: null,
      InvoiceData: null,
      arrayItems: [],
        
      headers: [

        { 
            text: '', 
            value: 'name', 
            sortable: false,
        },
        { 
            text: '', 
            value: 'value',
            sortable: false,
        },
      ],
      headers1: [
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

      desserts2: [
        {
            invoiceNumber: 1234,
            client: 'Ulter Technologies',
            subtotal: 1000,
            discount: '0%',
            total: 1000,
        },
      ]
    }
  },
  
};
</script>

<style scoped>

#app .Erika .v-application--wrap {
    min-height: 0;
} 
</style>
