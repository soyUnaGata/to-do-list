import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import './assets/css/main.css'
import './assets/css/globals.css'
import './assets/css/media.css'
import VueDatePicker from '@vuepic/vue-datepicker';
import './assets/css/vue-datepicker.css';

const app = createApp(App);

app.component('VueDatePicker', VueDatePicker);

app.mount('#app');

