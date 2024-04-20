import React, { useEffect, useState } from 'react';
import NavBar2 from "./Components/NavBar2";
import NavBar1 from "./Components/NavBar1";
import News from "./Components/News";
import Homepage from "./Components/Homepage";
import ContactForm from "./Components/ContactForm";
import AddArticles from "./Components/AddArticles";
import AddArticle from "./Components/AddArticle";
import Footer from "./Components/Footer";
import Mapper from "./Components/Mapper";
import imgmapjpg from './Images/korutla_const_map.jpg';




import 'bootstrap/dist/css/bootstrap.css';
import "react-image-gallery/styles/css/image-gallery.css";


import { BrowserRouter, Route, Routes } 
    from "react-router-dom";


const urlsList = [];

function App() {
   
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
                <div>
                    <Mapper/>
                <Footer />
                </div>
                
            </div>
        </>
    );
}
 
export default App;