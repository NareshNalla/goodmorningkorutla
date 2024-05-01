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
import { HelmetProvider } from 'react-helmet-async';



import imgmapjpg from './Images/korutla_const_map.jpg';




import 'bootstrap/dist/css/bootstrap.css';
import "react-image-gallery/styles/css/image-gallery.css";


import { BrowserRouter, Route, Routes} 
    from "react-router-dom";


const urlsList = [];

function App() {
    return (
        <HelmetProvider>
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
        </HelmetProvider>
    );
}

export default App;
