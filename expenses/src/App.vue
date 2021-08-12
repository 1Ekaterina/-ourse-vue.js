<template>
  <div id="app">
    <div :class="[$style.wrapper]">
      <header>
        <div :class="[$style.title]">My Personal Cost</div>
      </header>
      <div :class="[$style.content]">
        Total Value: {{getFPV}}
        <payments-display :list="currentElements"/>
        <pagination :cur="curPage" 
                  :n="n" 
                  :length="paymentsList.length" 
                  @paginate="onChangePage"/>
      </div>
      <div :class="[$style.content]">
        <add-payment-form @addNewPayment="addData" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import AddPaymentForm from './components/AddPaymentForm.vue'
import PaymentsDisplay from './components/PaymentsDisplay.vue'
import Pagination from './components/Pagination.vue'

export default {
  name: 'App',
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    Pagination
  },
  data() {
    return {
      category: '',
      page: '',
      curPage: 1,
      n: 5,
    }
  },
  methods: {
    ...mapMutations({
      loadData: 'setPaymentListData',
      addDataToStore: 'addDataToPaymentList'
    }),
    ...mapActions({
      fetchListData: 'fetchData'
    }),
    addData(newPayment){
      this.addDataToStore(newPayment)
      console.log(newPayment);
    },
    onChangePage(p){
      this.curPage = p
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
  computed: {
    ...mapGetters({
      paymentsList:'getPaymentsList'
    }),
    getFPV(){
      return this.$store.getters.getFullPaymentValue
    },
    currentElements(){
      const { n, curPage } = this
      return this.paymentsList.slice(n * (curPage - 1), n* (curPage - 1)+n)
    }
  },
  created(){
    // this.paymentsList = this.fetchData()
    //this.$store.commit('setPaymentListData', this.fetchData())
    //this.loadData(this.fetchData())
    // this.$store.dispatch('fetchData')
    this.fetchListData()
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