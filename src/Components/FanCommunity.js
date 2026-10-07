import React from "react";

function FanCommunity() {
    const team = [
        { handle: "@dr_sanjaykumar_mla", url: "https://www.instagram.com/dr_sanjaykumar_mla/", label: "Team · ~1.9K followers" },
        { handle: "@sanjay_brs", url: "https://www.instagram.com/sanjay_brs/", label: "Team" },
    ];
    const fan = [
        { handle: "@dr_sanjay_kalvakuntla_team", url: "https://www.instagram.com/dr_sanjay_kalvakuntla_team/", label: "Fan page" },
    ];
    return (
        <section className="gmk-fan" id="fan-community">
            <div className="gmk-fan-inner">
                <h2 className="gmk-section-title"><span>—</span> Fan Community <span>—</span></h2>
                <p className="gmk-fan-sub">Team and supporter pages sharing Dr. Sanjay Kalvakuntla's work across Korutla. Official accounts are in Stay Connected above.</p>
                <h3 className="gmk-fan-cat">Team</h3>
                <div className="gmk-fan-btns">
                    {team.map((a) => (
                        <a key={a.handle} className="gmk-fan-btn" href={a.url} target="_blank" rel="noreferrer">◎ {a.handle} <span>{a.label}</span></a>
                    ))}
                </div>
                <h3 className="gmk-fan-cat">Fan Pages</h3>
                <div className="gmk-fan-btns">
                    {fan.map((a) => (
                        <a key={a.handle} className="gmk-fan-btn" href={a.url} target="_blank" rel="noreferrer">◎ {a.handle} <span>{a.label}</span></a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FanCommunity;
