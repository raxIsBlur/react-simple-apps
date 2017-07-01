import React from 'react'
import _ from 'lodash'
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines'


function average(data) { 
  // return _.meanBy(data)
  return _.round(_.sum(data)/data.length)
}

export function Chart(props) {
  return (
    <Sparklines svgWidth={180} svgHeight={120} data={props.data}>
      <SparklinesLine color={props.color} />
      <SparklinesReferenceLine type="avg" />
      {
        <div>{average(props.data)} {props.units}</div>
      }
    </Sparklines>
  )
}
