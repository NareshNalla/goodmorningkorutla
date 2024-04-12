import { React, useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Image from "../Images/News1.jpg";
import InfiniteScroll
    from "react-infinite-scroll-component";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {db} from '../firebase';
 
function News(props) {
    let category = props.category;
    let [articles, setArticles] = useState([]);
    let [totalResults, setTotalResults] = useState(0);
    let [page, setPage] = useState(0);
 
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
          
        })
}

useEffect(()=>{
    console.log('useEffect ');
    resultNews();
    console.log('useEffect end ');
}, [])

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
            <div className="container my-3">
            <div class="row justify-content-md-center">
    <div class="col col-lg-2">
      
    </div>
    <div class="col-md-8">
      Welcome to Good Morning Korutla , Website . Your can find all information about 
      how our Leader Dr. Sanjay Kalwakuntla doing this program.
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