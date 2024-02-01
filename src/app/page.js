"use client";
import Signup from "@/components/Signup";
import Login from "@/components/Login";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";
import Todoapp from "@/components/Todoapp";

export default function Home() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  function userLoggedInHandler() {
    setUserLoggedIn(true);
  }

  function userLoggedOutHandler() {
    setUserLoggedIn(false);
  }
  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-evenly">
      <Header loggedIn={userLoggedIn} loggingOut={userLoggedOutHandler} />
      {
        userLoggedIn ? (
          <>
            <hr className="w-full border-neutral-500" />
            <Todoapp />
            <hr className="w-full border-neutral-500" />
          </>
          )
          :
          (
            <>
              <Login userLoggingIn={userLoggedInHandler} />
              <hr className="w-full border-neutral-500" />
              <span className="text-neutral-900 font-bold">or</span>
              <Signup />
            </>
          )
      }
      <Footer />
    </main>
  );
}
