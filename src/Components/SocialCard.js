import { React, useState } from "react";
import { firstImageSrc } from "../utils/imageUrl";

function SocialCard(props) {
    const { title, desc, imageURL, dateString, sourceName } = props;
    const [imgOk, setImgOk] = useState(true);
    const img = firstImageSrc(imageURL);
    return (
        <article className="gmk-social-card">
            <div className="gmk-social-head">
                <div className="gmk-social-avatar">SK</div>
                <div>
                    <p className="gmk-social-name">Dr. Sanjay Kalvakuntla</p>
                    <p className="gmk-social-handle">@GoodMorningKorutla · {dateString}</p>
                </div>
            </div>
            <p className="gmk-social-text"><strong>{title}</strong></p>
            {desc && <p className="gmk-social-text">{desc.length > 220 ? desc.slice(0, 220) + "…" : desc}</p>}
            {img && imgOk && <img className="gmk-social-img" src={img} alt={title} loading="lazy" onError={() => setImgOk(false)} />}
            <div className="gmk-social-actions">
                <span>💬 Reply</span><span>🔁 Repost</span><span>❤️ Like</span>
            </div>
            <p className="gmk-social-source">{sourceName}</p>
        </article>
    );
}

export default SocialCard;
