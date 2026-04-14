import React from 'react'
import "./ContactUs.css";
import rent from '../../assets/rent.jpg';
import location from '../../assets/location.png';

type Props = {}

const Contacts = (props: Props) => {
  return (
    <div className="contact-container">
      <div className='ortak'>
    <div className="contact-info">
      <h2>CONTACT US</h2>
      <p>We are here to meet all your vehicle needs and help promote your car rental business on online platforms!</p>
      <hr style={{color:'white'}}/>
      <p><strong>Phone:</strong> (0 216) 656 26 00</p>
      <p><strong>Address:</strong> Abdi Ipekci Ave. Nisantasi No:15 </p>
      <p><strong>Email:</strong> extendRent@gmail.com</p>
    </div>

    <div className="contact-image">
      <img className='rent' src={rent} alt="Contact Image "/> 
    </div>
    </div>

    <div className="contact-cards">
      <div className="card contact">
      
      <h3 className='text' > <i className="lni lni-phone" style={{color:'black'}}></i> CONTACT US  </h3>
        <p className='text'>(0 216) 656 26 00</p>
        <p className='text'>(0 216) 656 26 01</p>
      </div>
      <div className="card contact location">
        <h3 className='text konum'><i className="lni lni-map-marker" style={{color:'black'}}></i></h3>
        <img className='location-img' src={location} alt="Contact Image"/> 
      </div>
      <div className="card contact">
        <h3 className='text'>WORKING HOURS</h3>
        <p className='text'>Weekdays  : 08:00 - 22:00 </p>
        <p className='text'>Weekends : 08:00 - 23:00 </p>
      </div>
    </div>
  </div>
  )
}
export default Contacts


