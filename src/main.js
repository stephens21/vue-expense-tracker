import { createApp } from 'vue'
import Vue3Toastify from 'vue3-toastify';

import '@/assets/style.css'
import App from './App.vue'


const app = createApp(App)
app.use(Vue3Toastify, {
    autoClose: 2000,
  });

app.mount('#app')
