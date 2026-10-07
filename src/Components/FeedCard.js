import { React, useState, useEffect } from "react";
import { firstImageSrc } from "../utils/imageUrl";
import PostActions from "./PostActions";

// Official X embed (platform.x.com/widgets.js) for a post link.
function TweetEmbed({ url }) {
    useEffect(() => {
        const load = () => {
            if (window.twttr && window.twttr.widgets) window.twttr.widgets.load();
        };
        if (!document.querySelector('script[src="https://platform.x.com/widgets.js"]')) {
            const s = document.createElement("script");
            s.src = "https://platform.x.com/widgets.js";
            s.async = true;
            s.charset = "utf-8";
            s.onload = load;
            document.body.appendChild(s);
        } else {
            load();
        }
    }, [url]);
    return (
        <blockquote className="twitter-tweet gmk-tweet">
            <a href={url}>View post on X</a>
        </blockquote>
    );
}

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
            {props.tweetUrl && <TweetEmbed url={props.tweetUrl} />}
            <PostActions docId={props.docId} title={title} likes={props.likes} />
            {sourceName && <p className="gmk-feed-source">{sourceName}</p>}
        </article>
    );
}

export default FeedCard;
