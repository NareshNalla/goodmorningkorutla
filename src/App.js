import React, { useEffect, useState } from 'react';
import NavBar2 from "./Components/NavBar2";
import NavBar1 from "./Components/NavBar1";
import NavBarLeft from "./Components/NavBarLeft";

import NavBarBottom from "./Components/NavBarBottom";

import News from "./Components/News";
import Homepage from "./Components/Homepage";
import ContactForm from "./Components/ContactForm";
import AddArticle from "./Components/AddArticle";
import Footer from "./Components/Footer";
import Mapper from "./Components/Mapper";
import Metpally from "./Components/map/Metpally"
import RegistrationForm from "./Components/RegistrationForm";
import NewsDetailPage from "./Components/NewsDetailPage";

import { Helmet } from 'react-helmet-async';



import imgmapjpg from './Images/korutla_const_map.jpg';

import metaImg from "./Images/sanjay_win_smile.jpg";




import 'bootstrap/dist/css/bootstrap.css';
import "react-image-gallery/styles/css/image-gallery.css";


import { BrowserRouter, Route, Routes} 
    from "react-router-dom";


const urlsList = [];

function App() {
    return (
      
        <>
            <div className="App">
            <Helmet>
                <meta name="description" content="Good Morning Korutla Program is initiated by Dr. K. Sajay Rao , MLA Korutla " />
                <meta name="keywords" content="GMK , Korutla , Metpally" />
                <meta property="og:title" content="Good Morning Korutla" />
                <meta property="og:description" content="Good Morning Korutla Program is initiated by Dr. K. Sajay Rao , MLA Korutla " />
                <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                 <meta property="og:image" content={metaImg} />
            </Helmet>
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
                                            <Homepage key="general"
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
                                        path="/all"
                                        element={
                                            <News key="all"
                                            category="all" />}
                                    />
                                    <Route
                                        path="/maps"
                                        element={
                                            <Mapper />}
                                    />
                                  
                                    <Route
                                        path="/addArticle"
                                        element={
                                            <AddArticle />}
                                    />
                                    <Route path="/register"
                                     element={
                                        <RegistrationForm />}
                                     />
                                    <Route path="/:villageName" element={<Metpally />} /> {/* Specific village page route */}
                                    <Route exact path="/news/:title/:dateStr"  element={<NewsDetailPage />}  />
                                    <Route path="/contact"
                        element={<ContactForm />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                    <div className="row d-md-none">
                        <div className="col p-0"> {/* Remove default padding */}
                            <NavBarBottom />
                        </div>
                    </div>
                    
                </BrowserRouter>
                <div>
                <Footer />
            </div>
                
            </div>
        </>
    );
}

export default App;
