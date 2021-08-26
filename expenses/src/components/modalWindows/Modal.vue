<template>
  <v-dialog @click:outside="onClose()"
            v-if="flagShow === 'paymentform'"
            v-model="dialog"
            max-width="500px"

  >
    <v-card>
      <AddPayment @update="updateChart" :id="modalSettings.id" v-if="flagShow === 'paymentform'"/>
    </v-card>
  </v-dialog>
</template>

<script>
import AddPayment from "../AddPayment";

export default {
  name: "Modal",
  data: () => {
    return {
      dialog: false,
      flagShow: "",
      modalSettings: Object,
    };
  },
  components: {
    AddPayment
  },
  methods: {
    updateChart() {
      this.$emit('updateChart', 'update')
    },
    onShow({name, settings}) {
      this.modalSettings = ''
      this.flagShow = name;
      this.dialog = true
      if (settings) {
        this.modalSettings = settings
      }
    },
    onClose() {
      this.flagShow = "";
    }
  },
  mounted() {
    this.$modal.EventBus.$on("show", this.onShow);
    this.$modal.EventBus.$on("close", this.onClose);
  },

  beforeDestroy() {
    this.$modal.EventBus.$off("show", this.onShow);
    this.$modal.EventBus.$off("close", this.onClose);
  }
};
</script>
