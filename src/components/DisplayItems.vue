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
                :items=getItems
                :items-per-page="10"
                class="elevation-1"
                hide-default-footer
            ></v-data-table>
        </v-card>
        
        
        <!-- Button Create New Invoice -->
        <v-card width="700" class="mx-auto mt-3" flat>
            
                <v-btn
                class="mt-5"
                outlined
                color="indigo"
                @click="$router.push('CreateItem')">Add Item
                </v-btn>
            
        </v-card>
    </div>
  </v-app>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'

// import { mapGetters } from 'vuex';
// import axios from 'axios';
import { mapFields } from 'vuex-map-fields' 

export default {
  name: "DisplayItems",

  watch: {
    items() {
      // let value = this.invoice.id
      //  axios.get(
          // 'http://localhost:8084/api/v1/invoices/' + value + '/items')
          // .then((response) => {
          // let items = response.data
          // // var displayItems = []
          // for(let i = 0; i < items.length; i++) {
          //   var objetc = {
          //     invoiceNumber: items[i].item_number,
          //     client: items[i].name,
          //     subtotal: items[i].subtotal,
          //   }
          //   console.log("desserts", this.desserts)
          //   this.desserts.push(objetc)
          }
          // this.items = items
    //       })
    //       .catch(error => {
    //         console.log("error message", error.response)
    //       })
    //       console.log("==>", value.invoice_id)
    // }
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
      id: '',
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
  
}
// };
</script>


<style scoped></style>
