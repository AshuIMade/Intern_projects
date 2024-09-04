import React, { useRef } from 'react';

 function Home(){
  const image1="./src/assets/img2.png";
 
  
  return(<>
   <div className="main-content" id='home'>
   <div className="overlay">
     <h1>Simplify Your Bill Payments</h1>
     <p>We help companies in Ethiopia to consolidate their bill paying processes into one manageable system </p>
      
   </div>
 </div>

 <section className="extra-content">
   <div className="extra-item">
   <div className="description">
       <h2>Simple Bill Management <br></br>With Derash</h2>
       <p>Derash makes bill payments easy.Just upload your CSV file,<br></br>and we handle the rest. Say goodbye to manual tracking and hello to <br></br>convenience</p>
     </div>
     
     </div>

   <div className="extra-item" id='about'>
   <div className="description">
       <h2>About Us</h2>
       <p> At Derash, we are experts in managing bill payments for companies and organizations.<br></br> We simplify your financial operations, so you can focus on what matters most—running your business.</p>
       
       <p>Our team is dedicated to bringing efficiency and clarity to your billing processes.<br></br> We use our deep understanding of the local market to offer tailored solutions that fit your needs.<br></br> Trust us to handle your bills with accuracy and care.</p>
     </div>
    
     
   </div>
 </section>
 <div id='contactsec'>
 <h2 className="contactus" >Contact Us</h2>        
 </div>

 <div className="contact-section"> 
 <div className="contact-info"> 
        <h2>Reach Out to Us</h2> 
        <p>Have questions or need help? Use the form to get in touch. We're here to assist with your billing needs.</p>
      </div>
       <form className="contact-form">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="input-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message"></textarea>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
 </>


);
 }
 export default Home