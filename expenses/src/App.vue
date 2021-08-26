<template>
  <v-app>
    <v-app-bar app flat dense color="teal dark">
      <v-btn color="white" plain :ripple="false" to="/">Main page</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",
};

</script>

