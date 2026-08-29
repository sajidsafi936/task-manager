import React from 'react'
import "./TaskOverview.css"
import {ResponsiveContainer, BarChart, Bar, XAxis} from "recharts"

const TaskOverview = () => {

    const summaryData = [
   {
      day: "Mon",
      value: 18
   },
   {
      day: "Tue",
      value: 5
   },
   {
      day: "Wed",
      value: 3
   },
   {
      day: "Thu",
      value: 14
   },
   {
      day: "Fri",
      value: 8
   },
   {
      day: "Sat",
      value: 4
   },
   {
      day: "Sun",
      value: 2
   }
  ]

  return (
    <div className='taskoverview-box'>
        <h4>Tasks Overview</h4>
        <ResponsiveContainer  width="100%" height={150}>
        <BarChart data={summaryData} barCategoryGap="0%">
            <Bar 
            dataKey="value"
            nameKey="day"
            barSize={25}
            fill="#3B82F6"
            radius={[5, 5, 0, 0]}
            />
            <XAxis dataKey="day"/>
        </BarChart>
        </ResponsiveContainer>      
    </div>
  )
}

export default TaskOverview
