import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        demo_id: 10001,
        demo_count: 18,
        demo_text: '这是vuex的测试文本',
        demo_arr: [
            {
                id: 1,
                text: '加油',
            },
            {
                id: 2,
                text: '努力',
            },
            {
                id: 3,
                text: '记得谈一谈薪资待遇'
            }
        ]
    },
    getters: { //类似 computed 可以使用commit(函数名字)来调用函数
        totalArrLength: state => state.demo_arr.length,
        findArr: (state) => (id) => {
            return state.demo_arr.find(item => item.id == id);
        }
    },
    mutations: { //类似 methods 可以通过调用mutations中定义的方法，修改state中的数据  必须同步 可以使用commit(函数名字)来调用函数
        add(state) {
            state.demo_count++;
        },
        addN(state, payload) {
            state.demo_count += payload.amount;
        },
        addArr(state, data) {
            state.demo_arr.push(data);
        }
    },
    actions: { //和上方的mutations类似 不过这个可以使用异步  使用 dispatch(函数名字) 来调用函数 返回的类型是promise
        addAsync({ commit }) {
            setTimeout(() => {
                commit('add')
            }, 1000);
        },
        addNAsync({ commit }, payload) {
            setTimeout(() => {
                commit('addN', payload);
            }, 1000);
        }
    },
})

export default store;