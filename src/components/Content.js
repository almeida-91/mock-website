import { doc, collection, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import "./content.css";

const Content = () => {
  const [currentThread, setCurrentThread] = useState();
  const [threadRender, setThreadRender] = useState();

  const getThreads = async () => {
    const threadsRef = doc(db, "r", "test");
    const threadSnap = await getDoc(threadsRef);

    if (threadSnap.exists()) {
      console.log("Thread data:", threadSnap.data().threads);
      setCurrentThread(threadSnap.data().threads);
      const thread = threadSnap.data().threads.map((thread) => {
        return (
          <div key={thread.title} className="thread">
            <div>{thread.score}</div>
            <div>
              <div>{thread.title}</div>
              <div>{thread.text}</div>
            </div>
          </div>
        );
      });
      setThreadRender(thread);
      console.log(thread);
    } else {
      console.log("No such Thread");
    }
  };

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <div>
      <p>Content:</p>
      {threadRender}
    </div>
  );
};

export default Content;
