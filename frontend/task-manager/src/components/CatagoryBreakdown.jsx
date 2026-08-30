import React from 'react'
import "./CatagoryBreakdown.css"
import {PieChart, Pie, Cell} from 'recharts'

const CatagoryBreakdown = () => {

    const summaryData = [
   {
      name: "Work",
      value: 18
   },
   {
      name: "Study",
      value: 5
   },
   {
      name: "Personal",
      value: 2
   },
   {
      name: "Other",
      value: 3
   }
  ]

  const COLORS = ["Pink", "orange", "red", "lightblue"];

  return (
    <div className='catagory-card'>
        <div>
            <h4>Catagory Breakdown</h4>
        <PieChart width={150} height={150}>
            <Pie
            data={summaryData}
            nameKey="name"
            dataKey="value"
            innerRadius={30}
            outerRadius={60}
            >
                {summaryData.map((entey, index) =>(
            <Cell key={entey.name} fill={COLORS[index]} />            
            ))}
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
  )
}

export default CatagoryBreakdown
