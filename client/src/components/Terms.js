import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import styles from './css/Global.module.css';
import terms from './css/Terms.module.css';

const Terms = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className={styles.show}>

      <div className={terms.termsContainer}>
        <div className={terms.termsCard}>
          <h1>TERMS OF SERVICE</h1>
          <p className={terms.lastUpdated}>Last updated: November 23, 2025</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using <strong>Oncue</strong> (the "Service"), you agree to be bound by these Terms of Service ("Terms").
              If you do not agree to these Terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2>2. Use of the Service</h2>
            <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for:</p>
            <ul>
              <li>2.1 Maintaining the confidentiality of your account credentials</li>
              <li>2.2 All activities that occur under your account</li>
              <li>2.3 Ensuring your information is accurate and up-to-date</li>
            </ul>
          </section>

          <section>
            <h2>3. User Accounts</h2>
            <p>
              You must be at least 13 years old to create an account. You agree to provide accurate information during registration
              and to update it as necessary. You are solely responsible for maintaining the security of your password.
            </p>
          </section>

          <section>
            <h2>4. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul>
              <li>4.1 Use the Service for any illegal or unauthorized purpose</li>
              <li>4.2 Interfere with or disrupt the Service or servers</li>
              <li>4.3 Attempt to gain unauthorized access to any portion of the Service</li>
              <li>4.4 Harass, threaten, or defame other users</li>
              <li>4.5 Upload or transmit viruses or malicious code</li>
            </ul>
          </section>

          <section>
            <h2>5. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by YourAppName and are protected by
              international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2>6. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice,
              for any reason, including breach of these Terms.
            </p>
          </section>

          <section>
            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall YourAppName, its directors, employees, or affiliates be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of or relating to your use of the Service.
            </p>
          </section>

          <section>
            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of changes by posting the new Terms
              on this page. Your continued use of the Service after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              <a href="mailto:support@oncue.com">support@oncue.com</a>
            </p>
          </section>

          <div className={terms.backButton}>
            <Link to="/profile">Got It</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;