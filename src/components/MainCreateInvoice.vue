<template>
  <v-app>
    
    <v-card width="400" class="mx-auto mt-15 mb-0" flat>
        <v-card-title class="mx-auto mt-0">
            <h3 class="display-0.5 mx-auto" > Create New Invoice </h3>
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
                name="invoice_number"

                :rules="{
                required: false,
                }"
            >
                <v-text-field
                v-model="invoice_number"
                :error-messages="errors"
                label="Invoice Number"
                disabled
                ></v-text-field>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                name="client"
                rules="required"
            >
                <v-select
                item-value="id"
                v-model="client"
                :items="items"
                :error-messages="errors"
                label="Client"
                data-vv-name="Client"
                item-text="name"
                required
                ></v-select>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="discount"
                :rules="{
                required: true,
                regex: '^([0-9]|[1-9][0-9]|100)$'
                }"
            >
                <v-text-field
                suffix="%"
                v-model="discount"
                :counter="3"
                :error-messages="errors"
                label="Discount"
                required
                ></v-text-field>
            </validation-provider>
            <validation-provider>
              <v-container>
                <v-row>

                    <v-col cols="12" lg="6">

                        <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px">
                            
                            <template 
                                v-slot:activator="{ on, attrs }">
            
                                <v-text-field
                                    class="pa-0"
                                    v-model="dateFormatted"
                                    label="Date"
                                    hint="MM/DD/YYYY format"
                                    persistent-hint
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    @blur="date = parseDate(dateFormatted)"
                                    v-on="on"
                                    required
                                    >
                                </v-text-field>

                            </template>

                            <v-date-picker
                                v-model="date"
                                no-title
                                @input="menu1 = false">
                            </v-date-picker>

                        </v-menu>

                    </v-col>

                </v-row>
              </v-container>
            </validation-provider>

              <v-btn
                  color="deep-orange lighten-3"
                  class="mr-2 mt-10"
                  :disabled="invalid"
                  @click="postInvoice">
                  submit
              </v-btn>

            <v-btn
                color="blue-grey lighten-3"
                class="mt-10 mr-2"
                width="100"
                @click="clear">
                clear
            </v-btn>

            <v-btn 
                class="mt-10"
                color="blue-grey lighten-3"
                @click="$router.push('/')">
                Cancel
            </v-btn>

            </form>
        </validation-observer>
      </div>
    </v-card>

  </v-app>
</template>

<script>

import axios from 'axios';
import { required, digits, max, regex } from 'vee-validate/dist/rules';
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { mapActions } from 'vuex';

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
    message: '{_field_} {_value_} does not match 0-100',
  })

export default {
    name: "MainCreateInvoice",

    mounted: function(){
      axios.get('http://localhost:8084/api/v1/clients')
        .then((response) => {
          var clientsData = response.data
          for (var i=0; i < clientsData.length; i++){
            var data = clientsData[i] 
              var object = {
                name: data.name, 
                id: data.id
                }
            this.items.push(object)
          }
      })
      .catch(error => {
        console.log(error.response)
      });
    },

    components: {
      ValidationProvider,
      ValidationObserver,
    },

    data: vm => ({
        // ---- Date picker --- //
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
        // ----- End date picker --- //
    
      discount: '',
      invoice_number: '',
      client: null,
      items: [
        
      ],

    }),

    // Date picker //
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      date (val) {
        console.log(val)
        this.dateFormatted = this.formatDate(this.date)
      },
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
        // --- End date picker -- //

      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.discount = ''
        this.date = ''
        this.client = null
        this.$refs.observer.reset()
      },

      ...mapActions(['recieveInvoice']),
      ...mapActions(['recieveItems']),

      postInvoice () {
       
        axios.post('http://localhost:8084/api/v1/invoices', {
          jsonData: JSON.stringify(
            {discount: this.discount, date: this.date, client_id: this.client})
        })
        .then((response) => {
          var invoiceObject = response.data

          sessionStorage.setItem('invoice', JSON.stringify(invoiceObject));
          this.$router.push('ShowInvoicesItems')
        })
        .catch(error => {
          console.log("error message", error.response);
        });


    }
  }
}

</script>

<style scoped></style>
