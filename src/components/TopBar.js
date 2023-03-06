import "./topbar.css";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase";
import { useState } from "react";

const TopBar = (props) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  auth.useDeviceLanguage();

  const [user, setUser] = useState(null);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        setUser(result);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
      });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div className="topBar">
      <p>Mock WebSite</p>
      <input type={"text"} placeholder="Search Mock WebSite"></input>
      {user ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <button onClick={login}>Log In</button>
      )}
    </div>
  );
};

export default TopBar;
