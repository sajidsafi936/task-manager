import React from 'react'
import "./Progress.css"
import BattomNavbar from "../components/BottomNavbar"
import OverallProgress from "../components/OverallProgress"
import TaskOverview from '../components/TaskOverview'
import CatagoryBreakdown from '../components/CatagoryBreakdown'

const Progress = () => {
 

  return (
    <>
      <div className="progress-container">
        <div className="top-heading">
          <h3>Progress</h3>
          <select className='select' name="" id="">
            <option value="">This Week</option>
            <option value="">Previous Week</option>
            <option value="">This Month</option>
            <option value="">Previous Week</option>
            <option value="">This Year</option>
            <option value="">Last Year</option>
          </select>
        </div>
        <div> 
          <OverallProgress/>
        </div>
        <div>
          <TaskOverview/>
        </div>
        <div>
          <CatagoryBreakdown/>
        </div>
      </div>
      <BattomNavbar/>
    </>
  )
}

export default Progress
