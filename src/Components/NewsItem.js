
import React from "react";
import { imageDb } from "../firebase";
import ImageGallery from 'react-image-gallery';
import { NavLink } from 'react-router-dom';
import './NewsItem.css'
 
const _renderVideo = (item) => {
    return (
      <div className="video-wrapper">
        <iframe
          width="100%"
          height="480px"
          src={item.embedUrl}
          frameBorder="0"
          allowFullScreen
          title="ex"
        />
      </div>
    );
};
function NewsItem(props) {
    
    let urlsList = [];
    let {
        desc, title, imageURL,
        newsUrl, sourceName ,dateString, embedUrl
    } = props;

    imageURL.map((element) => {
      //console.log( "ele "+element)
        if(element.toLowerCase().includes('youtube')){
      const   image = {
                  original: element,
                  thumbnail: element,
                  embedUrl: embedUrl,
                  renderItem: _renderVideo.bind(this)      
        }
        urlsList.push(image);
    }else{
        const  image = {
                  original: element,
                  thumbnail: element,          
        }
        urlsList.push(image);
        }
       
    });
        

    return (
   

    <div className="container-fluid p-0">
    <div className="row justify-content-center p-0">
      <div className="col-lg-10 col-md-11">
        <div className="card my-3 p-0">
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
        <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
        <h5 className="card-title" style={{ display: 'inline' }}>{dateString}</h5>
        <p className="w-auto fs-6 text-body-secondary" style={{ whiteSpace: 'nowrap' }}>- {sourceName}</p>
        </div>
         
            <div className="card-text">
              {desc.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
        
            <a 
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm me-2 mb-2">
            <small>Read More...</small>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
}
 
export default NewsItem;