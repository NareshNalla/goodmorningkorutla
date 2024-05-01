import React from 'react';
import NavBar1 from "./Components/NavBar1";
import NavBarLeft from "./Components/NavBarLeft";
import Footer from "./Components/Footer";
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "react-image-gallery/styles/css/image-gallery.css";
import '@fortawesome/fontawesome-free/css/all.css';
import News from "./Components/News";
import Homepage from "./Components/Homepage";
import ContactForm from "./Components/ContactForm";
import AddArticle from "./Components/AddArticle";
import Mapper from "./Components/Mapper";
import Metpally from "./Components/map/Metpally";
import RegistrationForm from "./Components/RegistrationForm";
import NewsDetailPage from "./Components/NewsDetailPage";

function App() {
    return (
        <HelmetProvider>
            <div className="App">
                <BrowserRouter>
                    <div className="container-fluid"> {/* Use fluid container to avoid padding */}
                        <div className="row">
                            <div className="col-md-2 d-none d-md-block p-0"> {/* Remove default padding */}
                                <NavBarLeft />
                            </div>
                            <div className="col-md-10 p-0"> {/* Remove default padding */}
                                <NavBar1 />
                                <Routes>
                                    <Route path="/" element={<Homepage />} />
                                    <Route path="/goodmorningkorutla" element={<News category="general" />} />
                                    <Route path="/all" element={<News category="all" />} />
                                    <Route path="/maps" element={<Mapper />} />
                                    <Route path="/addArticle" element={<AddArticle />} />
                                    <Route path="/register" element={<RegistrationForm />} />
                                    <Route path="/contact" element={<ContactForm />} />
                                    <Route path="/:villageName" element={<Metpally />} />
                                    <Route path="/news/:title/:dateStr" element={<NewsDetailPage />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                    <div className="row d-md-none">
                        <div className="col p-0"> {/* Remove default padding */}
                            <NavBarLeft />
                        </div>
                    </div>
                </BrowserRouter>
                <Footer />
            </div>
        </HelmetProvider>
    );
}

export default App;
