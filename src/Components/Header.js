import React from "react";

function Header() {
    return (
        <header className="gmk-header">
            <div className="gmk-header-inner">
                <a href="/" className="gmk-logo">
                    <span className="gmk-logo-mark">G</span>
                    <span className="gmk-logo-text">Good Morning <strong>Korutla</strong></span>
                </a>
                <nav className="gmk-nav">
                    <a href="#home">Home</a>
                    <a href="#events">Events</a>
                    <a href="#updates">Updates</a>
                    <a href="#constituency">Constituency</a>
                    <a href="#about">About</a>
                </nav>
                <div className="gmk-social">
                    <a href="https://x.com/drsanjayBRS" target="_blank" rel="noreferrer" aria-label="X (Twitter)">𝕏</a>
                    <a href="https://www.facebook.com/people/Dr-Sanjay-Korutla/100092349500146/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
                    <a href="https://www.instagram.com/drsanjaykalvakuntla_brs/" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
                    <a href="https://www.youtube.com/@vikasreddyvicky01" target="_blank" rel="noreferrer" aria-label="YouTube">▶</a>
                </div>
                <a href="#updates" className="gmk-cta">Join BRS</a>
            </div>
        </header>
    );
}

export default Header;
