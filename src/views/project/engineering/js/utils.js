import _ from 'lodash'
import moment from 'moment'

export function chartAxis(start, end, callback) {
  let len = Math.ceil(moment(end).add(2, 'h').diff(moment(start), 'm', true) / 10)

  let arr = new Array(len)
  let date = moment(start)
  date.minutes(0)
  date.seconds(0)
  date.milliseconds(0)

  arr = _.map(arr, (a, i) => {
    let label = `${date.format('MM')}-${date.format('DD')} ${date.format('HH')}:${date.format('mm')}`

    let data = {
      value: i,
      label
    }

    callback(date, i, moment)

    date.minutes(date.minutes() + 10)
    return data
  })

  return arr
}

export function startEndMinMax(list, callback) {
  let arr = []
  _.map(list, (item, i) => {
    callback(arr, item, i, moment)
  })

  let arr2 = _.sortBy(arr, 'unix')

  let start = list[_.head(arr2).index][_.head(arr2).key]
  let end = list[_.last(arr2).index][_.last(arr2).key]

  return { start, end }
}

export function chartData(list) {
  let arr = []
  _.map(list, (item, i) => {
    arr.push({
      name: item.name,
      value: [
        i,
        item.start,
        item.end,
        (item.end - item.start) / 6
      ],
      itemStyle: {
        normal: {
          color: '#71cc89'
        }
      }
    })
  })

  return arr
}