<template>
  <div class="createFullInvoice">
    <Navigation />
    <DisplayFullInvoice />
    <Footer />
  </div>
</template>

<script>

import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import  DisplayFullInvoice from "@/components/DisplayFullInvoice.vue";

export default {
  name: "CreateFullInvoice",
  components: {
    Navigation,
    DisplayFullInvoice,
    Footer
  }
};
</script>
