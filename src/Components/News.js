import { React, useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Image from "../Images/News1.jpg";
import InfiniteScroll
    from "react-infinite-scroll-component";
import { collection,addDoc, getDocs } from "firebase/firestore";

import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import {db, imageDb} from '../firebase';

import ImageGallery from 'react-image-gallery';

const urlsList = [];
function News(props) {
    let category = props.category;
    let [articles, setArticles] = useState([]);
    let [totalResults, setTotalResults] = useState(0);
    let [page, setPage] = useState(0);
   
    const jsonUrlsList = JSON.stringify({});
 
//     let resultNews = async () => {
//         const url =
// `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page}&apiKey=ecfaf9eaaa8d40a5b5d769210f5ee616`;
//         let data = await fetch(url);
//         let parsedData = await data.json();
//         setArticles(parsedData.articles);
//         setTotalResults(parsedData.totalResults);
//     };

 
 let resultNews =  async () => {
    console.log("articles, newData");
    await getDocs(collection(db, "articles"))
        .then((querySnapshot)=>{              
            querySnapshot.forEach(element => {
                var data = element.data();
               // setArticles(parsedData.articles);
                setArticles(arr => [...arr, data]);
                setTotalResults(data.length);
                console.log('sds '+data)
    
            });
           // setTodos(newData);                
          
        });

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
    listItems();
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
// let listItem =  async () => {
//     const myPicks = ref(imageDb, 'homeslides/')

//     await listAll(myPicks)
//         .then(async (res)=> {
//             res.items.forEach((item) => {
//                 console.log("item "+item.toString());
//                 const url = getDownloadURL(item);
//                 console.log("url  "+url.toString)
//                 const  image = {
//                     original: url,
//                     thumbnail: url,          
//             }

//                 urlsList.push(image);
//             });
//         })
//         .catch((err) => {
//             alert(err.message);
//         });
//         console.log("urlsList "+urlsList);
//         console.log("urlsList "+urlsList.length)
// };

let listItems = async () => { // Ensure consistent naming (plural for list)
   // const storage = getStorage(); // Initialize Firebase Storage
    const myPicksRef = ref(imageDb, 'homeslides/'); // Reference to homeslides folder
  
    try {
        const [items] = await Promise.all([listAll(myPicksRef)]); // Get all items
    
       
        items.items.forEach(async (itemRef) => {
            const url   = await  getDownloadURL(itemRef); 
            console.log("url "+url)
            urlsList.push(createImageObject(url, url));
            
    //         const  image = {
    //             original: url,
    //             thumbnail: url,          
    //           }
              
    //   urlsList.push(image);
      // console.log("urlsList :", urlsList.toString());
      //const jsonUrlsList = JSON.stringify(urlsList);
    //  console.log("urlsList (JSON):", jsonUrlsList);

      

        //   const downloadURL = await getDownloadURL(itemRef); // Get URL for each item
        //     const newLocal = {
        //         original: downloadURL,
        //         thumbnail: downloadURL,
        //     };
        //     console.log("newLocal "+newLocal);
        //   urlsList.push(newLocal);
        });
    
        console.log("urlsList:", urlsList);
        console.log("urlsList length:", urlsList.length);
        console.log("images1 "+images1);
        console.log("images1 length"+images1.length);
      } catch (error) {
        console.error("Error fetching image URLs:", error.message);
        // Handle errors more gracefully (e.g., display user-friendly message)
      }
  };

    let fetchData = async () => {
        const url =
`https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page + 1
            }&apiKey=ecfaf9eaaa8d40a5b5d769210f5ee616`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
    };
    
    return (
        <InfiniteScroll
            //This is important field to render the next data
            dataLength={articles.length}
            next={fetchData}
            hasMore={
                articles.length < totalResults
            }
            loader={
                <h4 className="text-center">
                    Loading...
                </h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="container-fluid">
            {/* <ImageGallery items={urlsList} 
                        showPlayButton={false}
                        showFullscreenButton={false}
                        slideInterval={1000}
                        slideOnThumbnailOver={false}
                        showIndex={false}
                        showNav={true}
                        showThumbnails={false}
                        /> */}
            </div>
            <div className="container my-3">

           

            <div class="row justify-content-md-center">
    <div class="col col-lg-2">
      
    </div>
    <div class="col-md-8">
      Welcome to Good Morning Korutla , Website . Your can find all information about 
      how our Leader Dr. Sanjay Kalwakuntla doing this program.
      <div className="rbb-ImageGallery">
    
                </div>

              
               
    </div>
    
    <div class="col col-lg-2">
      
    </div>
  </div>
        <div class="row">
        <div class="col-8"> {articles.map((element) => {
                        return (
                            <div className="col-md-8" key={element.url}>
                                <NewsItem
                                    sourceName={element.source.name}
                                    title={element.title}
                                    desc={element.description}
                                    imageURL=
                                    {element.urlToImage}
                                    newsUrl={element.url}
                                    dateString = {element.dateStr}
                                    embedUrl = {element.embedUrl}
                                />
                            </div>
                        );
                    })}</div>
        <div class="col-2">
        <div className="col-md-2">
                                
         </div>
        </div>
        </div>
                
            </div>
        </InfiniteScroll>
    );
}
 
export default News;