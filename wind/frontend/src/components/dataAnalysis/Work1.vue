<template>
    <div class="data-view">
        <el-card>
            <div id="main1"></div>
        </el-card>
        <el-card>
            <div id="main2"></div>
        </el-card>
    </div>
</template>

<script>
    import { getChart } from "../../api/login";

    export default {
        data () {
            return {}
        },
        created() {
            getChart().then(res =>
            {
                console.log("res .>>>", res);
                if (res.status==200)
                {
                    const { legend, xAxis, series } = res.data.data;
                    this.draw(legend, xAxis, series);
                }
            })
        },
        mounted() {
            let myChart = this.$echarts.init(document.getElementById("main1"));

            myChart.setOption({
                title: {
                    text: '大力出奇迹'
                },
                tooltip: {},
                xAxis: {
                    data: ['一班', "二班", "三班", "四班", "五班"],
                },
                yAxis: {},
                series: [{
                    name: '人数',
                    type: 'bar',
                    data: ['18', '25', '38', '16', '48']
                }]
            })
        },
        methods: {
            draw(legend, xAxis, series) {
                let myChart1 = this.$echarts.init(document.getElementById('main2'));
                let option = {
                    title: {
                        text: '',
                    },
                    tooltip: {
                        trigger: 'axis',
                    },
                    legend: {
                        data: legend,
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: series
                }
                myChart1.setOption(option);
            }
        }
    }
</script>

<style lang="scss">
.data-view {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .el-card {
        width: 50%;
        #main1, #main2 {
            height: 500px;
        }
    }
}
</style>