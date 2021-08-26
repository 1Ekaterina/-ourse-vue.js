<template>
  <v-container>
    <v-row>
      <v-col cols="1">#</v-col>
      <v-col cols="3">Date</v-col>
      <v-col cols="4">Category</v-col>
      <v-col cols="2">Value</v-col>
      <v-col cols="1">Edit</v-col>
    </v-row>
    <v-row v-for="(item, idx) in currentElems" :key="idx">
      <v-col cols="1">{{ idx + 1 }}</v-col>
      <v-col cols="3">{{ item.date }}</v-col>
      <v-col cols="4">{{ item.category }}</v-col>
      <v-col cols="2">{{ item.value }}</v-col>
      <v-col cols="1">
        <v-menu transition="slide-x-transition"
        >
          <template
              v-slot:activator="{ on }"
          >
            <v-btn
                color="white" 
                v-on="on"
                @click="contextMenu($event, item.id)"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <context-menu :editItem="editItem"/>
        </v-menu>
      </v-col>
    </v-row>

    <Pagination
        :length="items.length"
        :n="n"
        @page="onPaginate"
        :cur="page"
    />
  </v-container>
</template>
<script>
import Pagination from "../components/Pagination";
import {mapMutations} from "vuex";
import ContextMenu from "./ContextMenu";

export default {
  name: "PaymentsDisplay",
  components: {
    ContextMenu,
    Pagination
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      page: 1,
      n: 5,
      editItem: [],
    };
  },
  methods: {
    ...mapMutations(["deleteItemFromPaymentsList"]),
    onPaginate(p) {
      this.page = p;
    },
    contextMenu(event, id) {
      this.editItem = [
        {
          text: "Delete",
          action: () => {
            this.deleteItemFromPaymentsList(id);
          }
        },
        {
          text: "Edit",
          action: () => {
            this.$modal.show("paymentform", {id});
          }
        },
      ];
    }
  },
  computed: {
    currentElems() {
      const {n, page} = this;
      return this.items.slice(n * (page - 1), n * (page - 1) + n);
    }
  },

};
</script>

<style lang="scss">
</style>
