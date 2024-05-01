import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ImageGallery from 'react-image-gallery';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import './NewsItem.css';

function NewsDetailPage() {
    const { title: routeTitle, dateStr: routeDateStr } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    function truncateDescription(description) {
        // Split the description into words
        const words = description.split(' ');
        
        // If the description is already less than or equal to 100 words, return it as is
        if (words.length <= 20) {
          return description;
        }
      
        // Otherwise, truncate the description to 100 words and join them back together
        return words.slice(0, 100).join(' ');
      }
    useEffect(() => {
        const fetchNewsItem = async () => {
            try {
                const q = query(collection(db, "articles"),
                    where("title", "==", routeTitle),
                    where("dateStr", "==", routeDateStr));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setNewsItem(querySnapshot.docs[0].data());
                } else {
                    console.log("No articles found with the specified title and date.");
                }
            } catch (error) {
                console.error("Error fetching articles: ", error);
            }
        };

        fetchNewsItem();
    }, [routeTitle, routeDateStr]);

    if (!newsItem) {
        return <div>Loading...</div>;
    }

    const { title, description, urlToImage, source, dateStr } = newsItem;

    const urlsList = urlToImage.map(image => ({
        original: image,
        thumbnail: image
    }));

    const galleryStyles = {
        maxWidth: "500px",
        maxHeight: "400px",
        marginBottom:'60px',
    };

    return (
        <div className="container-fluid p-0">

            <div className="row justify-content-center p-0">
                <div className="col-lg-10 col-md-11">
                    <h5 style={{ padding: "10px 0" }}>{title}</h5>
                    <div style={galleryStyles}>
                        <ImageGallery
                            items={urlsList}
                            showPlayButton={false}
                            showFullscreenButton={urlsList.length === 1 ? false : true}
                            slideInterval={1000}
                            slideOnThumbnailOver={false}
                            showIndex={false}
                            showThumbnails={urlsList.length === 1 ? false : true}
                            showNav={false}
                        />
                    </div>
                    <div className="d-flex flex-column align-items-start" style={{ padding: "20px 0" }}>
                        <div className="mb-3">
                            <h5>{dateStr}</h5>
                            <p className="text-body-secondary mb-0">- {source.name}</p>
                        </div>
                        <div>
                            <p>{description}</p>
                        </div>
                    </div>
                 
    {/* Add Open Graph meta tags */}
       <Helmet>
    {urlToImage && urlToImage[0] && (
        <meta property="og:image" content={urlsList[0].original} />
    )
    }
  
{ /* Standard metadata tags */ }
<meta property="og:title" content={title} />
<meta property="og:description" content={truncateDescription(description)} />
</Helmet>
                   <br/><br/><br/><br/><br/><br/><br/><br/>
                </div>
            </div>
        </div>
    );
}

export default NewsDetailPage;
