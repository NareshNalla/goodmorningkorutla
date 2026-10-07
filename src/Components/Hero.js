import React from "react";

const HERO_PHOTO = process.env.PUBLIC_URL + "/mla.jpg";

function Hero() {
    return (
        <section className="gmk-hero" id="home">
            <div className="gmk-hero-inner">
                <div className="gmk-hero-photo">
                    <img src={HERO_PHOTO} alt="Dr. Sanjay Kalvakuntla" />
                </div>
                <div className="gmk-hero-text">
                    <h1>SANJAY<br />KALVAKUNTLA</h1>
                    <p className="gmk-hero-title">Member of Legislative Assembly (MLA)</p>
                    <p className="gmk-hero-const">📍 Constituency: Korutla, Jagtial District</p>
                    <p className="gmk-hero-quote">
                        <span className="gmk-quote-mark">“</span>
                        Every morning with the people, every step for Korutla's development.
                    </p>
                    <div className="gmk-hero-social">
                        <span>Follow Us:</span>
                        <a href="https://x.com/drsanjayBRS" target="_blank" rel="noreferrer" aria-label="X (Twitter)">𝕏</a>
                        <a href="https://www.facebook.com/people/Dr-Sanjay-Korutla/100092349500146/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
                        <a href="https://www.instagram.com/drsanjaykalvakuntla_brs/" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
                        <a href="https://www.youtube.com/@vikasreddyvicky01" target="_blank" rel="noreferrer" aria-label="YouTube">▶</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
