<template>
    <div>
        vuex测试页面
        <br>
        <p>{{ count }}</p>
        <p>{{ text }}</p>
        <h1>{{ groupText }}</h1>
        <p>{{ demo_id }}</p>
        <h2>{{ totalArrLength }}</h2>
        <button ref="inc" @click="add">up</button>
        <button ref="inc" @click="addAsync">upAsync</button>
        <button ref="inc" @click="addN">up + 6 </button>
        <button ref="inc" @click="addNAsync">upAsync + 6 </button>
        <button ref="inc" @click="addArr">添加arr长度</button>
    </div>
</template>

<script>

//第二种写法 使用 mapState 辅助函数
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
    data() {
        return {
            localText: "这已经是年后的第三周了"
        }
    },
    //这是第一种
    // computed: {
    //     count() {
    //         return this.$store.state.demo_count
    //     }
    // },

    //这是第二种
    // computed: mapState({
    //     count: state => state.demo_count,
    //     text: "demo_text",
    //     groupText(state) {
    //         return state.demo_text + "  " + this.localText
    //     }
    // }),

    //这是第三种
    // computed: mapState([
    //     'demo_id', //this.demo_id 为 store.state.demo_id
    // ]),

    //第四种 对象展开运算符
    computed: {
        ...mapState({
            count: state => state.path.demo_count,
            demo_id: state => state.path.demo_id,
            text: state => state.path.demo_text, //"demo_text",
            groupText(state) {
                return state.path.demo_text + "  " + this.localText
            },
        }),
        ...mapGetters([
            "totalArrLength",
        ])
    },
    created() {
        // console.log("vuex getters findArr  >>>", this.$store.path.commit("findArr", 2));
    },
    methods: {
        ...mapMutations([
            "add",
        ]),
        // add() {
        //     return this.$store.commit("add");
        // },
        addN() {
            return this.$store.commit("addN", {
                amount: 6
            });
        },
        addArr() {
            return this.$store.commit("addArr", { id: 4, text: '可以成功的' })
        },
        addAsync() {
            return this.$store.dispatch('addAsync');
        },
        addNAsync() {
            return this.$store.dispatch('addNAsync', { amount: 6 });
        }
    }
}
</script>

<style lang="scss" scoped></style>