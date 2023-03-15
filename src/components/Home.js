import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import "./home.css";
import Content from "./Content";
import { useEffect, useState } from "react";

const Home = (props) => {
  const [thread, setThread] = useState("test");
  const [user, setUser] = useState(null);

  useEffect(() => {}, []);

  return (
    <div>
      <TopBar onUser={setUser} />
      <div className="content">
        <Sidebar onThread={setThread} />
        {props.thread ? (
          <Content renderContent={props.thread} user={user} />
        ) : (
          <Content renderContent={thread} user={user} />
        )}
      </div>
    </div>
  );
};

export default Home;
