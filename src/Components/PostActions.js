import { React, useState } from "react";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

// Per-post actions: Like (saved in Firestore), Share (WhatsApp/X/Facebook/Web Share), Follow (MLA's X profile).
function PostActions({ docId, title, likes = 0 }) {
    const key = "gmk-liked-" + (docId || title);
    const [liked, setLiked] = useState(() => {
        try { return localStorage.getItem(key) === "1"; } catch (e) { return false; }
    });
    const [count, setCount] = useState(likes || 0);
    const [shared, setShared] = useState(false);

    const like = async () => {
        if (liked) return;
        setLiked(true);
        setCount((c) => c + 1);
        try { localStorage.setItem(key, "1"); } catch (e) {}
        if (docId) {
            try { await updateDoc(doc(db, "articles", docId), { likes: increment(1) }); } catch (e) {}
        }
    };

    const share = async () => {
        const text = (title || "Good Morning Korutla") + " — via Good Morning Korutla";
        const url = "https://goodmorningkorutla.in/";
        if (navigator.share) {
            try { await navigator.share({ title: "Good Morning Korutla", text, url }); } catch (e) {}
        } else {
            const wa = "https://wa.me/?text=" + encodeURIComponent(text + " " + url);
            window.open(wa, "_blank", "noreferrer");
        }
        setShared(true);
        setTimeout(() => setShared(false), 2000);
    };

    return (
        <div className="gmk-actions">
            <button type="button" className={"gmk-act-btn" + (liked ? " gmk-liked" : "")} onClick={like} aria-label="Like this post">
                {liked ? "❤️" : "🤍"} {count > 0 ? count : ""} Like
            </button>
            <button type="button" className="gmk-act-btn" onClick={share} aria-label="Share this post">
                ↗ {shared ? "Shared!" : "Share"}
            </button>
            <a className="gmk-act-btn gmk-act-follow" href="https://x.com/drsanjayBRS" target="_blank" rel="noreferrer">
                𝕏 Follow
            </a>
        </div>
    );
}

export default PostActions;
