import React, {useState, useEffect} from 'react'
import "./Progress.css"
import {PieChart, Pie, Cell, Label, ResponsiveContainer, BarChart, Bar, XAxis} from "recharts"
import BattomNavbar from "../components/BottomNavbar"

const Progress = () => {
//  overall progress
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
  
    const COLORS = ["#20B982", "#A5A9B8", "#EF8B8C"]
  
    const completionPercentage = totalTask > 0 ? Math.round((completedTasks / totalTask) * 100) : 0;
    const noTasks = (tasks.length) === 0;



    // task overview

    const MondayTasks = tasks.filter(
      (task) => new Date(task.createdAt).getDay() === 1
      ).length;


    const weekData = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
   ].map((day, index) => ({
      day,
      value: tasks.filter(
      (task) => new Date(task.createdAt).getDay() === index).length,
   }));



  //  task breakdown

  const workTasks = tasks.filter(task=>task.catagory === "Work").length;
      const studyTasks = tasks.filter(task=>task.catagory === "Study").length;
      const personalTasks = tasks.filter(task=>task.catagory === "Personal").length;
      const otherTasks = tasks.filter(task=>task.catagory === "Other").length;

      const BreakdownData = [
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
    
      const BCOLORS = ["#8491E8", "#208BC8", "#BD5EEC", "#F8C158"]
    




  return (
    <>
      <div className="progress-container">
        <div className="top-heading">
          <h3>Progress</h3>
          <select className='select' name="" id="">
            <option value="">This Week</option>
            <option value="">Last Week</option>
            <option value="">This Month</option>
            <option value="">Last Month</option>
            <option value="">This Year</option>
            <option value="">Last Year</option>
          </select>
        </div>



        {/* overall progress */}
        <div> 
          <div className="progress-card">
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
                    </>   
                      )
                    )}
                  </div>
        </div>



        {/* task overview */}
        <div className='progress-card'>
          <div className='taskoverview-box'>
                  <h4>Tasks Overview</h4>
                  <ResponsiveContainer  width="100%" height={150}>
                  <BarChart data={weekData} barCategoryGap="0%">
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
        </div>



        {/* task breakthrough */}
        <div>
          <div className='progress-card'>
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
                      data={BreakdownData}
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
        </div>



      </div>
      <BattomNavbar/>
    </>
  )
}

export default Progress
