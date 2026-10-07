import { React, useState } from "react";
import { firstImageSrc } from "../utils/imageUrl";
import PostActions from "./PostActions";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function badgeParts(dateStr) {
    const m = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec((dateStr || "").trim());
    if (!m) return { mon: "", day: "" };
    const mon = MONTHS[parseInt(m[1], 10) - 1] || "";
    return { mon, day: m[2] };
}

function NewsCard(props) {
    const { title, desc, imageURL, dateString } = props;
    const { mon, day } = badgeParts(dateString);
    const [imgOk, setImgOk] = useState(true);
    const img = firstImageSrc(imageURL);
    const excerpt = (desc || "").length > 140 ? (desc || "").slice(0, 140) + "…" : (desc || "");

    return (
        <article className="gmk-card">
            <div className="gmk-card-img">
                {img && imgOk ? (
                    <img src={img} alt={title} loading="lazy" onError={() => setImgOk(false)} />
                ) : (
                    <div className="gmk-card-img-fallback">GMK</div>
                )}
                {(mon || day) && (
                    <div className="gmk-date-badge">
                        <span className="gmk-date-mon">{mon}</span>
                        <span className="gmk-date-day">{day}</span>
                    </div>
                )}
            </div>
            <div className="gmk-card-body">
                <h3 className="gmk-card-title">{title}</h3>
                {excerpt && <p className="gmk-card-desc">{excerpt}</p>}
                <p className="gmk-card-date">{dateString}</p>
                <PostActions docId={props.docId} title={title} likes={props.likes} />
            </div>
        </article>
    );
}

export default NewsCard;
