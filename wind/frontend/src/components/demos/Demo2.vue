<template>
    <div>
        demo2
        <br>
        这里接收有demo1传递过来的数据: {{ str }}
    </div>
</template>

<script>
import bus from '@/utils/commonBus';

export default {
    data() {
        return {
            str: ''
        }
    },
    mounted() {
        bus.$on('toDemo2', (val) => {
            this.str = val;
        });
        bus.$on('cleanToDemo2', () => {
            this.str = '';
        })
    }
}
</script>

<style lang="scss" scoped></style>