import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import "./home.css";
import Content from "./Content";
import { useState } from "react";

const Home = () => {
  const [thread, setThread] = useState("test");
  const [user, setUser] = useState(null);

  return (
    <div>
      <TopBar onUser={setUser} />
      <div className="content">
        <Sidebar onThread={setThread} />
        <Content renderContent={thread} user={user} />
      </div>
    </div>
  );
};

export default Home;
