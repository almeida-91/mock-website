import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import "./home.css";
import Content from "./Content";

const Home = (props) => {
  return (
    <div>
      <TopBar />
      <div className="content">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

export default Home;
