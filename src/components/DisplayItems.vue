<template>
  <v-app>
    <div>
        <v-card width="105" class="mx-auto mt-10 mb-0" flat>
            <v-card-title class="mx-auto">
                <h3 class="display-0.5 " > Items </h3>
            </v-card-title>
        </v-card>

    <!-- table Section -->

        <v-card width="700" class="mx-auto mt-3 mb-0 erika">
            <v-data-table
                :headers="headers"
                :items=allItems
                :items-per-page="10"
                class="elevation-1"
                hide-default-footer
            >
                <template v-slot:no-data>
                  <v-alert :value="true" color="grey">
                    No items have been created
                  </v-alert>
                </template>
            </v-data-table>
        </v-card>

        <div class="text-center pt-5">
          <v-btn
            color="primary"
            class="mr-2"  
            @click="addItem">
            Add Item
          </v-btn>
            <v-btn
              class="mr-2"
              color="primary"
              @click="$router.push('CreateFullInvoice')">
              Finish & view Invoice
             
            </v-btn>
        </div>
    </div>
  </v-app>
</template>

<script>

import axios from 'axios';
import { mapFields } from 'vuex-map-fields' 

export default {
  name: "DisplayItems",

  mounted: function() {
    
    var invoice = JSON.parse(sessionStorage.invoice)

        axios.get('http://localhost:8084/api/v1/invoices/' + invoice.id + '/items')
        .then((response) => {
            let arrayItems = response.data
            for(let i = 0; i < arrayItems.length; i++) {
                var object = {
                  product_id: arrayItems[i].item_number,
                  product_name: arrayItems[i].name,
                  quantity: arrayItems[i].quantity,
                }
                this.allItems.push(object)
            }
          })
          .catch(e => {
              console.log(e.response)
            });
        return this.allItems

  },

  computed: {

    ...mapFields(['items', 'invoice']),

    getItems () {
      
      var items = this.items
      var displayItems = []
      for(let i = 0; i < items.length; i++) {
        var objetc = {
            product_id: items[i].item_number,
            product_name: items[i].name,
            quantity: items[i].quantity,
        }
        displayItems.push(objetc)
      }
      return displayItems
    },
    

  },

  data () {
    return {
      allItems: [],
     
      headers: [
        {
            text: 'Product ID', 
            align: 'center',
            sortable: false,
            value: 'product_id',
        },
        { 
            text: 'Description', 
            align: 'center',
            value: 'product_name', 
            sortable: false,
        },
        { 
            text: 'Quantity', 
            align: 'center',
            value: 'quantity', 
            sortable: false,
        },

      ],
    }

  },
  methods: {
    addItem () {
    
    var invoice = JSON.parse(sessionStorage.invoice)

    axios.get('http://localhost:8084/api/v1/invoices/' + invoice.id)
      .then((response) => {
        var invoiceObject = response.data
        console.log("numero de items =>", invoiceObject.num_items)
        if (invoiceObject.num_items === 10) {
          alert("You can only add up to 10 items")
        }
        else {
          this.$router.push('CreateItem')
        }
      })
      .catch(error => {
        console.log("error message", error.response)
      })
    }
  }
  
  
}

</script>


<style scoped>


</style>
