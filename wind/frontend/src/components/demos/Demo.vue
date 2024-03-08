<template>
    <div>
        demo模块
        <br>
        -------------------nextTick--------------------------
        <br>
        测试nextTick: <button @click="testNT" ref="box">{{ str }}</button>
        <br>
        ---------------------传值-----------------------------
        <br>
        父组件
        <br>
        父组件接受到子组件的数据：{{ childrenValue }}
        <Demo1 :msg="msg" @changeInput="getVal"></Demo1>
        <Demo2></Demo2>
        <br>
        -----------------------------------------------------
    </div>
</template>

<script>
import Demo1 from './Demo1.vue';
import Demo2 from './Demo2.vue';
export default {
    components: {
        Demo1,
        Demo2,
    },
    data() {
        return {
            str: 123,
            msg: '父组件给子组件传值',
            childrenValue: '',
        }
    },
    methods: {
        testNT() {
            this.str = '456';
            console.log("box的值 >>>", this.$refs.box.innerHTML);//这时视图数据更新了，可是dom没更新，所以打印结果是123 
            this.$nextTick(() => {
                console.log('nextTick >>>', this.$refs.box.innerHTML);
            });
        },
        //接受子组件传值
        getVal(val) {
            // console.log("子组件触发了事件，传递过来的数据 >>>", val);
            this.childrenValue = val;
        }
    },
}
</script>

<style lang="scss" scoped></style>