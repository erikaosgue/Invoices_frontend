<template>
  <v-app>
    <div>
        <v-card width="700" class="mx-auto mt-15 mb-0" flat>
            <v-card-title class="mx-auto mt-0">
                <h3 class="display-0.5 " > Items </h3>
            </v-card-title>
        </v-card>
    

    <!-- table Section -->

        <v-card width="700" class="mx-auto mt-3 mb-0">
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
        
        
        <!-- Button Create New items -->
        <v-card width="700" class="mx-auto mt-3" flat>
                <v-btn
                class="mt-5 ml-0"
                width="200"
                outlined
                color="indigo"
                @click="addItem">Add Item
                </v-btn>
          
            
        <!-- button to finish and view invoice -->
                <v-btn
                class="mt-5 ml-9"
                outlined
                color="indigo"
                @click="$router.push('CreateFullInvoice')">Finish & view Invoice
                </v-btn>

      <!-- go home Button -->
                <v-btn
                class="mt-5 ml-9"
                width="200"
                outlined
                color="indigo"
                @click="$router.push('/')">Home
                </v-btn>
        </v-card>
    </div>
  </v-app>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'

// import { mapGetters } from 'vuex';
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
            align: 'start',
            sortable: false,
            value: 'product_id',
        },
        { 
            text: 'Description', 
            value: 'product_name', 
            sortable: false,
        },
        { 
            text: 'Quantity', 
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


<style scoped></style>
