import "./card.css";
function card(props) {
  return (
    <div className="cardbox">
      <div className="card-body">
        <div className="card-head">
          <div className="head-text">{props.item.id}</div>
          <div>
            <img
              src="https://assets.leetcode.com/users/nikhilbhalla196/avatar_1630257326.png"
              alt="img"
              className="profile-img"
            />
          </div>
        </div>
        <div className="card-text">{props.item.title}</div>
        <div className="card-footer">
          <div className="feature-box">
            <span class="material-symbols-outlined"> ! </span>
          </div>
          <div className="feature-box">
            <div className="round-box"></div>
            <div className="feature-text">{props.item.tag[0]}</div>
          </div>
          <div className="remove">-</div>
        </div>
      </div>
    </div>
  );
}

export default card;
