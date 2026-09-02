import React, {useState, useEffect} from 'react'
import "./TaskOverview.css"
import {ResponsiveContainer, BarChart, Bar, XAxis} from "recharts"

const TaskOverview = () => {

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

  return (
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
  )
}

export default TaskOverview
