import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { youtubeEmbed, formatDate } from "../components/PostCard";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, "posts", id));
        if (snap.exists()) setPost({ id: snap.id, ...snap.data() });
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div className="wrap"><div className="loading">Loading…</div></div>;
  if (!post)
    return (
      <div className="wrap">
        <div className="empty">Post not found. <Link to="/">Back home</Link></div>
      </div>
    );

  const embed = youtubeEmbed(post.youtubeUrl);
  return (
    <div className="wrap">
      <article className="post-detail">
        <div className="post-meta">
          <span>{formatDate(post.publishedAt)}</span>
          {post.category && <span>· {post.category}</span>}
        </div>
        <h1>{post.title}</h1>
        <p className="post-text">{post.body}</p>
        {(post.images || []).length > 0 && (
          <div className="post-media">
            {post.images.map((src, i) => (
              <img key={i} src={src} alt="" loading="lazy" />
            ))}
          </div>
        )}
        {embed && (
          <div className="video-wrap">
            <iframe src={embed} title="video" allowFullScreen />
          </div>
        )}
        <p style={{ marginTop: 20 }}>
          <Link to="/">← Back to all updates</Link>
        </p>
      </article>
    </div>
  );
}
