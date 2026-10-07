import React from "react";

function FanCommunity() {
    const team = [
        { name: "@dr_sanjaykumar_mla", url: "https://www.instagram.com/dr_sanjaykumar_mla/", label: "Team · ~1.9K followers", icon: "◎" },
        { name: "@sanjay_brs", url: "https://www.instagram.com/sanjay_brs/", label: "Team", icon: "◎" },
        { name: "@brs_korutla", url: "https://www.instagram.com/brs_korutla/", label: "BRS Korutla unit · 434 followers", icon: "◎" },
        { name: "@brsparty_korutla", url: "https://www.instagram.com/brsparty_korutla/", label: "BRS social media · 94 followers", icon: "◎" },
    ];
    const fanPages = [
        { name: "@brs_of_ktl", url: "https://www.instagram.com/brs_of_ktl/", label: "BRS of Korutla · 15K followers", icon: "◎" },
        { name: "@sanjay_anna_thamudu__anilkumar", url: "https://www.instagram.com/sanjay_anna_thamudu__anilkumar/", label: "Fan · 379 followers", icon: "◎" },
        { name: "@sanjay_anna_yuva_sena", url: "https://www.instagram.com/sanjay_anna_yuva_sena/", label: "Yuva Sena fan page", icon: "◎" },
        { name: "@dr_sanjay_kalvakuntla_team", url: "https://www.instagram.com/dr_sanjay_kalvakuntla_team/", label: "Fan page", icon: "◎" },
    ];
    const fbPages = [
        { name: "BRS Party Korutla", url: "https://www.facebook.com/BRSPartyKorutla", label: "Party page · 11K followers", icon: "f" },
        { name: "Metpally and Korutla Constituency", url: "https://www.facebook.com/Korutlametpally", label: "Constituency page · 1.8K followers", icon: "f" },
        { name: "Koratla News Tak", url: "https://www.facebook.com/koratlatimes", label: "Local news · 4.2K followers", icon: "f" },
    ];
    const fbGroups = [
        { name: "Korutla Constituency", url: "https://www.facebook.com/groups/koratlaconstituency", label: "Public group · 1.5K members", icon: "👥" },
    ];

    const renderGroup = (title, items) => (
        <>
            <h3 className="gmk-fan-cat">{title}</h3>
            <div className="gmk-fan-btns">
                {items.map((a) => (
                    <a key={a.url} className="gmk-fan-btn" href={a.url} target="_blank" rel="noreferrer">{a.icon} {a.name} <span>{a.label}</span></a>
                ))}
            </div>
        </>
    );

    return (
        <section className="gmk-fan" id="fan-community">
            <div className="gmk-fan-inner">
                <h2 className="gmk-section-title"><span>—</span> Fan Community <span>—</span></h2>
                <p className="gmk-fan-sub">Team and supporter pages sharing Dr. Sanjay Kalvakuntla's work across Korutla. Official accounts are in Stay Connected above.</p>
                {renderGroup("Team", team)}
                {renderGroup("Fan Pages", fanPages)}
                {renderGroup("Facebook Pages", fbPages)}
                {renderGroup("Facebook Groups", fbGroups)}
            </div>
        </section>
    );
}

export default FanCommunity;
