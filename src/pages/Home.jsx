import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import PostCard from "../components/PostCard";

const FILTERS = [
  { key: "all", label: "All updates" },
  { key: "morning", label: "☀️ Morning" },
  { key: "evening", label: "🌙 Evening" },
];

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const cons = [
          where("status", "==", "published"),
          orderBy("publishedAt", "desc"),
          limit(40),
        ];
        if (filter !== "all") cons.splice(1, 0, where("slot", "==", filter));
        const snap = await getDocs(query(collection(db, "posts"), ...cons));
        setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })();
  }, [filter]);

  return (
    <div className="wrap">
      <section className="hero">
        <div className="sun">🌅</div>
        <div>
          <h1>Good Morning Korutla</h1>
          <p>
            Daily morning &amp; evening updates from Korutla constituency —
            programs, visits and news, in Telugu and English.
          </p>
        </div>
      </section>

      <div className="slots">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`slot-btn ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading updates…</div>
      ) : posts.length === 0 ? (
        <div className="empty">
          No updates yet — check back in the morning or evening. 🌅
        </div>
      ) : (
        <div className="feed">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
