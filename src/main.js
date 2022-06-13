import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// const gAuthCred = {
//     gAuthClientId: '617984689362-02931j85j49mm913mn3lf72j4njggajg.apps.googleusercontent.com',
//     scope: 'email',
//     prompt: 'consent'
// }


createApp(App).use(store).use(router).mount('#app')
