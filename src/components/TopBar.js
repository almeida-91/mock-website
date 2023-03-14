import "./topbar.css";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useState } from "react";

const TopBar = ({ onUser }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  auth.useDeviceLanguage();
  const [userInfo, setUserInfo] = useState(null);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        onUser(result);
        setUserInfo(result);
      })
      .catch((error) => {
        console.log(error);
        onUser(null);
      });
  };

  const logout = () => {
    onUser(null);
  };

  return (
    <div className="topBar">
      <p>Mock WebSite</p>
      <input type={"text"} placeholder="Search Mock WebSite"></input>
      {userInfo ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <button onClick={login}>Log In</button>
      )}
    </div>
  );
};

export default TopBar;
