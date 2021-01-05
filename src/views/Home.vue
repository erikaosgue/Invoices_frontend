<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <Navigation />
    <!-- <HelloWorld msg="LIST INVOICES" /> -->
    <MainHome />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import MainHome from "@/components/MainHome.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    Navigation,
    MainHome,
    Footer
  }
};
</script>
