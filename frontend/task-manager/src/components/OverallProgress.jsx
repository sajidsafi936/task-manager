import React from 'react'
import "./OverallProgress.css"
import {PieChart, Pie, Cell, Label} from "recharts"

const Progress = () => {
  const summaryData = [
   {
      name: "Completed",
      value: 18
   },
   {
      name: "Pending",
      value: 5
   },
   {
      name: "Overdue",
      value: 2
   }
  ]

  const COLORS = ["green", "orange", "red"];

  const totalTasks = summaryData.reduce((total, item) => {
    return total + item.value;
  }, 0);

  const completedTasks = summaryData[0].value;

  const completionPercentage = Math.round(
  (completedTasks / totalTasks) * 100);


  return (
    <>
        <div className="overall-progress-box">
          <div>
            <h4>Overall Progress</h4>

            <PieChart width={150} height={150}>
            <Pie
              data={summaryData}
              dataKey="value"
              nameKey="name"
              innerRadius={40}
              outerRadius={60}
            >
              {summaryData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index]} />
              ))}
              <Label
                value={`${completionPercentage}%`}
                position="center"
                fontSize={20}
              />
            </Pie>
            </PieChart>
          </div>

          <div>
            <div className="chart-legend">
              {summaryData.map((item, index) => (
              <div className="legend-item" key={item.name}>
                <span
                className="legend-color"
                style={{ backgroundColor: COLORS[index] }}
                ></span>

                <span>{item.name}</span>
                <span>{item.value}</span>
                </div>
                ))}
              </div>
          </div>
                    
        </div>
    </>
  )
}

export default Progress
