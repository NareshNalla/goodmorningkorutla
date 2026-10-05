import { Link } from "react-router-dom";

export function youtubeEmbed(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

export function formatDate(ts) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export default function PostCard({ post }) {
  const embed = youtubeEmbed(post.youtubeUrl);
  const images = post.images || [];
  return (
    <article className="post-card">
      <div className="post-body">
        <div className="post-meta">
          <span>{formatDate(post.publishedAt)}</span>
          {post.category && <span>· {post.category}</span>}
        </div>
        <h2>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h2>
        <p className="post-text">{post.body}</p>
        {images.length > 0 && (
          <div className={`post-media ${images.length > 1 ? "two" : ""}`}>
            {images.slice(0, 4).map((src, i) => (
              <img key={i} src={src} alt="" loading="lazy" />
            ))}
          </div>
        )}
        {embed && (
          <div className="video-wrap">
            <iframe src={embed} title="video" allowFullScreen loading="lazy" />
          </div>
        )}
      </div>
    </article>
  );
}
