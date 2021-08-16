<template>
  <div id="app">
    <div class="page-links">
      <router-link to='/dashboard'>Dashboard</router-link> /
      <router-link to='/about'>About</router-link> / 
      <button @click="goToPage(404)">404</button> /
    </div>
    <div class="content">
    <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    }
  },
  methods: {
    goToPage(pageName){
      this.$router.push({
        name: pageName
      })
    }
  }
}
</script>


<style lang="scss" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrapper {
  display: block;
  height: 100%
}
.title{
  font-size: 20px;
  color: red
}
.content {
  padding-top: 30px;
}
</style>