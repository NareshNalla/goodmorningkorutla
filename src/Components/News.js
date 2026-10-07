import { React, useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import SocialCard from "./SocialCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

function News() {
    let [articles, setArticles] = useState([]);

    // parse "M-D-YYYY" date strings for newest-first ordering
    const parsePostDate = (s) => {
        const m = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec((s || "").trim());
        if (!m) return 0;
        const d = new Date(+m[3], +m[1] - 1, +m[2]);
        if (isNaN(d.getTime()) || d.getFullYear() > new Date().getFullYear()) return 0;
        return d.getTime();
    };

    let resultNews = async () => {
        await getDocs(collection(db, "articles"))
            .then((querySnapshot) => {
                const all = [];
                querySnapshot.forEach(element => {
                    all.push(element.data());
                });
                // newest first, like a feed
                all.sort((a, b) => parsePostDate(b.dateStr) - parsePostDate(a.dateStr));
                setArticles(all);
            });
    };

    useEffect(() => {
        resultNews();
    }, []);

    // An "Event" = a post where the MLA attends an event / meeting / visit.
    // Everything else is a general update.
    const EVENT_WORDS = [
        "పర్యట", "హాజర", "సమావేశ", "కార్యక్రమ", "ప్రారంభ", "పాల్గొన",
        "సందర్శ", "భేటీ", "చేరారు", "సభ", "వేడుక", "ఉత్సవ",
        "meeting", "attend", "inaugurat", "visit", "event", "program", "joined", "tour",
    ];
    const isEvent = (a) => {
        const text = ((a.title || "") + " " + (a.description || "")).toLowerCase();
        return EVENT_WORDS.some((w) => text.includes(w));
    };

    const events = articles.filter(isEvent);
    const latest = articles.slice(0, 6);

    return (
        <>
            {/* Events — only posts where the MLA attends an event/meeting/visit */}
            <section className="gmk-news" id="events">
                <h2 className="gmk-section-title"><span>—</span> Events <span>—</span></h2>
                <div className="gmk-grid">
                    {events.map((element) => (
                        <NewsCard
                            key={"ev-" + element.title + element.dateStr}
                            title={element.title}
                            desc={element.description}
                            imageURL={element.urlToImage}
                            dateString={element.dateStr}
                        />
                    ))}
                </div>
                {events.length === 0 && (
                    <p className="text-center">No event visits yet. See All Updates below.</p>
                )}
            </section>

            {/* Latest on Twitter (social updates) */}
            <section className="gmk-social-feed" id="social">
                <h2 className="gmk-section-title"><span>—</span> Latest on Twitter <span>—</span></h2>
                <div className="gmk-social-grid">
                    {latest.map((element) => (
                        <SocialCard
                            key={"soc-" + element.title + element.dateStr}
                            title={element.title}
                            desc={element.description}
                            imageURL={element.urlToImage}
                            dateString={element.dateStr}
                            sourceName={element.source ? element.source.name : "Good Morning Korutla"}
                        />
                    ))}
                </div>
                {articles.length === 0 && (
                    <p className="text-center">No social updates yet.</p>
                )}
            </section>

            {/* All Updates */}
            <section className="gmk-updates" id="updates">
                <h2 className="gmk-section-title"><span>—</span> All Updates <span>—</span></h2>
                <div className="gmk-timeline">
                    {articles.map((element) => (
                        <div className="gmk-timeline-item" key={"tl-" + element.title + element.dateStr}>
                            <div className="gmk-timeline-dot"></div>
                            <div className="gmk-timeline-content">
                                <p className="gmk-timeline-date">{element.dateStr}</p>
                                <h4>{element.title}</h4>
                                <p>{element.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {articles.length === 0 && (
                    <p className="text-center">No updates yet.</p>
                )}
            </section>
        </>
    );
}

export default News;
