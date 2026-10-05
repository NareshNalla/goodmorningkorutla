import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // Single-field query (no composite index needed); filter in code.
        const snap = await getDocs(
          query(collection(db, "posts"), orderBy("publishedAt", "desc"), limit(60))
        );
        const list = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((p) => p.status === "published");
        setPosts(list);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="wrap">
      <section className="hero">
        <div className="sun">🌅</div>
        <div>
          <h1>Good Morning Korutla</h1>
          <p>
            Daily updates from Korutla constituency — programs, visits and
            news, in Telugu and English. Fresh posts appear here the moment
            they are published.
          </p>
        </div>
      </section>

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
