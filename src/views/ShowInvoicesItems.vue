<template>
  <div class="showInvoicesItems">
    <Navigation />
    <DisplayInvoices />
    <DisplayItems />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import DisplayInvoices from "@/components/DisplayInvoices.vue";
import DisplayItems from "@/components/DisplayItems.vue";

export default {
  name: "ShowInvoicesItems",
  components: {
    Navigation,
    DisplayInvoices,
    DisplayItems,
    Footer
  }
};
</script>
