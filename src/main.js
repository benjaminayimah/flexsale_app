import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

navigator.serviceWorker.register('/registerServiceWorker.js').then(reg => {
    // ...

    // Trigger this after your timeout
    reg.update();
    });

createApp(App).use(store).use(router).mount('#app')
