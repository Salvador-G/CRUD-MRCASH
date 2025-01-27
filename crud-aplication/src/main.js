import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'; // Importa los íconos de Material Design



import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi', // Configura 'mdi' como el set de íconos predeterminado
    },
  })

createApp(App).use(vuetify).mount('#app')
