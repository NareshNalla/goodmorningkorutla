import {React, useEffect} from "react";
import NavBar2 from "./Components/NavBar2";
import NavBar1 from "./Components/NavBar1";
import News from "./Components/News";
import ContactForm from "./Components/ContactForm";
import AddArticles from "./Components/AddArticles";
import AddArticle from "./Components/AddArticle";

import 'bootstrap/dist/css/bootstrap.css';
import "react-image-gallery/styles/css/image-gallery.css";

import ImageGallery from 'react-image-gallery';
import { collection,addDoc, getDocs } from "firebase/firestore";

import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import {db, imageDb} from './firebase';

import { BrowserRouter, Route, Routes } 
    from "react-router-dom";


const urlsList = [];

 
function App() {

    let listItems = async () => { // Ensure consistent naming (plural for list)
        // const storage = getStorage(); // Initialize Firebase Storage
         const myPicksRef = ref(imageDb, 'homeslides/'); // Reference to homeslides folder
       
         try {
             const [items] = await Promise.all([listAll(myPicksRef)]); // Get all items
         
            
             items.items.forEach(async (itemRef) => {
                 const url   = await  getDownloadURL(itemRef); 
                 console.log("url "+url)
                 urlsList.push(createImageObject(url, url));
                 
        
             });
         
             console.log("urlsList length:", urlsList.length);
           } catch (error) {
             console.error("Error fetching image URLs:", error.message);
             // Handle errors more gracefully (e.g., display user-friendly message)
           }
       };

       function createImageObject(originalUrl, thumbnailUrl) {
        return {
          original: originalUrl,
          thumbnail: thumbnailUrl,
        };
      }

      useEffect(()=>{
        console.log('useEffect ');
        listItems();
        if(urlsList){
            listItems();
        }
        console.log('useEffect end ');
    }, []);

    const images = [
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
        <>
            <div className="App">
                <BrowserRouter>
                    <NavBar1 />
                    <NavBar2 />
                    <div className="container-fluid">
            <ImageGallery items={urlsList} 
                        showPlayButton={false}
                        showFullscreenButton={false}
                        slideInterval={10}
                        slideOnThumbnailOver={false}
                        showIndex={false}
                        showNav={true}
                        showThumbnails={false}
                        />
            </div>
               
 
                    <div className="container">
                        <div className="row">
                            <div className="col-md">
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <News key="general"
                                            category="general" />}
                                    />
                                    <Route
                                        path="/goodmorningkorutla"
                                        element={
                                            <News key="general"
                                            category="general" />
                                        }
                                    />
                                    <Route
                                        path="/Technology"
                                        element={
                                            <News key="technology"
                                            category="technology" />}
                                    />
                                    <Route
                                        path="/Sports"
                                        element={
                                            <News key="sports"
                                            category="sports" />}
                                    />
                                   <Route
                                        path="/addArticles"
                                        element={
                                            <AddArticles />}
                                    />
                                    <Route
                                        path="/addArticle"
                                        element={
                                            <AddArticle />}
                                    />
                                   
                                    <Route path="/contact"
                        element={<ContactForm />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
                
            </div>
        </>
    );
}
 
export default App;