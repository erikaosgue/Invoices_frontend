<template>
  <v-app>
        <!-- table Section -->

        <v-card width="700" class="mx-auto mt-15">
            <v-card-title class="mx-auto mt-3">
                <h2 class="display-0.5"  > {{ getInvoice.client_name }}</h2>
            </v-card-title>
            <v-data-table
                :headers="headers1"
                :items=getInvoiceData
                :items-per-page="5"
                class="elevation-0"
                hide-default-footer
                hide-default-header
                
            ></v-data-table>

            <v-card width="700" class="mx-auto mt-5" flat>
                <v-card-title class="mx-auto">
                    <h5 class="display-0.5"> List Items </h5>
                </v-card-title>
            </v-card>
            <v-data-table
                :headers="headers2"
                :items="allItems"
                :items-per-page="5"
                hide-default-footer
                class="elevation-0">

                <template v-slot:no-data>
                    <v-alert :value="true" color="grey" class="mb-4 mt-4">
                    You have no items
                    </v-alert>
                </template>
        
            </v-data-table>
        
            <v-card-title class="mx-auto mt-3">
                <h5 class="display-0.5"  > Total</h5>
            </v-card-title>
            <v-data-table
                :headers="headers3"
                :items="desserts3"
                :items-per-page="5"
                class="elevation-1"
                hide-default-footer
                hide-default-header>
            </v-data-table>
        </v-card>



        <!-- hide-default-footer -->

        <v-card width="700" class="mx-auto  mb-10">
        </v-card>


        <v-card width="700" class="mx-auto mb-15" flat>
            <div class="text-center">
                <v-btn
                    color="primary"
                    class="mr-2 mb-15 mt-0"  
                    @click="$router.push('CreateInvoice')">Create a New Invoice
                </v-btn>
            </div>
        </v-card>
        

  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios'
import { mapFields } from 'vuex-map-fields';
export default {
  name: "DisplayFullInvoice",

  
    
  mounted: function() {
      var invoice = JSON.parse(sessionStorage.invoice)

      console.log("mounted")
        axios.get('http://localhost:8084/api/v1/invoices/' + invoice.id + '/items')
        .then((response) => {
            let arrayItems = response.data
            console.log("array", arrayItems)
            for(let i = 0; i < arrayItems.length; i++) {
                var object = {
                    item_number: arrayItems[i].item_number,
                    item_name: arrayItems[i].name,
                    item_price: arrayItems[i].price.toString() + " USD",
                    total: arrayItems[i].total.toString() + " USD",
                    quantity: arrayItems[i].quantity,
                }
                this.allItems.push(object)
            }
        });
        axios.get('http://localhost:8084/api/v1/invoices/' + invoice.id)
        .then((response) => {
            var data = response.data
            
            this.desserts3 = [
                {
                    name: 'Subtotal:',
                    value: data.subtotal.toString() + " USD"
                },
                {
                    name: 'Discount:',
                    value: data.discount.toString() + "%"
                },
                {
                    name: 'Total:',
                    value: data.total.toString() + " USD"
                },
            ]
        })
        .catch(error => {
            console.log("error message", error.response)
        })      
        return this.allItems

  },

  computed: {
    ...mapGetters(['getInvoice', 'getAllItems']),
    ...mapFields(['items', 'invoice']),
    
    getInvoiceData () {
      var invoice = this.$store.state.invoice
      if (Object.keys(invoice).length == 0) {
          invoice = JSON.parse(sessionStorage.invoice)
      }
      var new_date = this.my_split(invoice.date)
       var invoiceData = 
       [
        {name: 'Invoice Number:', value: invoice.invoice_number},
        {name: 'Date:',value: new_date},
        {name: 'Discount:',value: invoice.discount.toString() + "%"}
       ]
      return invoiceData
    },
    getInvoice() {
      var invoice = this.$store.state.invoice
      if (Object.keys(invoice).length == 0) {
          invoice = JSON.parse(sessionStorage.invoice)
      }
      return invoice
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
        
        headers1: [
            
            { 
            text: '', 
            value: 'name', 
            sortable: false,
            align: 'start'
        },
        { 
            text: '', 
            value: 'value',
            sortable: false,
            align: 'start'
        },
      ],
        allItems: [],

        headers2: [
            {
                text: 'Invoice Number',
                align: 'start',
                sortable: false,
                value: 'item_number',
            },
            { 
                text: 'Description', 
                value: 'item_name', 
                sortable: false,
                align: 'start'

            },
             { 
                text: 'Price', 
                value: 'item_price', 
                sortable: false,
                align: 'start'

            },
            { 
                text: 'Quantity', 
                value: 'quantity', 
                sortable: false,
                align: 'start'

            },
            { 
                text: 'Total', 
                value: 'total',
                sortable: false,
                align: 'start'
            },
        ],
    
       headers3: [
          {
            sortable: false,
            value: 'name',
            align: 'start'
          },
          {
            sortable: false,
            value: 'value',
            align: 'start'
          },

       ],
       desserts3: [],
    }
  }
};
</script>

<style scoped></style>
