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
                v-model="quatity"
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
                type="submit"
                :disabled="invalid"
            >
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

    components: {
      ValidationProvider,
      ValidationObserver,
    },

    data () {

      return {
      quantity: '',
      productDesc: null,
      productPrice: '',
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
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
    },
  };

</script>

<style scoped></style>