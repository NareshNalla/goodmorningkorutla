import React from "react";
import NavBar2 from "./Components/NavBar2";
import NavBar1 from "./Components/NavBar1";
import News from "./Components/News";
import ContactForm from "./Components/ContactForm";
import AddArticles from "./Components/AddArticles";

import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } 
    from "react-router-dom";
 
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
                                            <News key="general"
                                            category="general" />}
                                    />
                                    <Route
                                        path="/Entertainment"
                                        element={
                                            <News key="entertainment"
                                            category="entertainment" />
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
                                        path="/Business"
                                        element={
                                            <News key="business"
                                            category="business" />}
                                    />
                                    <Route
                                        path="/addArticle"
                                        element={
                                            <AddArticles />}
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