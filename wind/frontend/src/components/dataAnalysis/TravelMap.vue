<template>
    <div class="travel-map">
        <div id="main">

        </div>
    </div>
</template>

<script>
    import chinaJson from "echarts/map/json/china.json";
    import travel from "@/assets/js/travel.json";

    export default {
        data() {
            return {
            }
        },
        mounted() {
            let { points, linesData } = travel;
            let myChart = this.$echarts.init(document.getElementById('main'));
            this.$echarts.registerMap('china', chinaJson); //注册可用的地图，必须包括geo组件或者map图表类型的时候才可以使用

            let option = {
                backgroundColor: 'rgba(121, 145, 209)',
                geo: {
                    map: 'china',
                    aspectScale: 0.75, // scale地图长宽比
                    zoom: 1.1, //地图的缩放比
                    itemStyle: {
                        normal: {
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#09132c'
                                    },
                                    {
                                        offset: 1,
                                        color: '#274d68'
                                    },
                                ],
                                globalCoord: true,
                            },
                            shadowColor: 'rgb(58, 115, 192)',
                            shadowOffsetX: 10,
                            shadowOffsetY: 8
                        }
                    },
                    regions: [{
                        name: '南海诸岛',
                        itemStyle: {
                            opacity: 0
                        }
                    }]
                },
                series: [ //配置地图的相关参数，绘制地图，这个对象是关于地图图表的相关设置
                    {
                        type: 'map',
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#lde986'
                                }
                            },
                            emphasis: {
                                textStyle: {
                                    color: "rgb(183, 185, 14)"
                                }
                            }
                        },
                        zoom: 1.1,
                        map: 'china',
                        itemStyle: {
                            normal: {
                                backgroundColor: 'rgba(121, 145, 209)',
                                borderWidth: 1,
                                areaColor: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: 'rgb(31, 59, 150)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgb(89, 128, 142)'
                                        },
                                    ],
                                    globalCoord: true,
                                }
                            },
                            emphasis: {
                                areaColor: 'rgb(46, 229, 206)',
                                borderWidth: 0.1,
                            }
                        },
                    },
                    {
                        type: 'effectScatter',//散点图
                        coordinateSystem: 'geo',
                        showEffectOn: 'render',
                        symbolSize: 10, //散点大小,
                        zlevel: 1,
                        data: points,
                        rippleEffect: {//涟漪配置
                            period: 4,
                            scale: 2.5,
                            brushType: 'fill'
                        }
                    },
                    { //线图
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 6, //速度
                            symbol: 'arrow', //箭头样式
                            symbolSize: 4, //箭头大小
                            trailLength: 0.3, //拖尾长度
                        },
                        data: linesData,
                        lineStyle: {
                            normal: {
                                color: '#lde986',
                                width: 1,
                                opacity: 0.1,
                                curveness: 0.4, //弯曲程度
                            }
                        }
                    }
                ]
            }

            myChart.setOption(option);
        }
    }
</script>


<style lang="scss">

.travel-map {
    width: 100%;
    #main {
        width: 100%;
        height: 600px;
    }
}
</style>