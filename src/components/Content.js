import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import "./content.css";

const Content = (props) => {
  console.log(props);
  const [currentThread, setCurrentThread] = useState();
  const [threadRender, setThreadRender] = useState();
  const [toggleNewThreadForm, setToggleNewThreadForm] = useState(false);
  const [subreddit, setSubReddit] = useState();
  const [newThreadTitle, setNewThreadTitle] = useState();
  const [newThreadDescription, setNewThreadDescription] = useState();

  const getThreads = async () => {
    setToggleNewThreadForm(false);
    const threadsRef = doc(db, "r", props.renderContent);
    const threadSnap = await getDoc(threadsRef);

    if (threadSnap.exists() && threadSnap.data().threads) {
      setCurrentThread(threadSnap.data().threads);
      const thread = threadSnap.data().threads.map((thread, index) => {
        return (
          <div key={index} className="thread">
            <div>{thread.score}</div>
            <div>
              <div>{thread.title}</div>
              <div>{thread.text}</div>
              <div>{moment(thread.date).fromNow()}</div>
            </div>
          </div>
        );
      });
      setThreadRender(thread);
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
      <form onSubmit={createNewThread} className="newThreadForm">
        <label htmlFor="title">Thread Title:</label>
        <input type={"text"} onChange={handleTitleChange} name="title" />
        <label htmlFor="description">Description:</label>
        <textarea
          type={"textarea"}
          onChange={handleDescriptionChange}
          name="description"
        />
        <button type="submit">Submit</button>
        <button
          onClick={() => {
            setToggleNewThreadForm(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );

  function handleTitleChange(e) {
    setNewThreadTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setNewThreadDescription(e.target.value);
  }

  async function createNewThread(e) {
    e.preventDefault();
    setToggleNewThreadForm(false);
    const threadsRef = doc(db, "r", props.renderContent);

    let currentDate = new Date().toJSON();

    const newThread = {
      title: newThreadTitle,
      text: newThreadDescription,
      date: currentDate,
      score: 0,
      replies: [],
    };

    await updateDoc(threadsRef, {
      threads: arrayUnion(newThread),
    });
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
