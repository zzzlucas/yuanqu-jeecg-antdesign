<template>
  <a-card class="tree-table-charts">
    <a-row>
      <a-col span="10">
        <a-table class="chart-table" bordered :data-source="list" :columns="columns" :pagination="false"></a-table>
      </a-col>
      <a-col span="14">
        <div class="chart-gantt" v-resize="resize"></div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
  import Echarts from 'echarts'
  import Dom7 from 'dom7'
  import { chartAxis, chartData, startEndMinMax } from '../js/utils'
  import _ from 'lodash'

  export default {
    name: 'TreeTableCharts',
    data() {
      return {
        chart: null,
        columns: [
          { title: '名称', dataIndex: 'name' },
          { title: '开始时间', dataIndex: 'startTime' },
          { title: '结束时间', dataIndex: 'endTime' }
        ],
        list: [
          { name: 'A计划', startTime: '2019-12-01 08:50', endTime: '2019-12-03 22:50' },
          { name: 'B计划', startTime: '2019-12-02 12:24', endTime: '2019-12-05 03:21' },
          { name: 'C计划', startTime: '2019-12-04 20:17', endTime: '2019-12-06 23:59' },
          { name: 'D计划', startTime: '2019-12-03 09:00', endTime: '2019-12-03 22:18' }
        ]
      }
    },
    mounted() {
      let list = this.list

      // noinspection SpellCheckingInspection,JSCheckFunctionSignatures
      let chart = Echarts.init(Dom7('.tree-table-charts .chart-gantt')[0], null, {
        width: Dom7('.chart-gantt').width(),
        height: 54 + (list.length * 52) + 55
      })

      // 开始时间和结束时间
      let { start, end } = startEndMinMax(this.list, (arr, item, i, moment) => {
        arr.push({
          index: i,
          key: 'startTime',
          unix: moment(item.startTime).unix()
        })
        arr.push({
          index: i,
          key: 'endTime',
          unix: moment(item.endTime).unix()
        })
      })
      // X轴坐标
      let axis = chartAxis(start, end, (date, i, moment) => {
        this.list = _.map(this.list, (item) => {
          let startTime = moment(item.startTime)
          if (
            date.format('MM') === startTime.format('MM') &&
            date.format('DD') === startTime.format('DD') &&
            date.format('HH') === startTime.format('HH')
          ) {
            item.start = i
          }

          let endTime = moment(item.endTime)
          if (
            date.format('MM') === endTime.format('MM') &&
            date.format('DD') === endTime.format('DD') &&
            date.format('HH') === endTime.format('HH')
          ) {
            let diff = date.minutes() - endTime.minutes()
            if (diff < 5) {
              item.end = i
            }

            diff = endTime.minutes() - date.minutes()
            if (diff < 5) {
              item.end = i
            }
          }

          return item
        })
      })
      // 图表数据
      let data = chartData(_.reverse(_.cloneDeep(this.list)))

      chart.setOption({
        title: {
          text: '项目进度',
          left: 'center',
          top: 18
        },
        tooltip: {
          formatter: function(params) {
            return params.marker + params.name + ': ' + params.value[3] + ' 小时<br>' + params.value[4] + params.value[5]
          }
        },
        grid: {
          top: 54,
          right: '3%',
          height: this.list.length * 52
        },
        dataZoom: [
          {
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            bottom: 10,
            height: 10,
            borderColor: 'transparent',
            backgroundColor: '#e2e2e2',
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            handleSize: 15,
            handleStyle: {
              shadowBlur: 6,
              shadowOffsetX: 1,
              shadowOffsetY: 2,
              shadowColor: '#aaa'
            },
            labelFormatter: ''
          },
          {
            type: 'inside',
            filterMode: 'weakFilter'
          }
        ],
        xAxis: {
          type: 'category',
          min: 0,
          scale: true,
          axisLabel: {
            formatter: function(val, index) {
              return axis[index].label
            }
          },
          splitLine: {
            show: true,
            interval: 24 * 6
          },
          data: axis
        },
        calculable: true,
        yAxis: {
          data: _.reverse(_.map(_.cloneDeep(this.list), item => _.get(item, 'name')))
        },
        series: [
          {
            type: 'custom',
            itemStyle: {
              normal: {
                opacity: 0.8
              }
            },
            encode: {
              x: [1, 2],
              y: 0
            },
            renderItem(params, api) {
              let categoryIndex = api.value(0)
              let start = api.coord([api.value(1), categoryIndex])
              let end = api.coord([api.value(2), categoryIndex])
              let height = api.size([0, 1])[1] * 0.6

              let rectShape = Echarts.graphic.clipRectByRect({
                x: start[0],
                y: start[1] - height / 2,
                width: end[0] - start[0],
                height: height
              }, {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
              })

              return {
                type: 'rect',
                shape: rectShape,
                style: api.style()
              }
            },
            data
          }
        ]
      })
      this.chart = chart
    },
    methods: {
      resize(size) {
        this.chart.resize({
          width: size.width
        })
      }
    }
  }
</script>

<style lang="less">
  .tree-table-charts {

  }
</style>