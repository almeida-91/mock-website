import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import "./content.css";

// TODOS:
// Add upvote and downvote functions
// Add thread viewing functionality
// Add reply to thread functionality

const Content = (props) => {
  const [threadRender, setThreadRender] = useState();
  const [toggleNewThreadForm, setToggleNewThreadForm] = useState(false);
  const [subreddit, setSubReddit] = useState();

  console.log(props.user);
  const getThreads = async () => {
    setToggleNewThreadForm(false);
    const threadsRef = doc(db, "r", props.renderContent);
    const threadSnap = await getDoc(threadsRef);

    if (threadSnap.exists() && threadSnap.data().threads.length > 0) {
      setSubReddit(props.renderContent);
      const threadArray = threadSnap.data().threads;
      threadArray.sort(({ date: a }, { date: b }) =>
        a > b ? -1 : a < b ? 1 : 0
      );
      const thread = threadArray.map((thread, index) => {
        return (
          <div key={index} className="thread">
            <div>{index + 1}</div>
            <div className="scoreDiv">
              <button>Up</button>
              <span>{thread.score}</span>
              <button>Down</button>
            </div>
            <div className="threadContent">
              <h3>{thread.title}</h3>
              <div>{thread.text}</div>
              <div className="dateAndAuthor">
                {moment(thread.date).fromNow()} by {thread.author}
              </div>
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

  const newThreadForm = props.user ? (
    <div>
      <form
        onSubmit={createNewThread}
        className="newThreadForm"
        id="newThreadForm"
      >
        <label htmlFor="title">Thread Title:</label>
        <input type={"text"} name="title" />
        <label htmlFor="description">Description:</label>
        <textarea type={"textarea"} name="description" />
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
  ) : (
    <div>
      <div>You must login to create a new thread!</div>
      <button onClick={() => setToggleNewThreadForm(false)}>Back</button>
    </div>
  );

  async function createNewThread(e) {
    e.preventDefault();
    setToggleNewThreadForm(false);
    const newThreadForm = document.getElementById("newThreadForm");
    const threadsRef = doc(db, "r", props.renderContent);

    const newThread = {
      title: newThreadForm.elements.title.value,
      text: newThreadForm.elements.description.value,
      date: new Date().toJSON(),
      score: 0,
      replies: [],
      author: props.user.user.displayName,
    };

    await updateDoc(threadsRef, {
      threads: arrayUnion(newThread),
    });

    getThreads();
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
