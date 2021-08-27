<template>
  <div class="list">
      <div class="item" v-for="(item, idx) in list" :key="idx">
          {{item.id}} - {{ item }} <span @click="onContextMenuClick($event,item)">...</span>
      </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    name: 'PaymentsDisplay',
    props: {
        list: {
            type: Array,
            default: ()=> [],
        }
    },
    methods: {
        ...mapMutations(["deleteItemFromPaymentsList"]),
        onContextMenuClick(event, item){
            const items = [
                { text: "Редактировать", action:()=>{ this.$modal.show("paymentform", { item }); }},
                { text: "Удалить", action:()=>{this.deleteItemFromPaymentsList(item) }}
            ]
            this.$context.show({event,items})
        }
    },
    
}
</script>