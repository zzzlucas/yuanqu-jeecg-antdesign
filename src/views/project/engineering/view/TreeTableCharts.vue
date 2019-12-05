<template>
  <a-card class="tree-table-charts">
    <a-row>
      <a-col span="10">
        <a-table bordered :data-source="list" :columns="columns" :pagination="false"></a-table>
      </a-col>
      <a-col span="14">
        <div class="chart-gantt"></div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
  import Echarts from 'echarts'
  import Dom7 from 'dom7'

  export default {
    name: 'TreeTableCharts',
    data() {
      return {
        columns: [
          { title: '名称', dataIndex: 'name' },
          { title: '开始时间', dataIndex: 'startTime' },
          { title: '结束时间', dataIndex: 'endTime' }
        ],
        list: [
          { name: 'A进展', startTime: '2019-12-04 22:50:32', endTime: '2019-12-05 22:50:14' },
          { name: 'B进展', startTime: '2019-12-04 22:50:32', endTime: '2019-12-05 22:50:14' }
        ]
      }
    },
    mounted() {
      let gantt = Echarts.init(Dom7('.tree-table-charts .chart-gantt')[0], null, {
        height: 250
      })
      gantt.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        calculable: true,
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inside'
                }
              }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inside'
                }
              }
            },
            data: [180, 202, 221, 194, 190, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inside'
                }
              }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inside'
                }
              }
            },
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inside'
                }
              }
            },
            data: [420, 432, 501, 534, 690, 630, 620]
          }
        ]
      })
    }
  }
</script>

<style lang="less">
  .tree-table-charts {

  }
</style>