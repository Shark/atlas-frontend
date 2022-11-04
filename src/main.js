import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faEarthEurope } from '@fortawesome/free-solid-svg-icons'

library.add(faEarthEurope)

app.use(createPinia())

app
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')

