import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./sidebar.css";
import { useEffect, useState } from "react";

const Sidebar = ({ onThread }) => {
  const [topics, setTopics] = useState();

  const getTopics = async () => {
    const querySnapshot = await getDocs(collection(db, "r"));
    let fetchedTopics = [];
    querySnapshot.forEach((doc) => {
      fetchedTopics.push(doc.id);
    });
    setTopics(fetchedTopics);
  };

  useEffect(() => {
    getTopics();
  }, []);

  let topicList;

  if (topics) {
    topicList = topics.map((topic, index) => (
      <button key={index} onClick={() => onThread(topic)}>
        {topic.charAt(0).toUpperCase() + topic.slice(1, topic.length)}
      </button>
    ));
  }

  return (
    <div className="sidebar">
      <p>Content:</p>
      {topicList}
    </div>
  );
};

export default Sidebar;
