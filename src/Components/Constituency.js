import React from "react";

const MANDALS = ["Korutla", "Metpalli", "Ibrahimpatnam", "Mallapur", "Kathlapur", "Medipalli"];

function Constituency() {
    return (
        <section className="gmk-constituency" id="constituency">
            <div className="gmk-constituency-inner">
                <h2 className="gmk-section-title"><span>—</span> Korutla Constituency <span>—</span></h2>
                <img className="gmk-const-img" src={process.env.PUBLIC_URL + "/mla-wide.jpg"} alt="Dr. Sanjay Kalvakuntla with people" loading="lazy" />
                <p className="gmk-const-lead">
                    Korutla is an Assembly constituency in Jagtial district, Telangana.
                    Through the <strong>Good Morning Korutla</strong> program, our MLA meets
                    people every morning across towns and villages, listens to their issues
                    and works to resolve them on the spot.
                </p>
                <div className="gmk-chips">
                    {MANDALS.map((m) => (
                        <span className="gmk-chip" key={m}>{m}</span>
                    ))}
                </div>
                <div className="gmk-const-grid">
                    <div className="gmk-const-card">
                        <p className="gmk-const-num">Korutla</p>
                        <p className="gmk-const-label">Constituency Town</p>
                    </div>
                    <div className="gmk-const-card">
                        <p className="gmk-const-num">Jagtial</p>
                        <p className="gmk-const-label">District</p>
                    </div>
                    <div className="gmk-const-card">
                        <p className="gmk-const-num">Daily</p>
                        <p className="gmk-const-label">Good Morning Korutla Program</p>
                    </div>
                    <div className="gmk-const-card">
                        <p className="gmk-const-num">2023</p>
                        <p className="gmk-const-label">Elected to Assembly</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Constituency;
