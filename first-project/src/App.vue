<template>
  <div>
    <div class="display">
      <input type="number" v-model.number="operand1"/>
      <input type="number" v-model.number="operand2"/> 
      = {{result}}
    </div>
    <div class="keyboard">
      <button v-on:click="result = operand1 + operand2">+</button>
      <button v-on:click="result = operand1 - operand2">-</button>
      <button v-on:click="result = operand1 * operand2">*</button>
      <button v-on:click="result = operand1 / operand2">/</button>
      <button v-on:click="result = operand1 ** operand2">^</button>
      <button v-on:click="result = (operand1 - operand1 % operand2) / operand2">%</button>
    </div>
  </div> 
</template>

<script>
  export default {
    name: 'Calculator',
    data(){
        return {
            operand1: 0,
            operand2: 0,
            result: 0
        }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
