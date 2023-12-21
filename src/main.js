import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import {firebase} from './firebase'

firebase.auth().onAuthStateChanged((user)=>{
  if(user){
      store.dispatch('customerdetails')
      store.dispatch('productDetails')
      store.dispatch('invoicedetails')
  }
})

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
