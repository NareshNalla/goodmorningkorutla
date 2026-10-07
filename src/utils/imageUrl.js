// Normalize a Firestore `urlToImage` value into a renderable <img> src.
// The admin form stores uploaded-image URLs in this field and, when a video
// is attached, also pushes the YouTube embed URL into the same array — an
// embed URL cannot render as an <img>, so convert it to the video thumbnail.
// Older posts may store a plain string instead of an array.
export function firstImageSrc(urlToImage) {
    let raw = null;
    if (Array.isArray(urlToImage)) {
        raw = urlToImage.find((u) => typeof u === "string" && u.trim().length > 0) || null;
    } else if (typeof urlToImage === "string" && urlToImage.trim().length > 0) {
        raw = urlToImage;
    }
    if (!raw) return null;
    const url = raw.trim();
    const yt = /(?:youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([\w-]{6,})/.exec(url);
    if (yt) return `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`;
    if (/^https?:\/\//i.test(url) || url.startsWith("/")) return url;
    return null;
}
