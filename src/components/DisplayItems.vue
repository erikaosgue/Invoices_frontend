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
                :items-per-page="5"
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
                to="/CreateInvoice">New Invoice
                </v-btn>
            
        </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "DisplayItems",
  data () {
    return {
        
      headers: [
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

      desserts: [
        {
            invoiceNumber: 1234,
            client: 'Ulter Technologies',
            subtotal: 1000,
            discount: '0%',
            total: 1000,
        },
      ]
    }
  }
};
</script>


<style scoped></style>
