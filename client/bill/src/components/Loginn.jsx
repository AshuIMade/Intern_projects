import React, { useState, useEffect } from "react";
import "../css/index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const fb = "./src/assets/fb.png";
  const x = "./src/assets/x.png";
  const linkk = "./src/assets/link.png";
  const image1 = "./src/assets/img2.png";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
        setIsSignUp(true);
      });

      signInButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
        setIsSignUp(false);
      });

      return () => {
        signUpButton.removeEventListener("click", () => {
          container.classList.add("right-panel-active");
        });
        signInButton.removeEventListener("click", () => {
          container.classList.remove("right-panel-active");
        });
      };
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/users/register",
        {
          username,
          email,
          password,
        }
      );

      setMessage(response.data.message);

       if (response.status == 201) {
        // Registration successful, switch to sign-in panel
         document.getElementById("container").classList.remove("right-panel-active");
         setIsSignUp(false);

        setUsername("");  
        setEmail('');     
        setPassword('');  
  
        //success message
        setMessage("Registration Successful, Proceed to Sign In");

      }
    } catch (error) {
      console.error("There was an error!", error);
      setMessage("Registration failed. Email may already be registered.");
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          email,
          password,
        }
      );
      console.log(response.data.success);
      if (response.data.success) {

        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            user: response.data.message.user,
            email: response.data.message.email,
          })
        );
        navigate("/dashboard");
      } else {
        console.log(response.data.message);
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("There was an error!", error);
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="logincontainer">
      <header className="site-header">
        <div className="logo">
          <Link className="link" to="/">
            <a>
              <h3 className="brand">Derash</h3>
            </a>
          </Link>
        </div>
        <nav className="navbar2">
          <ul>
            <li>
              <Link to="/ ">
                <a className="nav2" href="#about">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link to="/ ">
                <a className="nav2" href="#about">
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link to="/ ">
                <a className="nav2" href="#contactsec">
                  Contact
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="loginbody">
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form className="formstyle" action="#" onSubmit={handleSubmit}>
              <h1 className="h11">Create Account</h1>
              <span>or use your email for registration</span>
              <input
                className="forminput"
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="forminput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="forminput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="logbutton" type="submit">
                Sign Up
              </button>
              {message && <p>{message}</p>}
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="formstyle" action="#" onSubmit={handleSubmit1}>
              <h1 className="h11">Sign in</h1>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                className="forminput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="forminput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a className="aa" href="#">
                Forgot your password?
              </a>
              <button className="logbutton" type="submit">
                Sign In
              </button>
              {message && <p>{message}</p>}
            </form>
          </div>
          <div className="overlay1-container">
            <div className="overlay1">
              <div className="overlay1-panel overlay1-left">
                <h1 className="h11">Welcome Back!</h1>
                <p className="pp">
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay1-panel overlay1-right">
                <h1 className="h11">Hello, Friend!</h1>
                <p className="pp">
                  Enter your personal details and start journey with us
                </p>
                <button className="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>{new Date().getFullYear()}&copy; Derash</p>
        <div className="social">
          <a
            href="https://www.facebook.com/Derash-Bill-Pay-211384676079772"
            target="blank"
            className="fb"
          >
            <img src={fb} alt="Facebook" />
          </a>
          <a href="https://x.com/DerashBillPay" target="blank" className="fb">
            <img src={x} alt="X" />
          </a>
          <a
            href="https://www.linkedin.com/in/derash-bill-pay-012bb415a/"
            target="blank"
            className="fb"
          >
            <img src={linkk} alt="LinkedIn" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Login;
