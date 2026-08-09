import React from 'react'
import "./AddTask.css"
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import HomeDashboard from './HomeDashboard';
import { MdWork } from "react-icons/md";


const AddTask = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="addTask-header">
        <FaArrowLeft className='left-arrow' color='black'  onClick={() => navigate("/HomeDashboard")} />
        <h4>Add new tasks</h4>
      </div>
      <form action="" className='title-form'>
        <label htmlFor="">Task Title</label>
        <input type="text" name="TaskTitle" id="TaskTitle" placeholder='Task Title' />
      </form>

      <form action="" className='description-form'>
        <label htmlFor="">Description</label>
        <textarea name="" id="" placeholder='Add your description'></textarea>
      </form>

      {/* task catagory || detail */}
      <div className="task-detail">
        <div className="custom-input">
          <div className="catagory">
            <h4>Catogory</h4>
          </div>
          <div className="catogory-box">
            <MdWork size="2em" />
          <h5>Work</h5>
          </div>
        </div>
        <div className="proiority">
          <h4>Proiority</h4>
          <select name="" id="">
            <option value="">High</option>
            <option value="">Low</option>
            <option value="">Medium</option>
          </select>
        </div>
      </div>

      <div className="task-detail">
        <div className="custom-input">
          <div className="catagory">
            <h4>Due Date</h4>
          </div>
          <div className="catogory-box">
            <input type="date"></input>
          </div>
        </div>
        <div className="proiority">
          <h4>Due Time</h4>
          <input type="time" name="" id="" />
        </div>
      </div>

      <div className="task-detail">
        <div className="custom-input">
          <div className="catagory">
            <h4>Repeat</h4>
          </div>
          <div className="catogory-box-select">
            <select name="" id="">
            <option value="">Never</option>
            <option value="">Always</option>
            <option value="">Once</option>
          </select>
          </div>
        </div>
        <div className="proiority">
          <h4>Reminder</h4>
          <select name="" id="">
            <option value="">5 min before</option>
            <option value="">10 min before</option>
            <option value="">15 min before</option>
            <option value="">20 min before</option>
            <option value="">25 min before</option>
            <option value="">30 min before</option>
            <option value="">1 hr before</option>
          </select>
        </div>
      </div>

      <button className='createTask-btn'>Create Task</button>
    </>
  )
}

export default AddTask
