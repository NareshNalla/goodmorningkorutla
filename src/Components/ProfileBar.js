import React from "react";

// Slim profile strip (feed-style, not a portfolio hero).
function ProfileBar() {
    return (
        <section className="gmk-profilebar">
            <img className="gmk-profilebar-avatar" src="/mla.jpg" alt="Dr. Sanjay Kalvakuntla" />
            <div className="gmk-profilebar-info">
                <h1 className="gmk-profilebar-name">Good Morning Korutla</h1>
                <p className="gmk-profilebar-role">Dr. Sanjay Kalvakuntla · MLA, Korutla (BRS)</p>
                <p className="gmk-profilebar-stats">72,115 votes · Won by 10,305 · Elected 2023</p>
            </div>
            <div className="gmk-profilebar-actions">
                <a className="gmk-pb-btn gmk-pb-x" href="https://x.com/drsanjayBRS" target="_blank" rel="noreferrer">𝕏 Follow</a>
                <a className="gmk-pb-btn" href="https://www.facebook.com/people/Dr-Sanjay-Korutla/100092349500146/" target="_blank" rel="noreferrer">f Follow</a>
                <a className="gmk-pb-btn" href="https://www.instagram.com/drsanjaykalvakuntla_brs/" target="_blank" rel="noreferrer">◎ Follow</a>
            </div>
        </section>
    );
}

export default ProfileBar;
