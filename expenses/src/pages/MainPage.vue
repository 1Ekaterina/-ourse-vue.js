<template>
  <v-container>
    <header>
      <div class="text-h5 text-xl-h4 mb-4">My personal costs</div>
    </header>
    <v-row>
      <v-col class="col-12 col-sm-6">
        <v-btn class="mb-6" color="teal" dark @click="showAddMenu">
          Add New Cost
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <Modal @updateChart="update"/>
        <PaymentsDisplay :items="getPaymentsList"/>
        <div>
        </div>
      </v-col>
      <v-col class="col-12 col-sm-6">
          <div class="text-h5 text-xl-h4 mb-4">Cost by Categories</div>
          <pie-chart
              v-if="loaded"
              :dataForChart="getPaymentsList"
              :updateEditData="this.updateDataForChart"
          >
          </pie-chart>


      </v-col>

    </v-row>
  </v-container>
</template>
<script>
import PaymentsDisplay from "../components/PaymentsDisplay";
import {mapGetters, mapActions} from "vuex";
import Modal from "../components/modalWindows/Modal";
import PieChart from '../components/PieChart'


export default {
  name: "MainPage",
  data() {
    return {
      loaded: false,
      updateDataForChart: false,
    }
  },
  components: {
    PieChart,
    Modal,
    PaymentsDisplay,
  },
  computed: {
    ...mapGetters({
      getFullPaymentValue: "getFullPaymentValue",
      getPaymentsList: "getPaymentsList"
    }),
  },
  methods: {
    update() {
      this.updateDataForChart =! this.updateDataForChart
    },
    ...mapActions([
      "fetchData"
    ]),
    showAddMenu() {
      this.$modal.show("paymentform",);
    },
  },
  async created() {
    this.loaded = false
    try {
      await this.fetchData()
      this.loaded = true
    } catch (e) {
      console.log('error')
    }
  },
};
</script>