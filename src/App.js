import React from "react";
import NavBar2 from "./Components/NavBar2";
import NavBar1 from "./Components/NavBar1";
import News from "./Components/News";
import ContactForm from "./Components/ContactForm";
import AddArticles from "./Components/AddArticles";
import AddArticle from "./Components/AddArticle";

import 'bootstrap/dist/css/bootstrap.css';
import "react-image-gallery/styles/css/image-gallery.css";

import { BrowserRouter, Route, Routes } 
    from "react-router-dom";
 
function App() {
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