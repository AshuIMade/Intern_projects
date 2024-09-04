import { useState, useEffect } from "react";

import T from "./T.jsx";
//import Signin from './Signin.jsx'
//import Home from './Home.jsx'
import Header from "./Header.jsx";
//import Footer from './Footer.jsx'
import Loginn from "./Loginn.jsx";
import Overveiw from "./Overveiw.jsx";
import UserProfile from "./Userprofile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

/*   <Router>
      <Routes>
        <Route path="/" element={ <Header /> }/>
        <Route path='/login' element={<Loginn/>}/>
        <Route path='/fileup' element={<T/>}/>
        <Route path='/header' element={<Header/>}/>
      </Routes>
    </Router>

    <>
    <Overveiw/>
    <UserProfile/>
    </>     
 */
function App() {
  /*
  const [backendData, setBackendData] = useState([{}]);
  useEffect(() => {
    fetch("/api")
      .then((Response) => Response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);
*/
  const Dashboard = () => {
    return (
      <>
        <Overveiw />
        <UserProfile />{" "}
      </>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Loginn />} />
        <Route path="/fileup" element={<T />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
