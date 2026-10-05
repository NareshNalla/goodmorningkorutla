import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection, query, orderBy, limit, getDocs, deleteDoc, doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../components/PostCard";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(
        query(collection(db, "posts"), orderBy("publishedAt", "desc"), limit(60))
      );
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    await deleteDoc(doc(db, "posts", id));
    load();
  };

  return (
    <div className="wrap">
      <div className="row-between" style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Publishing dashboard</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={() => navigate("/admin/new")}>
            + New post
          </button>
          <button className="btn ghost small" onClick={() => signOut(auth)}>
            Sign out ({user?.email})
          </button>
        </div>
      </div>

      <div className="page-card">
        <h2 style={{ marginTop: 0 }}>Daily rhythm</h2>
        <p>
          ☀️ Publish the <strong>morning edition</strong> with today's program,
          and the 🌙 <strong>evening edition</strong> with the day's round-up.
          Use the Morning / Evening tag on each post — the home page lets
          readers filter by edition.
        </p>
      </div>

      {loading ? (
        <div className="loading">Loading posts…</div>
      ) : posts.length === 0 ? (
        <div className="empty">No posts yet. Create the first morning update! 🌅</div>
      ) : (
        <div className="admin-list">
          {posts.map((p) => (
            <div key={p.id} className="admin-item">
              <div>
                <div className="t">{p.title}</div>
                <div className="m">
                  {p.slot === "evening" ? "🌙 Evening" : "☀️ Morning"} ·{" "}
                  {formatDate(p.publishedAt)} · {p.status}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn ghost small" onClick={() => navigate(`/admin/edit/${p.id}`)}>
                  Edit
                </button>
                <button className="btn ghost small" onClick={() => remove(p.id, p.title)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
