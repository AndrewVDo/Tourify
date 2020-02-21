import React, { Component } from "react";
import { signInWithGoogle } from "../firebase";
import GoogleButton from "react-google-button";

class SignInWithGoogle extends Component {
  render() {
    return <GoogleButton onClick={signInWithGoogle} />;
  }
}

export default SignInWithGoogle;
