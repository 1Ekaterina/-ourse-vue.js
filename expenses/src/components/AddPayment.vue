<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row class="flex-column pa-0">
          <v-col
              cols="12"
              class="pa-0"

          >
            <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    label="Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
              cols="12"
              class="pa-0"
          >
            <category-select

                :categories="categories"
                @changeCategory="changeCategory"
                :select="this.category"
            />
          </v-col>
          <v-col
              cols="12"
              class="pa-0"
          >
            <v-text-field
                label="Value"
                prefix="$"
                v-model.number="value"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="blue darken-1"
          text
          @click="onClose"
      >
        Close
      </v-btn>
      <v-btn
          color="success"
          text
          @click="onClick"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import CategorySelect from "./CategorySelect";

export default {
  name: "AddPayment",
  components: {CategorySelect},
  data() {
    return {
      date: '',
      category: "",
      value: 0,
      menu2: false,
    };
  },
  props: {
    id: Number,
  },
  methods: {
    ...mapActions(["fetchCategory"]),
    ...mapMutations(["addDataToPaymentsList", 'updateDataToPaymentsList']),
    onClose() {
      this.$modal.close();
    },
    changeCategory(selected) {
      this.category = selected;
    },
    onClick() {
      const {category, value} = this;
      const data = {
        id: this.id || Date.now(),
        date: this.date || (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        category,
        value
      };
      if (this.id) {
        this.updateDataToPaymentsList(data)
        this.$emit('update', 'update')
      } else this.addDataToPaymentsList(data);
    }
  },
  computed: {
    ...mapGetters({
      categories: "getCategoryList",
      getPaymentsList: 'getPaymentsList'
    }),
    getValueQueryFromRoute() {
      return Number(this.$route.query?.value ?? null);
    },
  },
  created() {
    if (!this.categories.length) {
      this.fetchCategory();
    }
    this.value = this.getValueQueryFromRoute;
  },
  mounted() {
    if (this.id) {
      const item = this.getPaymentsList.find(p => p.id === this.id)
      if (item) {
        this.category = item.category;
        this.date = item.date
        this.value = item.value
      }

    }
  },
};
</script>

<style lang="scss">
</style>
