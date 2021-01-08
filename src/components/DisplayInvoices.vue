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
      console.log("invoice Gettter", invoice)
      return invoice
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
  },


  data () {
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
  
    }
  },
  
};
</script>

<style scoped>

#app .Erika .v-application--wrap {
    min-height: 0;
} 
</style>
