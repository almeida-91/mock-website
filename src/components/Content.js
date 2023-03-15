import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import "./content.css";
import { v4 as uuidv4 } from "uuid";
import { updateCurrentUser } from "firebase/auth";
import { Link } from "react-router-dom";

// TODOS:
// Add upvote and downvote functions
// Add thread viewing functionality
// Add reply to thread functionality

const Content = (props) => {
  const [threadRender, setThreadRender] = useState();
  const [toggleNewThreadForm, setToggleNewThreadForm] = useState(false);

  console.log(props.user);
  console.log(props.renderContent);
  const getThreads = async () => {
    setToggleNewThreadForm(false);
    const threadsRef = doc(db, "r", props.renderContent);
    const threadSnap = await getDoc(threadsRef);

    if (threadSnap.exists() && threadSnap.data().threads.length > 0) {
      const threadArray = threadSnap.data().threads;
      threadArray.sort(({ date: a }, { date: b }) =>
        a > b ? -1 : a < b ? 1 : 0
      );
      const thread = threadArray.map((thread, index) => {
        return (
          <div key={index} className="thread">
            <div>{index + 1}</div>
            <div className="scoreDiv">
              <button onClick={() => upvote(thread)}>Up</button>
              <span>{thread.upvotedBy.length - thread.downvotedBy.length}</span>
              <button onClick={() => downvote(thread)}>Down</button>
            </div>
            <div>
              <i class="material-icons">forum</i>
            </div>
            <div className="threadContent">
              <h3>{thread.title}</h3>
              <div>{thread.text}</div>
              <div className="dateAndAuthor">
                submitted {moment(thread.date).fromNow()} by {thread.author} to
                <Link to={`/r/${props.renderContent}`}>
                  /r/{props.renderContent}
                </Link>
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
      replies: [],
      author: props.user.user.displayName,
      id: uuidv4(),
      upvotedBy: [props.user.user.displayName],
      downvotedBy: [],
    };

    await updateDoc(threadsRef, {
      threads: arrayUnion(newThread),
    });

    getThreads();
  }

  async function upvote(thread) {
    if (!props.user) {
      alert("You must login to vote!");
      return;
    }

    const threadsRef = doc(db, "r", props.renderContent);
    updateDoc(threadsRef);

    if (thread.upvotedBy.includes(props.user.user.displayName)) {
    }
  }

  async function downvote(thread) {
    if (!props.user) {
      alert("You must login to vote!");
      return;
    }

    const threadsRef = doc(db, "r", props.renderContent);
    if (thread.upvotedBy.includes(props.user.user.displayName)) {
    }
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
