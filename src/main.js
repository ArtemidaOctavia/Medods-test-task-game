import Vue from 'vue'
import App from './App.vue'
import Game from "./components/Game";

Vue.component('Game', Game)

Vue.config.devtools = true

new Vue({
  el: '#app',
  render: h => h(App)
})
