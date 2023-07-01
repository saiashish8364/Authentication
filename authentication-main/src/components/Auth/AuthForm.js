import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [request, setRequest] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const requestSending = async () => {
    setRequest(true);
    try {
      const response = await fetch(
        "https://react-backend-test-1-default-rtdb.asia-southeast1.firebasedatabase",
        {
          method: "POST",
          body: JSON.stringify({
            username: "ashish",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.log(response);
      }
    } catch (error) {
      setRequest(false);
      window.alert(error.message);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          {request ? (
            <p style={{ color: "white" }}>Sending request...</p>
          ) : (
            <button type="submit" onClick={requestSending}>
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
