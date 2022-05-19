import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


// Vue.filter('formatDate', function(value) {
//     if (value) {
//       return moment(String(value)).format('MMM DD, YYYY hh:mm a')
//     }
//   })

createApp(App).use(store).use(router).mount('#app')
