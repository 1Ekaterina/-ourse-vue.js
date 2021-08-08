<template>
  <div id="app">
    <div :class="[$style.wrapper]">
      <header>
        <div :class="[$style.title]">My Personal Cost</div>
      </header>
      <div :class="[$style.content]">
        <payments-display :list="paymentsList"/>
      </div>
      <div :class="[$style.content]">
        <add-payment-form @addNewPayment="addData" />
      </div>
    </div>
  </div>
</template>

<script>
import AddPaymentForm from './components/AddPaymentForm.vue'
import PaymentsDisplay from './components/PaymentsDisplay.vue'
export default {
  name: 'App',
  components: {
    PaymentsDisplay,
    AddPaymentForm
  },
  data() {
    return {
      paymentsList: []
    }
  },
  
  methods: {
    addData(newPayment){
      this.paymentsList.push(newPayment)
      console.log(newPayment);
    },
    fetchData(){
      return [
        {
        date: '28.03.2020',
        category: 'Food',
        value: 169,
      },
      {
        date: '24.03.2020',
        category: 'Transport',
        value: 360,
      },
      {
        date: '24.03.2020',
        category: 'Food',
        value: 532,
      },
      ]
    }
  },
  created(){
    this.paymentsList = this.fetchData()
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
}
.content {
  padding-top: 30px;
}
</style>