import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
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
        // Single-field query (no composite index needed); filter in code.
        const snap = await getDocs(
          query(collection(db, "posts"), orderBy("publishedAt", "desc"), limit(60))
        );
        let list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        list = list.filter((p) => p.status === "published");
        if (filter !== "all") list = list.filter((p) => (p.slot || "morning") === filter);
        setPosts(list);
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
