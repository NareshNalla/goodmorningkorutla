import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ImageGallery from 'react-image-gallery';
import { Helmet } from 'react-helmet-async';
import './NewsItem.css';
import styles from './style.module.css';

function NewsDetailPage() {
    const { title: routeTitle, dateStr: routeDateStr } = useParams();
    const [newsItem, setNewsItem] = useState(null);

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

    const { title, description, urlToImage, source, dateStr, created } = newsItem;
    const tags = ["Metpally", "Korutla","Mallapur","Ibrahimpatnam"];
    const urlsList = urlToImage.map(image => ({
        original: image,
        thumbnail: image
    }));

    const galleryStyles = {
        maxWidth: "500px",
        maxHeight: "400px",
        marginBottom:'60px',
    };

    // Convert Firebase Timestamp to JavaScript Date object
    const createdDate = created.toDate();
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    };
    
    const formattedDate = createdDate.toLocaleString('en-IN', options);

    return (
        <div className="container-fluid p-0">
            {/* <Helmet>
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                { {urlToImage && urlToImage[0] && (
                    <meta property="og:image" content={urlsList[0].original} />
                )} 
            </Helmet> */}

        <Helmet bodyAttributes={{ }}>
                <html lang="en" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content="running" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Helmet>
                    
            <div className="row justify-content-center p-0">
                <div className="col-lg-10 col-md-11">
                    <h2 style={{ padding: "10px 0", color: "red" }}>{title}</h2>

                    <div>
                        <div style={{ fontSize: 'small', color: 'gray' }}>
                            <span>Published: {formattedDate}</span>
                        </div>
                    </div>

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
                            <h5>{dateStr} <span className="text-body-secondary mb-0 left"> - {source.name}</span></h5> 
                        </div>
                        <div>
                            <p>{description}</p>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="d-flex flex-wrap">
                      <span> Tags: </span> {tags.map(tag => (
                            <Link key={tag} to={`/${tag.toLowerCase()}`} className="btn btn-outline-secondary m-1">{tag}</Link>
                        ))}
                    </div>
                    
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                </div>
            </div>
        </div>
    );
}

export default NewsDetailPage;
