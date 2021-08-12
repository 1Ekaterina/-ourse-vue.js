<template>
  <div>
    <input v-model="log" type="checkbox">ADD NEW COST  +
    <div v-if="log">
      <input type="text" v-model="date" placeholder="date" />
      <input type="number" v-model.number="value" placeholder="value" />
      <select v-model="category" v-if="options">
        <option v-for="option in options" :value="option" :key="option">
          {{ option }}
        </option>
      </select>
      <!-- <input type="text" v-model="category" placeholder="category" /> -->
      <button @click="onSave">Save</button>
    </div>
    
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "AddPaymentForm",
  data() {
    return {
      value: "",
      category: "",
      date: "",
      log: false,
    };
  },
  computed: {
      getCurrentDate () {
      const today = new Date();
      const d = today.getDate()
      const m = today.getMonth() + 1
      const y = today.getFullYear()
      return `${d}.${m}.${y}`
    },
    options(){
      return this.$store.getters.getCategories
    }
  },
  methods: {
    ...mapActions([
      'fetchCategoryList'
    ]),
      onSave() {
          const { value, category } = this
          const data = {
              date: this.date || this.getCurrentDate,
              value,
              category
          }
          console.log('emit: addNewPayment',data)
          this.$emit('addNewPayment', data)
      }
  },
  created(){
    this.fetchCategoryList()
  }
};
</script>