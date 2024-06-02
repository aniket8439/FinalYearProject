// ContactUsPage.js
import  { useState } from 'react';
import axios from 'axios';
import "../assets/styles/contactStyles.css";

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('your_api_here', { name, email, message });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <div className="contact-us-page">
      <h1>Contact Us</h1>
      {submitted ? (
        <p>Thank you for your message!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message"></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ContactUsPage;
