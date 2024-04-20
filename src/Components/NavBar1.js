import React from "react";
import SocialLinks from "./SocialLinks";

 
function NavBar1() {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand " href="/">
                        Good Morning Korutla
                    </a>
                    <SocialLinks />
                </div>
              
            </nav>
        </div>
    );
}
 
export default NavBar1;