import '@/styles/reset.css'
import '@/styles/zxx.lib.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDice } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

library.add(faDice)

app.use(ElementPlus)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
