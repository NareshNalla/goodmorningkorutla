import { React, useState } from "react";
import { firstImageSrc } from "../utils/imageUrl";
import PostActions from "./PostActions";

// X / Instagram-style post card for the news feed.
function FeedCard(props) {
    const { title, desc, imageURL, dateString, sourceName } = props;
    const [imgOk, setImgOk] = useState(true);
    const img = firstImageSrc(imageURL);
    return (
        <article className="gmk-feed-card">
            <div className="gmk-feed-head">
                <img className="gmk-feed-avatar" src="/mla.jpg" alt="Dr. Sanjay Kalvakuntla" />
                <div>
                    <p className="gmk-feed-name">Dr. Sanjay Kalvakuntla <span className="gmk-verified">✔</span></p>
                    <p className="gmk-feed-handle">MLA Korutla · {dateString}</p>
                </div>
            </div>
            <h3 className="gmk-feed-title">{title}</h3>
            {desc && <p className="gmk-feed-text">{desc}</p>}
            {img && imgOk && <img className="gmk-feed-img" src={img} alt={title} loading="lazy" onError={() => setImgOk(false)} />}
            <PostActions docId={props.docId} title={title} likes={props.likes} />
            {sourceName && <p className="gmk-feed-source">{sourceName}</p>}
        </article>
    );
}

export default FeedCard;
