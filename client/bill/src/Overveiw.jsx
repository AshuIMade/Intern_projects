import { useState } from "react";
import FileUpload from "./FileUpload";
import styles from "./Upload.module.css";

import { Link, useNavigate } from "react-router-dom";

function Overveiw() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const imgg = "./src/assets/bill2.jpg";

  const logoutbutton = () => {
    sessionStorage.clear("user");
    navigate("/login");
  };
  return (
    <div className={styles.fileuploadbody}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.Logo}>Derash</div>
          <ul className={styles.menu}>
            <li
              className={activeSection === "overview" ? styles.active : ""}
              onClick={() => setActiveSection("overview")}
            >
              <i className="fa-regular fa-clock"></i>
              Overview
            </li>
            <li
              className={activeSection === "upload" ? styles.active : ""}
              onClick={() => setActiveSection("upload")}
            >
              <i className="fa-solid fa-cloud"></i>
              Upload
            </li>
            <li
              className={activeSection === "history" ? styles.active : ""}
              onClick={() => setActiveSection("history")}
            >
              <i className="fa-solid fa-clock-rotate-left"></i>
              Upload History
            </li>
            <button className={styles.logout} onClick={logoutbutton}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
            </button>
          </ul>
        </aside>
        <div className={styles.content}>
          {activeSection === "overview" && (
            <>
              <div>
                <h1 className={styles.overviewtitle}>
                  <i className="fa-solid fa-bars"></i>Overview
                </h1>
              </div>
              <div className={styles.overviewContent}>
                <div className={styles.textSection}>
                  <h2>Bill Integrator</h2>
                  <p>
                    Welcome to our secure and efficient data management
                    platform, designed to streamline the process of uploading,
                    validating, and transmitting Excel data to the Derash
                    System.
                  </p>
                </div>
                <div className={styles.overviewPic}>
                  <img alt="picture" src={imgg} />
                </div>
              </div>
            </>
          )}

          {activeSection === "history" && (
            <div>
              <h2>Upload History</h2>
              <p>This is the upload history section.</p>
            </div>
          )}
        </div>
        <div className={styles.upload}>
          {activeSection === "upload" && <FileUpload />}
        </div>
      </div>
    </div>
  );
}
export default Overveiw;
