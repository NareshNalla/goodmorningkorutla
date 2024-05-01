import { React, useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import RegistrationCount from './RegistrationCount';
import './RegistrationCount.css';
import Image from "../Images/News1.jpg";
import InfiniteScroll
    from "react-infinite-scroll-component";
import { collection,addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import {db, imageDb} from '../firebase';

import ImageGallery from 'react-image-gallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { Link} 
    from "react-router-dom";



const urlsList = [];
function Homepage(props) {
  const [UrlToImage, SeturlToImage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
      // Call your method here
      listItems();
    }, []); 


    let listItems = async () => { // Ensure consistent naming (plural for list)
     
      const myPicksRef = ref(imageDb, 'homeslides/'); // Reference to homeslides folder
    
      try {
          const [items] = await Promise.all([listAll(myPicksRef)]); // Get all items
      
         
          items.items.forEach(async (itemRef) => {
              const url   = await  getDownloadURL(itemRef); 
              console.log("url "+url)
              urlsList.push(createImageObject(url, url));
              SeturlToImage([...urlsList, createImageObject(url, url)]);
     
          });
         // SeturlToImage(urlsList);
          console.log("urlsList length:", urlsList.length);
        } catch (error) {
          console.error("Error fetching image URLs:", error.message);
        }
        
    };
    function createImageObject(originalUrl, thumbnailUrl) {
      return {
        original: originalUrl,
        thumbnail: thumbnailUrl,
      };
    }

  const images = [
      {
        original: './Images/sanjay_win_smile.jpg'
        ,
        thumbnail: './Images/sanjay_win_smile.jpg',
      }
  ];
  

    let category = props.category;
    let [articles, setArticles] = useState([]);
    let [totalResults, setTotalResults] = useState(0);
    let [page, setPage] = useState(0);
   
    const jsonUrlsList = JSON.stringify({});


    let resultNews = async () => {
    try {
    let  q = query(
        collection(db, "articles"),
        orderBy("created", "desc"),
        limit(3)
    );

      const snapshot = await getDocs(q);
      const lastThreeArticles = [];
      const newData = snapshot.docs.map(doc => doc.data());
          setArticles((prevArticles) => [...prevArticles, ...newData]);
         console.log("newData  "+newData);
         console.log("snapshot.size "+snapshot.size);
          setTotalResults(snapshot.size);

  } catch (error) {
      console.error("Error fetching articles:", error.message);
  }
}

function createImageObject(originalUrl, thumbnailUrl) {
    return {
      original: originalUrl,
      thumbnail: thumbnailUrl,
    };
  }

useEffect(()=>{
    console.log('useEffect ');
    resultNews();
    console.log('useEffect end ');
}, [])

const images1 = [
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/news-666.appspot.com/o/files%2Fdbd317fa-eca4-4183-b924-b3ce6d20a8e3?alt=media&token=63ad88c0-c429-4ff3-99d6-6ff4e8b7ba86'
      ,
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/news-666.appspot.com/o/files%2Fdbd317fa-eca4-4183-b924-b3ce6d20a8e3?alt=media&token=63ad88c0-c429-4ff3-99d6-6ff4e8b7ba86',
    },
    {
        original: 'https://firebasestorage.googleapis.com/v0/b/news-666.appspot.com/o/files%2Fdbd317fa-eca4-4183-b924-b3ce6d20a8e3?alt=media&token=63ad88c0-c429-4ff3-99d6-6ff4e8b7ba86'
        ,
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/news-666.appspot.com/o/files%2Fdbd317fa-eca4-4183-b924-b3ce6d20a8e3?alt=media&token=63ad88c0-c429-4ff3-99d6-6ff4e8b7ba86',
      },
      {
        original: 'https://firebasestorage.googleapis.com/v0/b/news-666.appspot.com/o/files%2Fdbd317fa-eca4-4183-b924-b3ce6d20a8e3?alt=media&token=63ad88c0-c429-4ff3-99d6-6ff4e8b7ba86'
        ,
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/news-666.appspot.com/o/files%2Fdbd317fa-eca4-4183-b924-b3ce6d20a8e3?alt=media&token=63ad88c0-c429-4ff3-99d6-6ff4e8b7ba86',
      },
];

    
    return (
       
            <div className="container my-3">   
      {/* Main content */}
      <div className="row">
                    <ImageGallery 
                    items={UrlToImage} 
                    autoPlay={true} // Enable automatic slideshow
                    showPlayButton={false} // Hide the play button
                    showFullscreenButton={false}
                    slideInterval={5000} // Set slide interval to 3 seconds
                    slideOnThumbnailOver={false}
                    showIndex={false}
                    showNav={true}
                    showThumbnails={false}
                    infinite={true} 
                    />
            </div>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <p>Welcome to Good Morning Korutla, Website. You can find all information about how our Leader Dr. Sanjay Kalwakuntla garu is doing this program.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <a href="https://chat.whatsapp.com/CfzdtNLV3kUD3vakepzVCd" className={true ? "float sticky" : "float"} target="_blank" style={{ textDecoration: 'none' }}>
  <span style={{ color: 'white', background: 'green', borderRadius: '5px', padding: '5px 10px' }}>Join WhatsApp Group</span>
  <FontAwesomeIcon icon={faWhatsapp} className="my-float" size="3x" style={{ color: 'white', background: 'green', borderRadius: '50%', padding: '10px', marginLeft: '10px', width: '60px', height: '60px', lineHeight: '60px', textAlign: 'center' }} />
</a>
        </div>
        <h1>
        <span className="gradient-text">I Support to KSR.</span>
        </h1>
      <div className="registration-count-container">
        <RegistrationCount />
      </div>
      <Link to="/register"><button className="register-button">Register</button></Link>
        </div>
      </div>
      
      {/* News items */}
      <div className="row">
        {articles.map((element, index) => (
          <div className="col-md-4 col-sm-6 p-0" key={index}>
            <NewsItem
              sourceName={element.source.name}
              title={element.title}
              desc={element.description}
              imageURL={element.urlToImage}
              newsUrl={element.url}
              dateString={element.dateStr}
              embedUrl={element.embedUrl}
            />
          </div>
        ))}
      </div>
    </div>
           
   
  
    );
}
 
export default Homepage;