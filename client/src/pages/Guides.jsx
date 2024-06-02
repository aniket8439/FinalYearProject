

import { useState } from 'react';
import ChatBot from './ChatBot';
import "../assets/styles/guides.css";

const guidesData = [
    { 
      id: 1, 
      name: "John Doe", 
      dob: "01/01/1980", 
      address: "123 Main St", 
      contact: "+91 9313258023", 
      price: 50,
      biography: "John has been a professional guide for 10 years...",
      qualifications: "Certified tour guide with a degree in history...",
      specialties: "Specializes in historical tours and nature expeditions...",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      dob: "05/10/1992", 
      address: "456 Elm St", 
      contact: "+91 9313258023", 
      price: 40,
      biography: "Jane is passionate about sharing her knowledge of local culture...",
      qualifications: "Licensed tour guide with expertise in cultural anthropology...",
      specialties: "Offers culinary tours and art history walks...",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    { 
      id: 3, 
      name: "Michael Johnson", 
      dob: "12/15/1985", 
      address: "789 Oak St", 
      contact: "+91 9313258023", 
      price: 60,
      biography: "Michael is an adventurous guide with a love for outdoor activities...",
      qualifications: "Experienced wilderness guide with survival training...",
      specialties: "Leads hiking, camping, and mountaineering expeditions...",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    { 
      id: 4, 
      name: "Emily Wilson", 
      dob: "09/20/1990", 
      address: "101 Pine St", 
      contact: "+91 9313258023", 
      price: 45,
      biography: "Emily is an art enthusiast who enjoys sharing her passion with others...",
      qualifications: "Art history major with a deep knowledge of local artists...",
      specialties: "Conducts gallery tours and street art walks...",
      profilePic: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    { 
      id: 5, 
      name: "David Lee", 
      dob: "03/25/1982", 
      address: "321 Maple St", 
      contact: "+91 9313258023", 
      price: 55,
      biography: "David is a history buff with a knack for storytelling...",
      qualifications: "Master's degree in history with a focus on local heritage...",
      specialties: "Offers immersive historical tours and ghost walks...",
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    { 
      id: 6, 
      name: "Sarah Brown", 
      dob: "07/08/1988", 
      address: "246 Walnut St", 
      contact: "+91 9313258023", 
      price: 35,
      biography: "Sarah is a nature lover who enjoys exploring the great outdoors...",
      qualifications: "Certified naturalist with extensive knowledge of local flora and fauna...",
      specialties: "Leads wildlife watching tours and nature photography expeditions...",
      profilePic: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    { 
      id: 7, 
      name: "Christopher Taylor", 
      dob: "11/18/1976", 
      address: "555 Cedar St", 
      contact: "+91 9313258023", 
      price: 70,
      biography: "Christopher is a seasoned guide with a passion for cultural exchange...",
      qualifications: "Fluent in multiple languages with a background in anthropology...",
      specialties: "Provides customized cultural immersion experiences for travelers...",
      profilePic: "https://randomuser.me/api/portraits/men/7.jpg"
    },
    { 
      id: 8, 
      name: "Jessica Martinez", 
      dob: "04/12/1995", 
      address: "888 Oak St", 
      contact: "+91 9313258023", 
      price: 50,
      biography: "Jessica is an energetic guide who loves showcasing her city's hidden gems...",
      qualifications: "Local history enthusiast with a degree in urban studies...",
      specialties: "Conducts off-the-beaten-path tours and culinary adventures...",
      profilePic: "https://randomuser.me/api/portraits/women/8.jpg"
    },
    // Add more guides as needed
  ];

const Guides = () => {
    const [appointee, setAppointee] = useState(null);

    const handleAppoint = (guide) => {
        setAppointee(guide);
    };

    const closeCard = () => {
        setAppointee(null);
    };

    const handleBackgroundClick = (event) => {
        if (event.target.classList.contains('App')) {
            closeCard();
        }
    };

    return (
        <>
            <ChatBot />
            <div className="App" onClick={handleBackgroundClick}>
      <header className="header">
        <h1 className='title'>Find Your Guide</h1>
      </header>
      <div className="guide-container">
        {guidesData.map((guide) => (
          <div key={guide.id} className="guide-card">
            <img src={guide.profilePic} alt={guide.name} className="profile-pic" />
            <div className="guide-info">
              <h2>{guide.name}</h2>
              <p>Date of Birth: {guide.dob}</p>
              <p>Address: {guide.address}</p>
              <p>Contact: {guide.contact}</p>
              <p>Price: ${guide.price}</p>
              <button onClick={() => handleAppoint(guide)}>Appoint</button>
            </div>
          </div>
        ))}
      </div>
      {appointee && (
        <div className="elevated-card">
          <button className="close-btn" onClick={closeCard}>Close</button>
          <h2>{appointee.name}</h2>
          <p>Date of Birth: {appointee.dob}</p>
          <p>Address: {appointee.address}</p>
          <p>Contact: {appointee.contact}</p>
          <h3>Biography:</h3>
          <p>{appointee.biography}</p>
          <h3>Qualifications:</h3>
          <p>{appointee.qualifications}</p>
          <h3>Specialties:</h3>
          <p>{appointee.specialties}</p>
        </div>
      )}
    </div>

            </>

            );
  };
export default Guides;
