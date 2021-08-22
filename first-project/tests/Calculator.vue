<template>
  <div>
    <div class="display">
      <input type="number" v-model.number="operand1" name="operand1"/>
      <input type="number" v-model.number="operand2" name="operand2"/> 
      = {{result}}
    </div>
    <div v-if="error">
      {{error}}
    </div><br>
    <div class="keyboard">
      <button v-on:click="calculate('+')" name="+">+</button>
      <button v-on:click="calculate('-')" name="-">-</button>
      <button v-on:click="calculate('*')" name="*">*</button>
      <button v-on:click="calculate('/')" name="/">/</button>
      <button v-on:click="calculate('**')" name="**">^</button>
      <button v-on:click="calculate('%')" name="%">%</button>
    </div><br>
    
    <div>
      <input v-model="log" type="checkbox" id="checkbox">Отобразить экранную клавиатуру
    </div><br>
    <div v-if="log" class="onlineKeyboard">
      <button v-for = "number in collection" v-bind:key="number" @click="inputNum(number)" :name="number">{{ number }} </button>
      <button v-on:click ="del()" id="delete">Delete </button><br><br>
      <label><input checked type="radio" value="operand1" v-model="operand" name="one">operand 1</label>
      <label><input type="radio" value="operand2" v-model="operand" name="two">operand 2</label>
    </div>
  </div> 
</template>

<script>
  export default {
    name: 'Calculator',
    data: () => ({
      operand: '',
      operand1: 0,
      operand2: 0,
      result: 0,
      error: "",
      array: [],
      log: false,
      collection: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,],
    }),
    methods: {
      calculate(operation = "+"){
        this.error = '';
        switch(operation){
          case '+':
            this.sum()
            break;
          case '-':
            this.sub()
            break;
          case '*':
            this.mul()
            break;
          case '/':
            this.div()
            break;
          case '**':
            this.deg()
            break;
          case '%':
            this.rem()
            break;
        } 
      },
      sum() {
        this.result = this.operand1 + this.operand2;
      },
      sub() {
        this.result = this.operand1 - this.operand2;
      },
      div() {
        const {operand1, operand2} = this;
        if (operand2 == 0){
          this.error = "На 0 делить нельзя!";
        }else{
          this.result = operand1 / operand2;
        }
      },
      mul() {
        this.result = this.operand1 * this.operand2;
      },
      deg(){
        this.result = this.operand1 ** this.operand2;
      },
      rem(){
        this.result = (this.operand1 - this.operand1 % this.operand2) / this.operand2;
      },
      del(){
        this[this.operand] =+String(this[this.operand]).slice(0,-1)
      },
      inputNum(number){
        this[this.operand] =+ (this[this.operand]+=String(number))
      }
    }
  }
</script>

<style lang="scss">
body{
  text-align: center;
}
</style>