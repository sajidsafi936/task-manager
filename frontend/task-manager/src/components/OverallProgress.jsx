import React, { useEffect, useState } from 'react'
import "./OverallProgress.css"
import {PieChart, Pie, Cell, Label} from "recharts"

const Progress = () => {
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setTasks(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const totalTask = tasks.length;
  const completedTasks = tasks.filter(task=>task.status === "completed").length;
  const pendingTasks = tasks.filter(task=>task.status === "pending").length;
  const overdueTasks = tasks.filter(task=>task.status === "Overdue").length;

  const summaryData = [
    {
      name : "completed",
      value : completedTasks
    },
    {
      name : "pending",
      value : pendingTasks
    },
    {
      name : "overdue",
      value : overdueTasks
    }
  ]

  const COLORS = ["red", "blue", "pink"]

  const completionPercentage = totalTask > 0 ? Math.round((completedTasks / totalTask) * 100) : 0;

  return (
    <>
    {loading? (
      <p>Loading Progress...</p>
    ):(
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
        )}
    </>
  )
}

export default Progress
