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
                :items="desserts"
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
import { mapActions } from 'vuex'

// import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: "DisplayItems",

  mounted: function(){
      var invoice_id = this.$store.state.invoice.id
      console.log(invoice_id)
      // axios.get('http://localhost:8084/api/v1/invoices/{id}/items')
      axios.get('http://localhost:8084/api/v1/items')
        .then((response) => {
          this.clientsData = response.data
          for (var i=0; i < this.clientsData.length; i++){
              var data = this.clientsData[i] 
              var object = {
                  invoiceNumber: data.item_number, 
                  client: data.name,
                  subtotal: data.quantity
                }
            this.desserts.push(object)
            console.log("desert", this.desserts)
          }
      })
      .catch(error => {
          console.log(error.response)
      });
    },
  

  methods: {
    ...mapActions(['recieveItems']),
  },
  

  data () {
    return {
      id: '',
      headers: [
        {
            text: 'Product ID', 
            align: 'start',
            sortable: false,
            value: 'invoiceNumber',
        },
        { 
            text: 'Description', 
            value: 'client', 
            sortable: false,
        },
        { 
            text: 'Quantity', 
            value: 'subtotal', 
            sortable: false,
        },

      ],

      desserts: [
        {
            invoiceNumber: 1234,
            client: 'Iphone',
            subtotal: 1,
        },
      ]
    }

  },
  
}
// };
</script>


<style scoped></style>
