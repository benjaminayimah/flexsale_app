<template>
  <Bar
  :chart-options="chartOptions"
  :chart-data="chartData"
  :chart-id="chartId"
  :dataset-id-key="datasetIdKey"
  :width="width"
  :height="height"
  />
</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    name: 'BarChart',
    components: { Bar },
    props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 250
    }
  },
    data() {
        return {
            chartData: {
                labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
                datasets: [ {
                    label: 'Total Sold',
                    data: [80, 20, 12, 38, 15, 25, 36, 40, 20, 12, 38, 15, 25, 36],
                    backgroundColor: '#566ff4',
                } ],
            },
            chartOptions: {
                responsive: true
            }
        }
    }
}
</script>