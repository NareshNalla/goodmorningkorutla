
import React from "react";
import { imageDb } from "../firebase";
import ImageGallery from 'react-image-gallery';
import { NavLink } from 'react-router-dom';
 
const renderItem = item => (
    <div >
       <NavLink end to="/AddArticle">Link</NavLink>
    </div>
);

function NewsItem(props) {
    
    let urlsList = [];
    let {
        desc, title, imageURL,
        newsUrl, sourceName ,dateString
    } = props;

    imageURL.map((element) => {
        const image = {
                  original: element,
                  thumbnail: element
        }
        urlsList.push(image);
    });
        

    return (
        <div>
            <div className="card my-3">
            <div className="card-body">
                    <h5 className="card-title">{dateString}</h5>
                </div>
          
                <div className="rbb-ImageGallery">
                        <ImageGallery items={urlsList} 
                        showPlayButton={false}
                        showFullscreenButton={false}
                        slideInterval={1000}
                        slideOnThumbnailOver={false}
                        showIndex={false}
                        showNav={false}
                        />
                </div>

            {/* <div className="rbb-ImageGallery">
                        <ImageGallery items={urlsList} 
                        showThumbnails={false}
                        slideInterval={1000}
                        showNav={true}
                        showBullets={urlsList.length > 1}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        slideOnThumbnailHover={false}
                        />
                </div>  */}
    
                    
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="w-100 fs-6 
                        text-body-secondary 
                        text-end">
                        - {sourceName}
                    </p>
                    <p className="card-text">{desc}</p>
                    <a href={newsUrl}
                        target="_blank"
                        className="btn btn-primary btn-sm">
                        Read More...
                    </a>
                </div>
            </div>
        </div>
    );
}
 
export default NewsItem;