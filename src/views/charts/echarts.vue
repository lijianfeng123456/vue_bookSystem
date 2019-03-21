<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="chartColumn" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartBar" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="24">
                <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'

    export default {
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null
            }
        },

        methods: {
            drawColumnChart() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                  title: { text: '最近一周借阅数量最高的图书类别' },
                  tooltip: {},
                  xAxis: {
                      data: ["文学", "历史", "工业", "科学", "美术", "地理","政治"]
                  },
                  yAxis: {},
                  series: [{
                      name: '销量',
                      type: 'bar',
                      data: [125, 40, 66, 80, 100, 90,130]
                    }]
                });
            },
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                this.chartBar.setOption({
                    title: {
                        text: '今日昨日借阅数量最高的图书类别',
                        subtext: '数据来自管理系统统计'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['昨天', '今天']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['美妆', '综合', '工业', '科学', '历史', '总借阅量']
                    },
                    series: [
                        {
                            name: '昨天',
                            type: 'bar',
                            data: [18, 23, 29, 10, 13, 63]
                        },
                        {
                            name: '今天',
                            type: 'bar',
                            data: [19, 20, 31, 12, 13, 68]
                        }
                    ]
                });
            },
            drawLineChart() {
                this.chartLine = echarts.init(document.getElementById('chartLine'));
                this.chartLine.setOption({
                    title: {
                        text: '上周访问情况'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['游客', '会员', '管理员']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '游客',
                            type: 'line',
                            stack: '总量',
                            data: [12, 13, 10, 14, 90, 20, 21]
                        },
                        {
                            name: '管理员',
                            type: 'line',
                            stack: '总量',
                            data: [20, 18, 19, 23, 29, 33, 31]
                        },
                        {
                            name: '会员',
                            type: 'line',
                            stack: '总量',
                            data: [80, 92, 90, 134, 190, 150, 60]
                        }
                    ]
                });
            },
            drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: '最近一周借阅数量最高的图书',
                        subtext: '真实数据',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['《大学英语》', '《家》', '《天龙八部》', '《数据结构》', '《计算机网络》']
                    },
                    series: [
                        {
                            name: '借阅情况',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                { value: 33, name: '《大学英语》' },
                                { value: 31, name: '《家》' },
                                { value: 23, name: '《天龙八部》' },
                                { value: 13, name: '《数据结构》' },
                                { value: 54, name: '《计算机网络》' }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawColumnChart()
                this.drawBarChart()
                this.drawLineChart()
                this.drawPieChart()
            },
        },

        mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
