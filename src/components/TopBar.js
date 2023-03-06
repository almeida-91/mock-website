import "./topbar.css";

const TopBar = (props) => {
  return (
    <div className="topBar">
      <p>Mock WebSite</p>
      <input type={"text"} defaultValue="Search Mock WebSite"></input>
      <button>Log In</button>
    </div>
  );
};

export default TopBar;
