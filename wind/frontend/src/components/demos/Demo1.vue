<template>
    <div>
        子组件
        <br>
        这是从父组件拿到的数据 >>>>{{ msg }}
        <br>
        子组件传值给父组件的input： <input @input="changeInput" v-model="inputValue">
        <br>
        <button @click="propsToDemo2">点击给demo2传递数据</button>
        <button @click="cleanToDemo2">清空给demo2传递数据</button>
    </div>
</template>

<script>
import bus from "@/utils/commonBus";
export default {
    props: {
        msg: String,
    },
    data() {
        return {
            inputValue: '',
            demoContent: '这是来自Demo1是数据'
        }
    },
    methods: {
        changeInput() {
            this.$emit('changeInput', this.inputValue);
        },
        propsToDemo2() {
            bus.$emit('toDemo2', this.demoContent);
        },
        cleanToDemo2() {
            bus.$emit('cleanToDemo2');
        }
    },
}
</script>

<style lang="scss" scoped></style>