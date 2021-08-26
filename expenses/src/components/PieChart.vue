<script>
import {Doughnut} from 'vue-chartjs'
import randomColor from 'randomcolor';
import _ from 'lodash';


export default {
  extends: Doughnut,
  props: ['dataForChart', 'updateEditData'],
  data: () => {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: false
        }
      }
    }
  },
  methods: {
    addDataToChart(obj) {
      const itemsChartData = _(obj)
          .groupBy('category')
          .map((value) => ({
            id: value[0].id,
            date: value[0].date,
            category: value[0].category,
            value: _.sumBy(value, 'value')
          })).value()


      let itemsChartCategory = [];
      let itemsChartValue = [];
      let itemsBackgroundColor = []

      for (let i = 0; i < itemsChartData.length; i++) {
        itemsChartCategory.push(itemsChartData[i].category)
        itemsBackgroundColor.push(randomColor())
        itemsChartValue.push(itemsChartData[i].value)
      }
      this.chartData.labels = itemsChartCategory
      this.chartData.datasets[0].data = itemsChartValue
      this.chartData.datasets[0].backgroundColor = itemsBackgroundColor

      this.renderChart(this.chartData, this.options)
    },

  },
  watch: {
    dataForChart(obj) {
      this.addDataToChart(obj)
    },

    updateEditData() {
      if (this.dataForChart) {
        const {dataForChart} = this
        this.addDataToChart(dataForChart)
      }
    }
  },
  mounted() {
    if (this.dataForChart) {
      const {dataForChart} = this
      this.addDataToChart(dataForChart)
      this.renderChart(this.chartData, this.options)
    } else console.log('mount error')
  }
}
</script>