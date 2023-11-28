import React, { useState, useEffect } from "react";
import "./home.css";
import Lists from "./lists.js";

function Home() {
  if (!localStorage.getItem("group")) {
    localStorage.setItem("group", "Status");
  }
  if (!localStorage.getItem("order")) {
    localStorage.setItem("order", "Priority");
  }
  let usersArr = [];
  const statusArr = [
    { title: "Backlog", value: "Backlog" },
    { title: "Todo", value: "Todo" },
    { title: "In progress", value: "In progress" },
  ];
  const priorityArr = [
    { title: "Urgent", value: 4 },
    { title: "High", value: 3 },
    { title: "Medium", value: 2 },
    { title: "Low", value: 1 },
    { title: "No Priority", value: 0 },
  ];

  const filter = { Status: statusArr, Priority: priorityArr, User: usersArr };
  const [filteredData, setfilteredData] = useState(null);
  const [grouping, setGrouping] = useState(localStorage.getItem("group"));
  const [ordering, setOrdering] = useState(localStorage.getItem("order"));
  const [arr, setArr] = useState(filter[grouping]);
  useEffect(() => {
    if (!localStorage.getItem("group")) {
      localStorage.setItem("group", "Status");
    }
    if (!localStorage.getItem("order")) {
      localStorage.setItem("order", "Priority");
    }

    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((json) => {
        usersArr = [];
        json["users"].map((item) => {
          usersArr.push({ title: item.name, value: item.id });
        });
        sortData(ordering, json);

        if (grouping === "User") {
          setArr(usersArr);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  //changing grp value

  function groupChange(e) {
    if (e.target.value === "Priority") {
      setArr(priorityArr);
    } else if (e.target.value === "User") {
      usersArr = [];
      filteredData["users"].map((item) => {
        usersArr.push({ title: item.name, value: item.id });
      });
      setArr(usersArr);
    } else if (e.target.value === "Status") {
      setArr(statusArr);
    }
    setGrouping(e.target.value);
    localStorage.setItem("group", e.target.value);
  }

  //changing order value
  function orderChange(e) {
    localStorage.setItem("order", e.target.value);
    sortData(e.target.value, filteredData);
    setOrdering(e.target.value);
  }

  function sortData(parameter, filteredData) {
    if (parameter === "Title") {
      // console.log("sort calling Title");
      filteredData["tickets"].sort(function (a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    } else if (parameter === "Priority") {
      // console.log("sort calling Priority");
      filteredData["tickets"].sort(function (a, b) {
        if (a.priority < b.priority) return -1;
        if (a.priority > b.priority) return 1;
        return 0;
      });
    }
    setfilteredData(filteredData);
  }

  return (
    <div>
      <nav>
        <div class="dropdown">
          <div className="display-btn">
            <span
              style={{
                justifyContent: "center",
              }}
            >
              Display <i class="fa-duotone fa-circle-chevron-down"></i>
            </span>
          </div>
          <div class="dropdown-content">
            <div className="grouping">
              <h5>Group By: </h5>
              <select
                name="grouping"
                id="grouping"
                className="drop"
                onChange={groupChange}
                defaultValue={grouping}
              >
                <option value="Status">Status</option>
                <option value="User">User</option>
                <option value="Priority">Priority</option>
              </select>
            </div>
            <div className="ordering">
              <h5>Order By:</h5>
              <select
                name="ordering"
                id="ordering"
                className="drop"
                onChange={orderChange}
                defaultValue={ordering}
              >
                <option value="Priority" selected>
                  Priority
                </option>
                <option value="Title">Title</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      <div className="flexbox">
        <h4 className="filter_type">Grouping: </h4>
        {grouping}
        <h4 className="filter_type">Ordering: </h4> {ordering}
      </div>

      {filteredData ? (
        <div className="container">
          {arr.length &&
            arr.map((item, i) => {
              //console.log(item);
              return (
                <Lists
                  title={item.title}
                  value={item.value}
                  arr={filteredData["tickets"]}
                  grouping={grouping}
                  key={i}
                >
                  {" "}
                </Lists>
              );
            })}
        </div>
      ) : (
        "No Tickets Found"
      )}
    </div>
  );
}

export default Home;
