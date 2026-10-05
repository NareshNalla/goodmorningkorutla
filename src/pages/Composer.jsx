import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection, addDoc, doc, getDoc, updateDoc, serverTimestamp, Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { useAuth } from "../hooks/useAuth";

export default function Composer() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [slot, setSlot] = useState("morning");
  const [category, setCategory] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [existingImages, setExistingImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const snap = await getDoc(doc(db, "posts", id));
      if (snap.exists()) {
        const p = snap.data();
        setTitle(p.title || "");
        setBody(p.body || "");
        setSlot(p.slot || "morning");
        setCategory(p.category || "");
        setYoutubeUrl(p.youtubeUrl || "");
        setExistingImages(p.images || []);
        const d = p.publishedAt?.toDate ? p.publishedAt.toDate() : new Date();
        setDate(d.toISOString().slice(0, 10));
      }
    })();
  }, [id, isEdit]);

  const uploadImages = async () => {
    const urls = [];
    for (const f of files) {
      const name = `posts/${Date.now()}-${f.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      const snap = await uploadBytes(ref(storage, name), f);
      urls.push(await getDownloadURL(snap.ref));
    }
    return urls;
  };

  const save = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !body.trim()) {
      setError("Title and story text are required.");
      return;
    }
    setBusy(true);
    try {
      const uploaded = await uploadImages();
      const [y, m, d] = date.split("-").map(Number);
      // publish time: morning 7 AM, evening 7 PM IST
      const hour = slot === "morning" ? 7 : 19;
      const publishedAt = Timestamp.fromDate(new Date(y, m - 1, d, hour, 0, 0));
      const data = {
        title: title.trim(),
        body: body.trim(),
        slot,
        category: category.trim(),
        youtubeUrl: youtubeUrl.trim(),
        images: [...existingImages, ...uploaded],
        publishedAt,
        status: "published",
        createdBy: user.email,
        updatedAt: serverTimestamp(),
      };
      if (isEdit) {
        await updateDoc(doc(db, "posts", id), data);
      } else {
        data.createdAt = serverTimestamp();
        await addDoc(collection(db, "posts"), data);
      }
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Could not save. Check your connection and try again.");
    }
    setBusy(false);
  };

  return (
    <div className="wrap">
      <div className="admin-box" style={{ maxWidth: 780 }}>
        <h1>{isEdit ? "Edit post" : "New daily post"}</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={save}>
          <div className="field">
            <label>Edition</label>
            <select value={slot} onChange={(e) => setSlot(e.target.value)}>
              <option value="morning">☀️ Morning edition</option>
              <option value="evening">🌙 Evening edition</option>
            </select>
          </div>
          <div className="field">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="field">
            <label>Headline</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ఉదయం కార్యక్రమం — Morning program…"
            />
          </div>
          <div className="field">
            <label>Story (Telugu / English)</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write the update…"
            />
          </div>
          <div className="field">
            <label>Category (optional)</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Visit, Meeting, Announcement…"
            />
          </div>
          <div className="field">
            <label>YouTube link (optional)</label>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=…"
            />
          </div>
          <div className="field">
            <label>Photos</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles([...e.target.files])}
            />
            {existingImages.length > 0 && (
              <div className="thumbs">
                {existingImages.map((src, i) => (
                  <img key={i} src={src} alt="" />
                ))}
              </div>
            )}
          </div>
          <div className="row-between">
            <button className="btn" disabled={busy}>
              {busy ? "Publishing…" : isEdit ? "Save changes" : "Publish now"}
            </button>
            <button type="button" className="btn ghost" onClick={() => navigate("/admin/dashboard")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
