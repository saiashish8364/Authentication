import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../Store/AuthContext";
let timer;
const MainNavigation = () => {
  const history = useHistory();
  const ctx = useContext(AuthContext);
  const isLoggedIn = ctx.isLoggedIn;
  const logoutHandler = () => {
    ctx.logout();
    history.replace("/auth");
    clearTimeout(timer);
  };
  if (isLoggedIn) {
    timer = setTimeout(() => {
      logoutHandler();
    }, 300000);
  }
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
