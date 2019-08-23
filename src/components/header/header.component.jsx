import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.styles.scss";
import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? ( // se currentUser != null -> existe -> faz sign out ------> else não existe -> faz sign in
          <div className="option" onClick={() => auth.signOut()}>
            {/*signout -> method provided to us by the firebase auth library*/}
            Sign Out
          </div>
        ) : (
          <Link className="option" to="/signin">
            SignIN
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
