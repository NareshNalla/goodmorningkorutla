import { React, useState, useEffect } from "react";
import FeedCard from "./FeedCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

function News() {
    let [articles, setArticles] = useState([]);
    let [tab, setTab] = useState("all");
    let [loading, setLoading] = useState(true);
    let [loadError, setLoadError] = useState(false);

    // parse "M-D-YYYY" date strings for newest-first ordering
    const parsePostDate = (s) => {
        const m = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec((s || "").trim());
        if (!m) return 0;
        const d = new Date(+m[3], +m[1] - 1, +m[2]);
        if (isNaN(d.getTime()) || d.getFullYear() > new Date().getFullYear()) return 0;
        return d.getTime();
    };

    let resultNews = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "articles"));
            const all = [];
            querySnapshot.forEach(element => {
                all.push({ id: element.id, ...element.data() });
            });
            // newest first, like a feed
            all.sort((a, b) => parsePostDate(b.dateStr) - parsePostDate(a.dateStr));
            setArticles(all);
        } catch (e) {
            setLoadError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        resultNews();
    }, []);

    // Header/footer deep links: #events opens the Events tab, #updates opens All Updates
    useEffect(() => {
        const onHash = () => {
            if (window.location.hash === "#events") setTab("events");
            else if (window.location.hash === "#official") setTab("official");
            else if (window.location.hash === "#updates") setTab("all");
        };
        onHash();
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);

    // An "Event" = a post where the MLA attends an event / meeting / visit.
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
    // "Official" = posts published from the MLA's official accounts (X embeds etc.)
    const official = articles.filter((a) => a.tweetUrl);
    const shown = tab === "events" ? events : tab === "official" ? official : articles;

    return (
        <section className="gmk-feed" id="updates">
            <div className="gmk-feed-tabs" id="events" role="tablist">
                <button type="button" role="tab" aria-selected={tab === "all"} className={"gmk-tab" + (tab === "all" ? " active" : "")} onClick={() => setTab("all")}>
                    📰 All Updates
                </button>
                <button type="button" role="tab" aria-selected={tab === "events"} className={"gmk-tab" + (tab === "events" ? " active" : "")} onClick={() => setTab("events")}>
                    📍 Events
                </button>
                <button type="button" role="tab" aria-selected={tab === "official"} className={"gmk-tab" + (tab === "official" ? " active" : "")} onClick={() => setTab("official")}>
                    𝕏 Official Posts
                </button>
            </div>
            <div className="gmk-feed-list">
                {shown.map((element) => (
                    <FeedCard
                        key={"feed-" + element.id}
                        title={element.title}
                        desc={element.description}
                        imageURL={element.urlToImage}
                        dateString={element.dateStr}
                        docId={element.id}
                        likes={element.likes || 0}
                        tweetUrl={element.tweetUrl || ""}
                        sourceName={element.source ? element.source.name : ""}
                    />
                ))}
                {loading && (
                    <p className="text-center">Loading posts…</p>
                )}
                {!loading && loadError && (
                    <p className="text-center">Could not load posts. Please refresh.</p>
                )}
                {!loading && !loadError && shown.length === 0 && (
                    <p className="text-center">No posts yet.</p>
                )}
            </div>
        </section>
    );
}

export default News;
