import "./RentalTerms.css";

const RentalTerms = () => {
  return (
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Rental Terms</h2>
        <div id="accordion">
          <div className="cardAccord">
            <div className="cardAccord-header" id="headingOne">
              <h5 className="mb-0">
                <button
                  className="btn-accord"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Cookie Policy
                </button>
              </h5>
            </div>

            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="card-body-accord">
                
                  ExtendRent uses cookies to provide a better website experience.
                  Cookies help the website function correctly, manage user
                  sessions, improve security, and remember user preferences.
                  Types of cookies we use include essential cookies, performance
                  cookies, and advertising cookies. Essential cookies are needed
                  for core functionality such as sign-in and key site features.
                  Performance cookies help us understand page traffic and improve
                  service quality. Advertising cookies are used to personalize
                  ads based on user interests and previous visits. You can manage
                  cookie preferences from your browser settings, block cookies,
                  or delete them at any time. Please note that disabling some
                  cookies may affect the proper functioning of certain features.

              </div>
            </div>
          </div>
          <div className="cardAccord">
            <div className="cardAccord-header" id="headingTwo">
              <h5 className="mb-0">
                <button
                  className="btn-accord"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Rental Terms
                </button>
              </h5>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordion"
            >
              <div className="card-body-accord">
                Welcome to ExtendRent, a platform that provides car rental
                services. Please read these terms carefully. By using ExtendRent,
                you agree to the following conditions. Account creation and
                security: You must create an account to use ExtendRent, and you
                are responsible for protecting your account credentials. Do not
                share your password. ExtendRent is not responsible for losses
                caused by unauthorized account access. Reservations: Vehicle
                reservations must follow the rules and pricing policies shown
                during booking. Reservations may be modified or canceled
                according to the applicable policy. Vehicle rental: During the
                rental process, users are responsible for providing accurate and
                up-to-date information about documents and rental details. Users
                must comply with local traffic and parking rules. Pricing and
                payments: Rental fees are determined by the pricing policy shown
                at reservation time, and payments must be completed securely
                through ExtendRent. Cancellation and refunds: These are applied
                according to the conditions specified during reservation.
                Violations and responsibilities: Misusing ExtendRent, harming
                other users, or damaging the platform is prohibited. Users must
                comply with all applicable laws. Privacy policy: Personal data is
                processed according to the ExtendRent Privacy Policy. Changes and
                updates: ExtendRent reserves the right to update these terms, and
                updates will be communicated to users. Please review this page
                regularly. Thank you, and drive safely.
              </div>
            </div>
          </div>
          <div className="cardAccord">
            <div className="cardAccord-header" id="headingThree">
              <h5 className="mb-0">
                <button
                  className="btn-accord"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Personal Data Protection and Processing Notice
                </button>
              </h5>
            </div>
            <div
              id="collapseThree"
              className="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordion"
            >
              <div className="card-body-accord">
                Dear Customer, thank you for using our rent-a-car services and
                for sharing your personal data with us. Customer privacy and data
                security are top priorities for ExtendRent. We collect personal
                data such as name and surname, contact details (phone and email),
                identity and driving license details, rental period and booking
                details, and payment information. We use this data to process
                rentals, provide customer support, improve our services, and
                comply with legal obligations. We may share or transfer personal
                data with third parties only when legally required and, where
                necessary, with your consent. We apply appropriate technical and
                organizational security measures and follow industry standards to
                protect your data. Personal data is retained only as long as
                needed for the purposes described and legal retention obligations,
                then deleted or anonymized. You have rights regarding your data,
                including access, correction, deletion, and objection to
                processing. If you have questions or concerns about your personal
                data, please contact us using the contact information available on
                our website. Sincerely, ExtendRent.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalTerms;
