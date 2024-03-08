import Vue from 'vue'
import Vuex from 'vuex'
import cart from "./module/cart"
import path from "./module/path"

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        cart,
        path
    }
})

export default store;