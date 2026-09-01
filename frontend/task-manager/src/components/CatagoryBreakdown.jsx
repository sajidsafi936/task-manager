import React, {useState, useEffect} from 'react'
import "./CatagoryBreakdown.css"
import {PieChart, Pie, Cell} from 'recharts'

const CatagoryBreakdown = () => {

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
    
    //   const totalTask = tasks.length;
      const workTasks = tasks.filter(task=>task.catagory === "Work").length;
      const studyTasks = tasks.filter(task=>task.catagory === "Study").length;
      const personalTasks = tasks.filter(task=>task.catagory === "Personal").length;
      const otherTasks = tasks.filter(task=>task.catagory === "Other").length;

      const summaryData = [
        {
          name : "Work",
          value : workTasks
        },
        {
          name : "Study",
          value : studyTasks
        },
        {
          name : "Personal",
          value : personalTasks
        },
        {
          name : "Other",
          value : otherTasks
        }
      ]
    
      const COLORS = ["silver", "lightblue", "pink", "orange"]
    
      const noTasks = (tasks.length) === 0;

  return (
        <div className='catagory-card'>
            {loading? (
            <p>Loading progress</p>
         ):(
            noTasks? (
                <div>
                <p>No tasks yet</p>
                <p>Create a task to see your progress</p></div>
            ):(

            <>          
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
        </> 
       )
        )}
    </div>

  )
}

export default CatagoryBreakdown
