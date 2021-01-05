<template>
  <div class="createInvoice">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <Navigation />
    <MainCreateInvoice />
    <!-- <HelloWorld msg="LIST INVOICES" /> -->
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import MainCreateInvoice from "@/components/MainCreateInvoice.vue";

export default {
  name: "CreateInvoice",
  components: {
    // HelloWorld,
    Navigation,
    MainCreateInvoice,
    Footer
  }
};
</script>

