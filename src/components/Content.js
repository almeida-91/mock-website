import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import "./content.css";

const Content = (props) => {
  console.log(props);
  const [currentThread, setCurrentThread] = useState();
  const [threadRender, setThreadRender] = useState();
  const [toggleNewThreadForm, setToggleNewThreadForm] = useState(false);

  const getThreads = async () => {
    setToggleNewThreadForm(false);
    const threadsRef = doc(db, "r", props.renderContent);
    const threadSnap = await getDoc(threadsRef);

    if (threadSnap.exists() && threadSnap.data().threads) {
      console.log("Thread data:", threadSnap.data().threads);
      setCurrentThread(threadSnap.data().threads);
      const thread = threadSnap.data().threads.map((thread, index) => {
        return (
          <div key={index} className="thread">
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
      const thread = <div>No threads here.. :/</div>;
      setThreadRender(thread);
    }
  };

  useEffect(() => {
    getThreads();
  }, [props]);

  const newThreadForm = (
    <div>
      <form onSubmit={createNewThread}>
        <label htmlFor="title">Thread Title:</label>
        <input type={"text"} name="title" />
        <label htmlFor="description">Description:</label>
        <input type={"textarea"} name="description" />
        <button>Submit</button>
      </form>
    </div>
  );

  function createNewThread(e) {
    e.preventDefault();
  }

  return (
    <div>
      <p>Content:</p>
      {toggleNewThreadForm ? (
        newThreadForm
      ) : (
        <button onClick={() => setToggleNewThreadForm(true)}>New thread</button>
      )}
      {threadRender}
    </div>
  );
};

export default Content;
