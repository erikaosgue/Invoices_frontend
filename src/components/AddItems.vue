<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-10">
      <div class="pa-6">
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
            <form @submit.prevent="submit">
            <validation-provider
                v-slot="{ errors }"
                name="Quantity"
                :rules="{
                required: true,
                regex: '^[0-9]*$'
                }"
            >
                <v-text-field
                v-model="quantity"
                :error-messages="errors"
                label="Quantity"
                required
                ></v-text-field>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                name="Product Description"
                rules="required"
            >
                <v-select
                item-text="description"
                item-value="id"
                v-model="productDesc"
                :items="items"
                :error-messages="errors"
                label="Product Description"
                data-vv-name="Client"
                required
                ></v-select>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                name="Product Price"
                :rules="{
                required: true,
                regex: '^[0-9]*$'
                }"
            >
                <!-- type="number" -->
                <v-text-field
                suffix="USD"
                v-model="productPrice"
                :error-messages="errors"
                label="Product Price"
                required
                ></v-text-field>
            </validation-provider>

            <v-btn
                class="mr-5 mt-10"
                :disabled="invalid"
                @click="postItem"
            >
                <!-- type="submit" -->
                submit
            </v-btn>
            <v-btn 
                class="mt-10"
                @click="clear">
                clear
            </v-btn>
            </form>
        </validation-observer>
      </div>
    </v-card>

  </v-app>
</template>

<script>

import axios from 'axios';
import { required, digits, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_value_} is invalid. {_field_} require only numbers',
  })

export default {
    name: "AddItems",

    mounted: function(){
      axios.get('http://localhost:8084/api/v1/products')
        .then((response) => {
          this.products = response.data
          for (var i=0; i < this.products.length; i++){
            var product = this.products[i] 
            this.items.push(product)
          }
      })
      .catch(error => {
        console.log(error.response)
      });
    },

    computed: {
      getInvoice () {
        console.log("here Add items")
        var invoice = this.$store.state.invoice
        // console.log("invo", invoice)
        return invoice
        // return this.$store.state.invoice
      }
    },

    components: {
      ValidationProvider,
      ValidationObserver,
    },

    data () {

      return {
      products: null,
      quantity: '',
      productDesc: [],
      productPrice: '',
      items: [
        ],
      }
    },

    methods: {

      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.quantity = ''
        this.productDesc = null
        this.productPrice = ''
        this.$refs.observer.reset()
      },
      postItem () {
        console.log("posting product",this.productDesc)
        let jsonData = JSON.stringify(
          {
            quantity: this.quantity, 
            price: this.productPrice, 
            product_id: this.productDesc,
            invoice_id: '62734460-1166-4938-a615-5c1f28d138a1'
          })
          console.log("json Data", jsonData)
        axios.post('http://localhost:8084/api/v1/items', {
          jsonData
        })
        .then((response) => {
          var invoiceObject = response.data
          console.log("Herer call items", invoiceObject)
         
        .catch(error => {
          console.log(error.response);
        });

        this.$router.push('ShowInvoicesItems')
        // this.recieveItems(invoiceObject.items)

    }
    },
  };

</script>

<style scoped></style>