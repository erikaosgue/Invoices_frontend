<template>
  <v-app>
    <v-card width="900" class="mx-auto mt-3">

        <v-card-title class="mx-auto mt-3">
            <h2 class="display-0.5 mx-auto"  > Client Name </h2>
        </v-card-title>

        <!-- table Section -->

        <v-card width="700" class="mx-auto mt-3">
            <v-data-table
                :headers="headers2"
                :items="desserts2"
                :items-per-page="5"
                class="elevation-1"
                hide-default-footer
                hide-default-header
            ></v-data-table>
        </v-card>


        <!-- table Section -->
        <v-card width="700" class="mx-auto mt-5">
            <v-card-title class="mx-auto">
                <h4 class="display-0.5 mx-auto"> Items </h4>
            </v-card-title>
        </v-card>

        <v-card width="700" class="mx-auto mt-2 mb-15">
            <v-data-table
                :headers="headers"
                :items="desserts"
                :items-per-page="5"
                class="elevation-1"
                hide-default-footer
            ></v-data-table>
        </v-card>
    </v-card>

  </v-app>
</template>

<script>
export default {
   


  name: "DisplayFullInvoice",
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
      ],
      headers2: [

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

      desserts2: [
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

<style scoped></style>
