import React from "react";

function Stats() {
    return (
        <section className="gmk-stats">
            <div className="gmk-stats-inner">
                <div className="gmk-stat">
                    <p className="gmk-stat-num">72,115</p>
                    <p className="gmk-stat-label">Votes in 2023 Election</p>
                </div>
                <div className="gmk-stat">
                    <p className="gmk-stat-num">10,305</p>
                    <p className="gmk-stat-label">Winning Margin</p>
                </div>
                <div className="gmk-stat">
                    <p className="gmk-stat-num">2023</p>
                    <p className="gmk-stat-label">Elected as MLA, Korutla</p>
                </div>
                <div className="gmk-stat">
                    <p className="gmk-stat-num">Daily</p>
                    <p className="gmk-stat-label">Good Morning Korutla Outreach</p>
                </div>
            </div>
        </section>
    );
}

export default Stats;
