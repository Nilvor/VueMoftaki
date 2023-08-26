import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";
import {LMap, LTileLayer, LMarker} from 'vue3-leaflet';

import 'leaflet/dist/leaflet.css';
import '../src/assets/css/style.css';
import '../src/assets/css/mycss.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.min.css'

localStorage.setItem('apiKey', 'ldghn_fhrv127')
localStorage.setItem('urlBase', 'https://moftakiapp.ir/moftaki/api/')
localStorage.setItem('webappUrlBase', 'https://webapp.moftakiapp.ir/')
localStorage.setItem('urlPic', 'https://moftakiapp.ir/moftaki/storage/files/')
localStorage.setItem('mainDomain', 'https://moftakiapp.ir')

var user_id = localStorage.getItem('userId');
console.log(user_id)


var store = createStore({
    state() {
        return {
            order: {
                //ADD 'order_count_select' to products ****
                products: [],
                orders_count: 0,
                orders_price: 0,
                orders_all_price: 0,
                orders_profit: 0
            }
        }
    },
    mutations: {

        ProductUpdate(state, newValue) {

            if (state.order.products.length > 0) {

                var found = true
                state.order.products.forEach((item) => {
                    if (found) {
                        if (item.id == newValue.id) {
                            item.order_count_select = newValue.order_count_select
                            if (item.order_count_select < 1) {
                                store.commit('ProductDelete', item)
                            }
                            found = false
                        }
                    }
                })
                if (found) {
                    store.commit('ProductPush', newValue)
                }
            } else {
                store.commit('ProductPush', newValue)
            }

            var orders_count = 0
            store.state.order.products.forEach((item) => {
                orders_count = orders_count + item.order_count_select
            })
            store.state.order.orders_count = orders_count

            var orders_price = 0
            store.state.order.products.forEach((item) => {
                orders_price = orders_price + parseInt(item.this_price) * parseInt(item.order_count_select)
            })
            store.state.order.orders_price = orders_price

            var orders_all_price = 0
            store.state.order.products.forEach((item) => {
                orders_all_price = orders_all_price + parseInt(item.price) * parseInt(item.order_count_select)
            })
            store.state.order.orders_all_price = orders_all_price

            store.state.order.orders_profit = orders_all_price - orders_price
        },

        ProductPush(state, newValue) {
            state.order.products.push(newValue)
        },

        ProductDelete(state, newValue) {
            var found = true
            state.order.products.forEach((item) => {
                if (found) {
                    if (item.id == newValue.id) {
                        var index = state.order.products.indexOf(item);
                        if (index !== -1) {
                            state.order.products.splice(index, 1);
                        }
                        found = false
                    }
                }
            })
        }
    },
    plugins: [createPersistedState()]
})

// localStorage.clear()
console.log(store.state.order)

const app = createApp(App)
app.use(router)
app.use(store)
app.component('l-map', LMap);
app.component('l-tile-layer', LTileLayer);
app.component('l-marker', LMarker);
app.mount('#app')
