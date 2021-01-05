<template>
    <div>
    <v-card-title class="mx-auto mt-3">
        <h3 class="display-0.5 mx-auto"  > 
          <!-- <div id="invoice-info"> 
            {{ invoice }}
          </div> -->
        </h3>
    </v-card-title>

    <!-- table Section -->

    <v-card width="500" class="mx-auto mt-3">
        <v-data-table
            :headers="headers"
            :items="desserts"
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


import axios from 'axios';

export default {
  name: "DisplayInvoices",
  // props: ['invoice'],

  mounted: function(){
      console.log("=>",this.$route.params)
      var url = 'http://localhost:8084/api/v1/invoices/' + this.$route.params.invoice_id
      console.log(url)
      axios.get(url)
        .then((response) => {
          this.InvoiceData = response.data
          console.log("==>", this.InvoiceData)
          for (var i=0; i < this.InvoiceData.length; i++){
            var data = this.InvoiceData[i]
            var object = {
              invoiceNumber: data.invoice_number,
              client: data.client_name,
              date: data.date,
            }
            this.invoice.push(object)
            console.log("==>", this.invoice)
          }
      })
      .catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },

  data () {
    return {
      // invoice: null,
      InvoiceData: null,
      client_id: this.$route.params.id,
        
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

      desserts: [
        {
            name: 'Invoice Number:',
            value: '1234',
        },
        {
            name: 'Date:',
            value: '21/12/2020',
        },
        {
            name: 'Discount:',
            value: '0%',
        },
      ]
    }
  }
};
</script>

<style scoped>

#app .Erika .v-application--wrap {
    min-height: 0;
} 
</style>

