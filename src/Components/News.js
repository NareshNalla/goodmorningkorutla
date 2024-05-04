import { React, useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll
    from "react-infinite-scroll-component";
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";

import { getDownloadURL, listAll, ref } from "firebase/storage";
import {db, imageDb} from '../firebase';


const urlsList = [];
function News(props) {
    let category = props.category;
    let [articles, setArticles] = useState([]);
    let [totalResults, setTotalResults] = useState(0);
    let [page, setPage] = useState(0);
    let [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = () => {
        fetchData1();
      };

      const fetchData1 = async () => {
        try {
            let q;

            if (lastDoc) {
                q = query(
                    collection(db, "articles"),
                    orderBy("created", "desc"),
                    startAfter(lastDoc),
                    limit(2)
                );
            } else {
                q = query(
                    collection(db, "articles"),
                    orderBy("created", "desc"),
                    limit(2)
                );
            }

          const snapshot = await getDocs(q);
          const newData = snapshot.docs.map(doc => doc.data());
          setArticles((prevArticles) => [...prevArticles, ...newData]);
         console.log("newData  "+newData);
         console.log("snapshot.size "+snapshot.size);
          setTotalResults(snapshot.size);
          if (snapshot.docs.length > 0) {
            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
          } else {
            setHasMore(false);
          }
          console.log("Initial page fetched successfully:", newData);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };


useEffect(()=>{
    console.log('useEffect ');
    fetchData1();
    console.log('useEffect end ');
}, [])

    
    return (
        <InfiniteScroll
            //This is important field to render the next data
            dataLength={articles.length}
            next={() => fetchMoreData()}
            hasMore={hasMore}
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
      {/* Main content */}
      
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
           
        </InfiniteScroll>
    );
}
 
export default News;