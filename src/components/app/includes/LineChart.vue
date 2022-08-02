<template>
    <Line
    :chart-options="chartOptions"
    :chart-data="computedStats"
    :width="300"
    :height="200"
    />
</template>
<script>
import moment from 'moment'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)
export default {
  name: 'LineChart',
  components: { Line },
  props: ['results'],
  computed: {
        computedStats() {
            const chartData = {
                labels: [],
                datasets: [
                    {
                        label: 'Earnings',
                        data: [],
                        backgroundColor: '#566ff4',
                    }
                ],
            }
            this.results.forEach(element => {
                let dateLabel = moment(element.created_at).format('MMM DD, YYYY')
                let check = chartData.labels.find(data => data == dateLabel)
                if(!check) {
                    chartData.labels.push(dateLabel)
                    let filterVal = this.results.filter(date => moment(date.created_at).format('MMM DD, YYYY') == moment(element.created_at).format('MMM DD, YYYY'))
                    let totalVal = filterVal.reduce((acc, item) => acc + Number(item.total_paid), 0)
                    chartData.datasets[0].data.push(totalVal)
                }
            })
            return chartData
        }
    },
    data() {
        return {
            chartOptions: {
                responsive: true
            }
        }
    }
}
</script>