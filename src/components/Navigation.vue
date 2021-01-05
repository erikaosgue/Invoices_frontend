<template>
  <nav>
    <router-link to="/">Home</router-link>
    <!-- <a href="#">Friends</a> -->
  </nav>
</template>

<script>
// import FriendStore from "../stores/FriendStore"

export default {
  name: "Navigation"
};
</script>

<style scoped>
nav {
  background: #dbab0cc7;
  color: white;
  margin-bottom: 20px;
  padding: 20px 10%;
  width: 100%;
  text-align: center;
}
a {
  color: #fff;
}

.router-link-exact-active{
  /* background: yellow; */
  border-radius: 5px;
  color: rgb(2, 1, 1);
  font-variant: italic;
  text-decoration: none

}
</style>
