<template>
  <v-list>
    <v-list-item
        v-for="item in editItem"
        :key="item.text"
        @click="onClick(item)"
    >
      <v-list-item-title v-text="item.text"
      ></v-list-item-title>
    </v-list-item>
  </v-list>

</template>
<script>
export default {
  name: "ContextMenu",
  data: () => {
    return {}
  },
  props: {
    editItem: [],
  },
  methods: {
    onClick(item) {
      item.action()
    },
  },
};
</script>
