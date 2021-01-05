<template>
  <div class="createItem">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <Navigation />
    <!-- <HelloWorld msg="LIST INVOICES" /> -->
    <AddItems />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import AddItems from "@/components/AddItems.vue";

export default {
  name: "CreateInvoice",
  components: {
    // HelloWorld,
    Navigation,
    AddItems,
    Footer
  }
};
</script>
