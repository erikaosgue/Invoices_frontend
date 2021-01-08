<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-15 mb-0" flat>
        <v-card-title class="mx-auto mt-0">
            <h3 class="display-0.5 mx-auto" > Create New Item </h3>
        </v-card-title>
    </v-card>
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
                v-model="product_name"
                :items="item"
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
                v-model="product_price"
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

import { mapFields } from 'vuex-map-fields';
import  { mapActions } from 'vuex'
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
          var products = response.data
          for (var i=0; i < products.length; i++){
            var product = products[i] 
            this.item.push(product)
          }
      })
      .catch(error => {
        console.log(error.response)
      });
    },

    computed: {
      ...mapFields(['items', 'invoice'])

    },

    components: {
      ValidationProvider,
      ValidationObserver,
    },

    data () {

      return {
     
      quantity: '',
      product_name: [],
      product_price: '',
      item: [
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
      ... mapActions(['recieveItems']),

      postItem () {
        let jsonData = JSON.stringify(
          {
            quantity: this.quantity, 
            price: this.product_price, 
            product_id: this.product_name,
            invoice_id: this.invoice.id
          })
          axios.post('http://localhost:8084/api/v1/items', {
          jsonData
          })
          .then((response) => {
            var invoiceObject = response.data
            // Invoice_is is correct !DOnt change  it!
            this.recieveItems(invoiceObject.invoice_id)

          })
          .catch(error => {
            console.log(error.response);
          });

          this.$router.push('ShowInvoicesItems')

        },
  },
}

</script>

<style scoped></style>