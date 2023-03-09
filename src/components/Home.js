import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import "./home.css";
import Content from "./Content";
import { useState } from "react";

const Home = (props) => {
  const [thread, setThread] = useState("test");

  return (
    <div>
      <TopBar />
      <div className="content">
        <Sidebar onThread={setThread} />
        <Content renderContent={thread} />
      </div>
    </div>
  );
};

export default Home;
