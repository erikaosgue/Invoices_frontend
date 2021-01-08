<template>
    <div>

    <v-card-title class="mx-auto mt-3">
        <h3 class="display-0.5 mx-auto"  > 
            {{ getInvoice.client_name }}
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
      var invoice = this.$store.state.invoice

      if (Object.keys(invoice).length == 0) {
        invoice = JSON.parse(sessionStorage.invoice)
      }
      return invoice
    },
    getInvoiceData () {
      var invoice = this.$store.state.invoice
      if (Object.keys(invoice).length == 0) {
          invoice = JSON.parse(sessionStorage.invoice)
      }
      var new_date = this.my_split(invoice.date)
       var invoiceData = [
        {
            name: 'Invoice Number:',
            value: invoice.invoice_number,
        },
        {
            name: 'Date:',
            value: new_date,
        },
        {
            name: 'Discount:',
            value: invoice.discount,
        },
      ]
      return invoiceData
    },
  },
  methods: {
    my_split(str) {

      var n = str.split(" ")
      var new_str = n[1] + '/' + n[2] + '/' + n[3]
      return new_str

    }
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
