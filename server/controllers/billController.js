const Bill = require('../models/billModle').default;
const axios = require('axios');
const User = require('../models/userModel');
const db = require('../models');

const UserAPI = db.UserAPI;

const saveBillAndSendToAPI = async (req, res) => {
  try {
    const { data: filename, email,file_name } = req.body; // Destructure data and email from the request body

    // Step 1: Find the API key and secret for the given email
    const userApi = await UserAPI.findOne({
      where: { email },
      attributes: ['email', 'api_key', 'api_secret']
    });

    // Step 2: Handle case where no API key and secret are found or they are missing
    if (!userApi) {
      return res.status(404).json({ message: 'Not approved to upload. Please contact admin.' });
    }

    // Set empty strings if api_key or api_secret are not found
    userApi.api_key = userApi.api_key ;
    userApi.api_secret = userApi.api_secret ;

    
   
    

    // Log the userApi to verify it has the correct keys
    console.log("API Secret:", userApi.api_secret);
    console.log("API Key:", userApi.api_key);

    // Loop through each JSON object (each row from the CSV)
    const results = await Promise.all(
      filename.map(async (row) => {
        try {
          // Prepare the request payload
          const payload = {
            bill_id: row.bill_id,
            bill_desc: row.bill_desc,
            reason: row.reason,
            amount_due: parseFloat(row.amount_due),  
            customer_id: row.customer_id,
            name: row.name,
            partial_pay_allowed: row.partial_pay_allowed.toLowerCase() === 'true',  
            due_date: new Date(row.due_date),  
            mobile: row.mobile,
            email: row.email
          };

          // Send the payload to the external API
          const response = await axios.post('http://197.156.65.131:8010/biller/customer-bill-data', payload, {
            headers: {
              'Content-Type': 'application/json',
              'api-key': userApi.api_key,
              'api-secret': userApi.api_secret,
            }
          });

          // Extract relevant data from the response
          const data = response.data;
          const { bill_id, confirmation_code, message } = data;

          const billsTable = db.bills;  

// If the API call was successful and returned a confirmation code, save the data to the database
if (response.status === 200 && confirmation_code) {
   await billsTable.create({
    bill_id: row.bill_id,
    bill_desc: row.bill_desc,
    reason: row.reason,
    amount_due: parseFloat(row.amount_due),
    customer_id: row.customer_id,
    name: row.name,
    partial_pay_allowed: row.partial_pay_allowed.toLowerCase(),
    due_date: new Date(row.due_date),
    mobile: row.mobile,
    email: row.email,
    confirmation_code: confirmation_code,  
    uploader: email,  
    createdAt: new Date(),
    file_name:file_name
  });

   return { bill_id, confirmation_code };
} else {
   return { bill_id: row.bill_id, message };
}

        } catch (error) {
          console.error('Error processing row:', row, error);
           return { bill_id: row.bill_id, message: error.response?.data?.message || 'An error occurred' };
        }
      })
    );

    // Send the results back to the front end
    res.json(results);
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  saveBillAndSendToAPI,
};
