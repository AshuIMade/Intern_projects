const Bill = require('../models/billModle');
const axios = require('axios');
const User = require('../models/userModel'); 
const db = require('../models');

const UserAPI = db.UserAPI;

const saveBillAndSendToAPI = async (req, res) => {
  try {
    
    const { data: filename, email } = req.body; // Destructure data and email from the request body
 // Step 1: Find the API key and secret for the given email
 const userApi = await UserAPI.findOne({
  where: { email },
  attributes: ['email', 'api_key', 'api_secret']
});

// Log the userApi to verify it has the correct keys
console.log("API Secret:", userApi.api_secret);
console.log("API Key:", userApi.api_key);

// Step 2: Handle case where no API key and secret are found
if (!userApi) {
  return res.status(404).json({ message: 'API key and secret not found for the given email' });
}

    // Loop through each JSON object (each row from the CSV)
    const results = await Promise.all(
      filename.map(async (row) => {
        try {
          // Prepare the request payload
          const payload = {
            bill_id: row.bill_id,
            bill_desc: row.bill_desc,
            reason: row.reason,
            amount_due: parseFloat(row.amount_due), // Ensure amount_due is a decimal
            customer_id: row.customer_id,
            name: row.name,
            partial_pay_allowed: row.partial_pay_allowed.toLowerCase() === 'true', // Convert to boolean
            due_date: new Date(row.due_date), // Convert to Date object
            mobile: row.mobile,
            email: row.email
          };

          // Send the payload to the external API
          const response = await axios.post('http://197.156.65.131:8010/biller/customer-bill-data', payload, {
            headers: {
              'Content-Type': 'application/json',
              'api-key':userApi.api_key,
              'api-secret': userApi.api_secret,
            }
          });

          // Extract relevant data from the response
          const data = response.data;
          const { bill_id, confirmation_code, message } = data;

          // If the API call was successful, return bill_id and confirmation_code
          if (response.status === 200) {
            return { bill_id, confirmation_code };
          } else {
            // Return the actual message from the API
            return { bill_id: row.bill_id, message };
          }
        } catch (error) {
          console.error('Error processing row:', row, error);
          // Return the error message from the API, if available
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
