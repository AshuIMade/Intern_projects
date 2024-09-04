import { useState } from "react";
import papa from "papaparse";
import styles from './Upload.module.css';

function FileUpload() {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [showTable, setShowTable] = useState(false);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFileName(file.name);
  }

  function handleUploadFile(e) {
    e.preventDefault();
    const file = document.getElementById("fileInput").files[0];
    if (file) {
      papa.parse(file, {
        header: true,
        complete: (results) => {
          setData(results.data);
          setShowTable(true);
        },
      });
    }
  }
  return (
    <>
     <input
        type="file"
        name="files[]"
        id="fileInput"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: 'none' }} // Keep hidden
      />
      <div className={styles.uploadContainer}>
        <h3>Upload your file here</h3>
        <p>Upload a CSV file here</p>
        <form
          action="/upload"
          method="post"
          encType="multipart/form-data"
          className={styles.uploadBox}
        >
          <div className={styles.uploadIcon}>
            <span>&#x2601;</span>
          </div>
          <p>
            Drag & Drop your files here <br /> OR
          </p>
          <label htmlFor="fileInput" className={styles.browseButton}>
            Browse Files
          </label>
          {fileName && <p>Selected File: {fileName}</p>}
          <button onClick={handleUploadFile} className={styles.uploadButton}>
            Upload
          </button>
        </form>
      </div>
      {showTable && data.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Country</th>
              <th>Rice</th>
              <th>Wheat</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.Country}</td>
                <td>{row.Rice}</td>
                <td>{row.Wheat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </>
  );
}
export default FileUpload;
