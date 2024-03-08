export default {
    state: {
        pathInfo: '这里是地址信息',
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
    getters: {
        totalArrLength: state => state.demo_arr.length,
        findArr: (state) => (id) => {
            return state.demo_arr.find(item => item.id == id);
        }
    },
    mutations: {
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
    actions: {
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
}