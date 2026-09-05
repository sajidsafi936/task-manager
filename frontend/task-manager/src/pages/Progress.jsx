import React, { useState, useEffect } from "react";
import "./Progress.css";
import {
  PieChart,
  Pie,
  Cell,
  Label,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
} from "recharts";
import BattomNavbar from "../components/BottomNavbar";

const Progress = () => {
  // =========================
  // Fetch Tasks
  // =========================

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  // =========================
  // Filter State
  // =========================

  const [selectFilter, setSelectedFilter] = useState("All Tasks");

  const handleChangeSelect = (e) => {
    setSelectedFilter(e.target.value);
  };

  // =========================
  // Date Calculations
  // =========================

  const todayDate = new Date();
  const currentYear = todayDate.getFullYear();

  // =========================
  // This Year
  // =========================

  const thisYearStart = new Date(currentYear, 0, 1);
  const thisYearEnd = new Date(currentYear + 1, 0, 1);

  const thisYearTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt);

    return (
      taskDate >= thisYearStart &&
      taskDate < thisYearEnd
    );
  });

  // =========================
  // Previous Year
  // =========================

  const previousYear = currentYear - 1;

  const previousYearStart = new Date(previousYear, 0, 1);
  const previousYearEnd = new Date(currentYear, 0, 1);

  const previousYearTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt);

    return (
      taskDate >= previousYearStart &&
      taskDate < previousYearEnd
    );
  });

  // =========================
  // This Month
  // =========================

  const thisMonth = todayDate.getMonth();

  const thisMonthStart = new Date(
    currentYear,
    thisMonth,
    1
  );

  const thisMonthEnd = new Date(
    currentYear,
    thisMonth + 1,
    1
  );

  const thisMonthTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt);

    return (
      taskDate >= thisMonthStart &&
      taskDate < thisMonthEnd
    );
  });

  // =========================
  // Previous Month
  // =========================

  const previousMonth = thisMonth - 1;

  const previousMonthStart = new Date(
    currentYear,
    previousMonth,
    1
  );

  const previousMonthEnd = new Date(
    currentYear,
    previousMonth + 1,
    1
  );

  const previousMonthTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt);

    return (
      taskDate >= previousMonthStart &&
      taskDate < previousMonthEnd
    );
  });

  // =========================
  // This Week
  // Monday → Sunday
  // =========================

  const todayDay = todayDate.getDay();

  const daysBackToMonday =
    todayDay === 0 ? 6 : todayDay - 1;

  const thisWeekStart = new Date(todayDate);

  thisWeekStart.setDate(
    thisWeekStart.getDate() - daysBackToMonday
  );

  thisWeekStart.setHours(0, 0, 0, 0);

  const thisWeekEnd = new Date(thisWeekStart);

  thisWeekEnd.setDate(
    thisWeekEnd.getDate() + 7
  );

  const thisWeekTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt);

    return (
      taskDate >= thisWeekStart &&
      taskDate < thisWeekEnd
    );
  });

  // =========================
  // Previous Week
  // =========================

  const previousWeekStart = new Date(thisWeekStart);

  previousWeekStart.setDate(
    previousWeekStart.getDate() - 7
  );

  const previousWeekEnd = new Date(thisWeekStart);

  const previousWeekTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt);

    return (
      taskDate >= previousWeekStart &&
      taskDate < previousWeekEnd
    );
  });

  // =========================
  // Select Filtered Tasks
  // =========================

  let filteredTasks = [];

  if (selectFilter === "This Week") {
    filteredTasks = thisWeekTasks;
  } else if (selectFilter === "Last Week") {
    filteredTasks = previousWeekTasks;
  } else if (selectFilter === "This Month") {
    filteredTasks = thisMonthTasks;
  } else if (selectFilter === "Last Month") {
    filteredTasks = previousMonthTasks;
  } else if (selectFilter === "This Year") {
    filteredTasks = thisYearTasks;
  } else if (selectFilter === "Last Year") {
    filteredTasks = previousYearTasks;
  } else if (selectFilter === "All Tasks") {
    filteredTasks = tasks;
  }

  // =========================
  // Overall Progress
  // =========================

  const totalTask = filteredTasks.length;

  const completedTasks = filteredTasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = filteredTasks.filter(
    (task) => task.status === "pending"
  ).length;

  const overdueTasks = filteredTasks.filter(
    (task) => task.status === "Overdue"
  ).length;

  const summaryData = [
    {
      name: "completed",
      value: completedTasks,
    },
    {
      name: "pending",
      value: pendingTasks,
    },
    {
      name: "overdue",
      value: overdueTasks,
    },
  ];

  const COLORS = [
    "#20B982",
    "#A5A9B8",
    "#EF8B8C",
  ];

  const completionPercentage =
    totalTask > 0
      ? Math.round((completedTasks / totalTask) * 100)
      : 0;

  const noTasks = filteredTasks.length === 0;

  // =========================
  // Task Overview
  // =========================

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

    value: filteredTasks.filter(
      (task) =>
        new Date(task.createdAt).getDay() === index
    ).length,
  }));

  // =========================
  // Category Breakdown
  // =========================

  const workTasks = filteredTasks.filter(
    (task) => task.catagory === "Work"
  ).length;

  const studyTasks = filteredTasks.filter(
    (task) => task.catagory === "Study"
  ).length;

  const personalTasks = filteredTasks.filter(
    (task) => task.catagory === "Personal"
  ).length;

  const otherTasks = filteredTasks.filter(
    (task) => task.catagory === "Other"
  ).length;

  const BreakdownData = [
    {
      name: "Work",
      value: workTasks,
    },
    {
      name: "Study",
      value: studyTasks,
    },
    {
      name: "Personal",
      value: personalTasks,
    },
    {
      name: "Other",
      value: otherTasks,
    },
  ];

  const BCOLORS = [
    "#8491E8",
    "#208BC8",
    "#BD5EEC",
    "#F8C158",
  ];

  // =========================
  // JSX
  // =========================

  return (
    <>
      <div className="progress-container">

        {/* Header */}
        <div className="top-heading">
          <h3>Progress</h3>

          <select
            className="select"
            value={selectFilter}
            onChange={handleChangeSelect}
          >
            <option value="This Week">
              This Week
            </option>

            <option value="Last Week">
              Last Week
            </option>

            <option value="This Month">
              This Month
            </option>

            <option value="Last Month">
              Last Month
            </option>

            <option value="This Year">
              This Year
            </option>

            <option value="Last Year">
              Last Year
            </option>

            <option value="All Tasks">
              All Tasks
            </option>
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <p>Loading progress...</p>
        ) : noTasks ? (
          <p>
            There are no tasks for {selectFilter}.
          </p>
        ) : (
          <>
            {/* =========================
                Overall Progress
            ========================= */}

            <div className="progress-card">
              <div className="overallTask-card">

                <div>
                  <h4>Overall Progress</h4>

                  <PieChart
                    width={150}
                    height={150}
                  >
                    <Pie
                      data={summaryData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={40}
                      outerRadius={60}
                    >
                      {summaryData.map(
                        (entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={COLORS[index]}
                          />
                        )
                      )}

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
                    {summaryData.map(
                      (item, index) => (
                        <div
                          className="legend-item"
                          key={item.name}
                        >
                          <span
                            className="legend-color"
                            style={{
                              backgroundColor:
                                COLORS[index],
                            }}
                          ></span>

                          <span>
                            {item.name}
                          </span>

                          <span>
                            {item.value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* =========================
                Task Overview
            ========================= */}

            <div className="progress-card">
              <div className="taskoverview-card">

                <h4>Tasks Overview</h4>

                <ResponsiveContainer
                  width="100%"
                  height={150}
                >
                  <BarChart
                    data={weekData}
                    barCategoryGap="0%"
                  >
                    <Bar
                      dataKey="value"
                      barSize={25}
                      fill="#3B82F6"
                      radius={[5, 5, 0, 0]}
                    />

                    <XAxis dataKey="day" />
                  </BarChart>
                </ResponsiveContainer>

              </div>
            </div>

            {/* =========================
                Category Breakdown
            ========================= */}

            <div className="progress-card">
              <div className="taskbreakdown-card">

                <div>
                  <h4>Category Breakdown</h4>

                  <PieChart
                    width={150}
                    height={150}
                  >
                    <Pie
                      data={BreakdownData}
                      nameKey="name"
                      dataKey="value"
                      innerRadius={30}
                      outerRadius={60}
                    >
                      {BreakdownData.map(
                        (entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={BCOLORS[index]}
                          />
                        )
                      )}
                    </Pie>
                  </PieChart>
                </div>

                <div>
                  <div className="chart-legend">
                    {BreakdownData.map(
                      (item, index) => (
                        <div
                          className="legend-item"
                          key={item.name}
                        >
                          <span
                            className="legend-color"
                            style={{
                              backgroundColor:
                                BCOLORS[index],
                            }}
                          ></span>

                          <span>
                            {item.name}
                          </span>

                          <span>
                            {item.value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

              </div>
            </div>
          </>
        )}
      </div>

      <BattomNavbar />
    </>
  );
};

export default Progress;