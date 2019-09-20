import React from "react";
//import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/signin-signup/signin-signup.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  //This onAuthStateChanged() is an observable
  //the function we passed in corresponds to the "next" -> whenever a value comes in we run the function that we pass to it
  //the second function we paassed in corresponds to the "error"
  //the "complete" rarely happens inside a firebase because firebaseis a live database
  componentDidMount() {
    const { setCurrentUser } = this.props;
    //                                \/ this corresponds to the user state - "next" call
    this.unsubscribeFromAuth = auth.onAuthStateChanged(
      //                                   ^ to know when firebase has realized that the autentication state has changed
      async userAuth => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
          });
        } else {
          setCurrentUser(userAuth);
        }
      },
      //\/"error" call
      error => console.log(error)
    );
  }

  // documentrefernce -> documentReference.get -> documentSnapshot -> documentSnapshot.exists=>boolean->verifica se o doc existe ou não

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  //                      dispatch is a way for redux to know that whatever object you're passing is going to be an action object that i'm gonna pass to every reducer
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
