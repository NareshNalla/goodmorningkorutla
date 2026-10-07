import React from "react";
import './App.css';
import Header from "./Components/Header";
import ProfileBar from "./Components/ProfileBar";
import News from "./Components/News";
import Constituency from "./Components/Constituency";
import Journey from "./Components/Journey";
import About from "./Components/About";
import FollowUs from "./Components/FollowUs";
import FanCommunity from "./Components/FanCommunity";
import Footer from "./Components/Footer";
import MobileBar from "./Components/MobileBar";
import ContactForm from "./Components/ContactForm";

import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

function HomePage() {
    return (
        <>
            <ProfileBar />
            <div className="gmk-layout">
                <main className="gmk-main">
                    <News />
                </main>
                <aside className="gmk-sidebar">
                    <FollowUs />
                    <FanCommunity />
                    <Constituency />
                </aside>
            </div>
            <Journey />
            <About />
        </>
    );
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/goodmorningkorutla" element={<HomePage />} />
                    <Route path="/contact" element={<ContactForm />} />
                </Routes>
                <Footer />
                <MobileBar />
            </BrowserRouter>
        </div>
    );
}

export default App;
