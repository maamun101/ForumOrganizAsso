import { useState } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import "../css/LoginSignup.css";

// componant that switch betwin the Login and the Signup pages
function LoginSignup({loginFunction, setAdminFunction}){

    // by default it show the Login page
    const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="LoginSignup">
      <div className="welcomeZone">
        <p>
          Welcome !<br /> Login or Signup to enter.{" "}
        </p>
      </div>

            <div>
                {isLogin ? (
                    <Login onSwitch={() => setIsLogin(false)} loginFunction={loginFunction} setAdminFunction={setAdminFunction} />
                ) :
                (
                    <Signup onSwitch={() => setIsLogin(true)} />
                )}
            </div>
        </div>
    )

}

export default LoginSignup;
