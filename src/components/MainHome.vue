<template>
<v-app>

  <v-card width="800" class="mx-auto mt-15">
    <v-data-table
      width="800"
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    > <template v-slot:no-data>
        <v-alert :value="true" color="grey" class="mb-4 mt-4">
            You have none Invoices
        </v-alert>
      </template>
      <template v-slot:top>
          <!-- flat -->
        <v-toolbar
          class="mb-10"
        >
      

        <v-card-title class="mx-auto mt-15 mb-15">
          <h2 class="display-0.5" >INVOICES </h2>
         </v-card-title>
        
          
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-card>    

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.invoiceNumber"
                        label="Invoice Number"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.client_name"
                        label="Client"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.subtotal"
                        label="Subtotal"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.discount"
                        label="Discount"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.total"
                        label="Total"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

            
            </v-card>
          </v-dialog>
         
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        
      </template>
      
    </v-data-table>
    
  </v-card>

  <!-- Button to create a new invoice  -->
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
  
  data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
            text: 'Invoice Number',
            align: 'start',
            sortable: true,
            value: 'invoice_number',
        },
        { 
            text: 'Client', 
            value: 'client_name', 
            sortable: true,
        },
        { 
            text: 'Subtotal (USD)', 
            value: 'subtotal', 
            sortable: true,
        },
        { 
            text: 'Discount (%)', 
            value: 'discount', 
            sortable: true,
        },
        { 
            text: 'Total (USD)', 
            value: 'total',
            sortable: true,
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedItem: {
        invoiceNumber: '',
        client: '',
        subtotal: '',
        discount: '',
        total: ''
      },
    }),

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
          axios.get('http://localhost:8084/api/v1/invoices')
          .then((response) => {
            var invoiceData = response.data
            for (var i=0; i < invoiceData.length; i++){
              var data = invoiceData[i]
              var object = {
                  invoice_number: data.invoice_number,
                  client_name: data.client_name,
                  subtotal: data.subtotal,
                  discount: data.discount + '%',
                  total: data.total,
                  id: data.id,
                  date: data.date
                }
                this.desserts.push(object)
            }
          })
          .catch(e => {
            console.log(e.response)
          })
  
      },

      editItem (item) {
        
        sessionStorage.setItem('invoice', JSON.stringify(item));
        this.$router.push('CreateFullInvoice')
         
      },
    },
  
};
</script>

<style scoped></style>
