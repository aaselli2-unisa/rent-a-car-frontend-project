import React from 'react'
import musteri from '../../assets/musteri.jpg';
import anahtar from '../../assets/anahtar.jpg';
import './About.css';

type Props = {}

const AboutUs = (props: Props) => {
    return (
        <div className="container-card">
         <div className="form">
        <div className="rent-a-car-page">
            <div className='hakkimizda'>
                <h2 className='h2-card'>ABOUT US</h2> <br />
                <p>ExtendRent is your city's reliable and friendly car rental service provider. Since 2022, our company has focused on leadership in the sector and customer satisfaction, aiming to offer customers a comfortable and convenient travel experience.

                    We work hard to understand our customers' needs and offer the most suitable vehicles. With our wide vehicle fleet and fair pricing policy, we are here to meet all customer demands.

                    Our experienced and expert team supports customers at every step to make their journeys smooth. By keeping customer satisfaction at the highest level, ExtendRent provides a reliable, high-quality, and affordable car rental experience.
</p>
            </div> 
            <div className="row">
                <div className="left-column left1">
                    <img className='carImage car1' src={musteri} alt='car-image' />
                </div>
                <div className="right-column">
                    <h4>OUR MISSION</h4>
                    <p>
                        Our mission is to make travel easier and maximize customer satisfaction by providing reliable, affordable, and high-quality car rental services. As a small family business, our top priority is to make every customer feel valued and respond to their needs with care. </p> <br />

                    <h4>OUR VISION</h4>
                    <p>
                        Our vision as a Rent A Car company is to continuously improve our customers' travel experience and provide the best service. We started with one branch, but in the future we aim to reach a wider customer base by opening more branches. We stay open to innovation and want to improve service quality by using technology.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="left-column">
                    <h4>OUR VALUES</h4>
                    <p>Customer Satisfaction: We always prioritize customer satisfaction.
                        Reliability: We are committed to providing reliable and honest service.
                        Flexibility: We respond to customer requests flexibly and offer solutions tailored to their needs.
                        Social Responsibility: We care about operating with social and environmental awareness and supporting local communities.
                        </p>
                </div>
                <div className="right-column right1">
                    <img className='carImage car2' src={anahtar} alt='car-image' />
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default AboutUs