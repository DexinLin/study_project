export default {
    state: {
        cartList: [1, 2, 3, 4, 5, 6],
    },
    getters: {
        getCartListLength(state) {
            return state.cartList.lenght;
        }
    },
    mutations: {

    },
    actions: {},
}