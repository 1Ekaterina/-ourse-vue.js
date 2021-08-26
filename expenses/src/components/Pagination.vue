<template>
  <div class="text-center">
    <v-pagination
        :length="this.amount"
        v-model="page"
    ></v-pagination>
  </div>

</template>

<script>
export default {
  name: "Pagination",
  data: () => {
    return {
      page: 1,
    }
  },
  props: {
    length: Number,
    n: Number,
  },
  watch: {
    page() {
      this.$emit('page', this.page)
    }
  },
  computed: {
    amount() {
      return Math.ceil(this.length / this.n);
    }
  }
};
</script>