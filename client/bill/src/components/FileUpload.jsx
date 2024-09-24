import { useState } from "react";
import Papa from "papaparse";
import styles from '../css/upload.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

function FileUpload() {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState([]);
  const [noErrors, setNoErrors] = useState(false);
  const [apiError, setApiError] = useState([]); // Array to store API errors
  const [successfulUploads, setSuccessfulUploads] = useState([]); // Array to store successful uploads
  const [filedata, setFiledata] = useState(null);  // Parsed file data

  // Function to validate the data in each row (Same as before)
  const validateData = (data) => {
    const newErrors = [];
    const uniqueBillIds = new Set();

    data.forEach((row, index) => {
      const {
        bill_id,
        bill_desc,
        reason,
        amount_due,
        customer_id,
        name,
        partial_pay_allowed,
        due_date,
        mobile,
        email,
      } = row;

      // Skip empty rows
      if (!bill_id && !bill_desc && !amount_due && !customer_id && !name && !partial_pay_allowed && !due_date && !mobile && !reason && !email) {
        return; 
      }

      // Validate bill_id - must be unique and a non-empty string
      if (!bill_id || uniqueBillIds.has(bill_id)) {
        newErrors.push(`Row ${index + 1}: Duplicate or invalid bill_id`);
      } else {
        uniqueBillIds.add(bill_id);
      }

      // Validate bill_desc - must be a string
      if (!bill_desc || typeof bill_desc !== 'string') {
        newErrors.push(`Row ${index + 1}: Invalid bill_desc`);
      }

      // Validate reason - must be a string
      if (!reason || typeof reason !== 'string') {
        newErrors.push(`Row ${index + 1}: Invalid reason`);
      }

      // Validate amount_due - must be a number
      if (isNaN(amount_due) || Number(amount_due) < 0) {
        newErrors.push(`Row ${index + 1}: Invalid amount_due`);
      }

      // Validate customer_id - must be unique and non-empty
      if (!customer_id ) {
        newErrors.push(`Row ${index + 1}: Invalid customer_id`);
      }

      // Validate name
      if (!name || typeof name !== 'string') {
        newErrors.push(`Row ${index + 1}: Invalid name`);
      }

      // Validate partial_pay_allowed - must be Boolean
      if (
        typeof partial_pay_allowed !== 'string' ||
        (partial_pay_allowed.toLowerCase() !== 'true' && partial_pay_allowed.toLowerCase() !== 'false')
      ) {
        newErrors.push(`Row ${index + 1}: Invalid partial_pay_allowed`);
      }

      // Validate due_date
      if (isNaN(Date.parse(due_date))) {
        newErrors.push(`Row ${index + 1}: Invalid due_date`);
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        newErrors.push(`Row ${index + 1}: Invalid email`);
      }

      // Validate mobile
      const mobileRegex = /^(09|07|9|7)\d{8}$/;
      if (!mobile || !mobileRegex.test(mobile)) {
        newErrors.push(`Row ${index + 1}: Invalid mobile`);
      }
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setNoErrors(false);
    } else {
      setErrors([]);
      setNoErrors(true);
    }
  };

  // Handle file change and parse CSV
  function handleFileChange(e) {
    const file = e.target.files[0];
    setFileName(file.name);
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setFiledata(results.data);
          validateData(results.data);
        },
        error: (error) => {
          setErrors([`File parsing error: ${error.message}`]);
        },
      });
    }
  }

  // Function to handle the file upload
 const handleUpload = async () => {
  if (noErrors && filedata) {
    const user = JSON.parse(sessionStorage.getItem('user'));

    // Access the email
    const email = user.email;
    console.log(email)
    try {
      const response = await axios.post('http://localhost:8000/api/Bill/bills', {
        data: filedata,
        email: email,
        file_name:fileName
      });

      // Directly access response.data
      const result = response.data;

      // Initialize arrays for successful uploads and API errors
      const successfulUploads = [];
      const apiError = [];

      // Iterate over each response item
      result.forEach((res) => {
        if (res.confirmation_code) {
          // If confirmation_code exists, it's a success
          successfulUploads.push({
            bill_id: res.bill_id,
            confirmation_code: res.confirmation_code
          });
        } else if (res.message) {
          // Otherwise, treat it as an error
          apiError.push({
            bill_id: res.bill_id,
            message: res.message
          });
        }
      });

      // Update the state with the results
      setSuccessfulUploads(successfulUploads);
      setApiError(apiError);
      
    } catch (error) {
      console.error('Error uploading file:', error.response?.data?.message || error.message || error);
      // Handle different types of errors, including network errors, and display error message to the user
      setErrors([`Error uploading file: ${error.response?.data?.message || error.message || 'Unknown error occurred'}`]);
    }
  }
};

  return (
    <>
      <div className={styles.uploadContainer}>
        <h3>Upload your file here</h3>
        <p>Upload a CSV file here</p>

        <div className={styles.uploadIcon}>
          <span>&#x2601;</span>
        </div>
        <p>
          Drag & Drop your files here <br /> OR
        </p>
        <input
          type="file"
          name="files"
          id="fileInput"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="fileInput" className={styles.browseButton}>
          Browse Files
        </label>
        {fileName && <p>Selected File: {fileName}</p>}

        {errors.length > 0 ? (
          <div className='errortable'>
            <h3>Errors:</h3>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Errors</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {errors.map((error, index) => (
                    <TableRow key={index}>
                      <TableCell>{error}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : noErrors ? (
          <>
            <p>No errors found. You can now upload the file.</p>
            <button className={styles.uploadButton} onClick={handleUpload}>Upload</button>

            {successfulUploads.length > 0 && (
  <div className='successTable'>
    <h3>Successfully Uploaded:</h3>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bill ID</TableCell>
            <TableCell>Confirmation Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {successfulUploads.map((upload, index) => (
            <TableRow key={index}>
              <TableCell>{upload.bill_id}</TableCell>
              <TableCell>{upload.confirmation_code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)}

{apiError.length > 0 && (
  <div className='errorTable'>
    <h3>Errors:</h3>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bill ID</TableCell>
            <TableCell>Error Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiError.map((error, index) => (
            <TableRow key={index}>
              <TableCell>{error.bill_id}</TableCell>
              <TableCell>{error.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)}


          </>
        ) : null}
      </div>
    </>
  );
}

export default FileUpload;
