import React from 'react';
import SocialLinksFooter from './SocialLinksFooter';
function Footer() {
  return (
    <footer className="footer">
      <div className="container d-flex flex-column align-items-center">
      <SocialLinksFooter/>
        <p className="text-center">Copyright © 2024 <br/>
All Rights Reserved.</p>
      
      </div>
    </footer>
  );
}

export default Footer;