
import React from "react";
import { imageDb } from "../firebase";
import ImageGallery from 'react-image-gallery';
import { NavLink } from 'react-router-dom';
 
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
                    <div  className="card-text " >{desc.split('\n')}</div>
                    <p></p>
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