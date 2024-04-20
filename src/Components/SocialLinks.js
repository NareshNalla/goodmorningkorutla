import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

function SocialLinks() {
  return (
    <div className="social-links">
      <a href="https://twitter.com/drsanjayBRS" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faXTwitter} size="2x" />
      </a> &nbsp; &nbsp;
      <a href="https://www.facebook.com/sanjay.kalvakuntla.brs/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a> &nbsp; &nbsp;
      <a href="https://www.instagram.com/drsanjaykalvakuntla_brs/?hl=en" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </div>
  );
}

export default SocialLinks;
