<template>
   <v-select :items="categories" v-model="selected" @change="changeCategory"
              label="Category"
    >
    </v-select>
</template>

<script>
export default {
  name: "CategorySelect",
  props: {
    select: String,
    categories: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selected: '',
    }
  },
  methods: {
    changeCategory() {
      this.$emit('changeCategory', this.selected)
    },
  },
  computed: {
    getCategoryParamsFromRoute() {
      return this.$route.params?.category ?? null
    },
  },
  watch: {
    select(select) {
      this.selected = select;
    },
  },
  created() {
    if (this.getCategoryParamsFromRoute) {
      this.selected = this.getCategoryParamsFromRoute;
      this.$emit('changeCategory', this.selected)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.select-cat {
  height: 25px;
  width: 200px;
}
</style>