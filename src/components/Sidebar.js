import { db } from "../firebase";
import { getDoc, collection } from "firebase/firestore";
import "./sidebar.css";

const Sidebar = ({ onThread }) => {
  const getTopics = async () => {
    const topicArray = [];
    const topicRef = collection(db, "r");
  };

  return (
    <div className="sidebar">
      <p>Content:</p>
      <button onClick={() => onThread("test")}>Test</button>
      <button onClick={() => onThread("gaming")}>Gaming</button>
    </div>
  );
};

export default Sidebar;
