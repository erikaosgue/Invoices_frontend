<template>
 <v-toolbar color="indigo" dark fixed app>
   
  <v-toolbar-title>Application</v-toolbar-title>
  <hr/>
  <hr/>
  <v-toolbar-title>
  <v-spacer></v-spacer>
    <router-link 
      to="/"
      class="link"
    >Home</router-link>
  </v-toolbar-title>
  </v-toolbar>
  
  
</template>

<script>

export default {
  name: "Navigation"
};
</script>

<style scoped>
.link {
  color: #FFF;
   text-decoration: none;
}

.link:hover {
   color: #00F
}
hr {
  margin-left: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

}

</style>
