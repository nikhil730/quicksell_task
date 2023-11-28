import Card from "./card";
import "./lists.css";
function Lists(tickets) {
  console.log(tickets);
  if (tickets)
    return (
      <div className="col">
        <div className="cghead">
          <div className="flexbox">
            <div className="title_top">{tickets.title}</div>
          </div>
          <div className="flexbox">
            <div>
              <span class="material-symbols-outlined">+</span>
            </div>{" "}
            <div>
              <span class="material-symbols-outlined"></span>
            </div>
          </div>
        </div>

        {tickets.grouping === "Priority" &&
          tickets.arr
            .filter((item) => item.priority === tickets.value)
            .map((item, i) => {
              return <Card item={item} key={item.id}></Card>;
            })}
        {tickets.grouping === "Status" &&
          tickets.arr
            .filter((item) => item.status === tickets.value)
            .map((item, i) => {
              return <Card item={item} key={item.id}></Card>;
            })}
        {tickets.grouping === "User" &&
          tickets.arr
            .filter((item) => item.userId === tickets.value)
            .map((item, i) => {
              return <Card item={item} key={item.id}></Card>;
            })}
      </div>
    );
}

export default Lists;
