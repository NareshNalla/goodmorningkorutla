import React, { useState, useEffect } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, imageDb } from '../firebase';
import { v4 as uuidv4 } from "uuid";
import "./AddArticle.css";
import 'bootstrap/dist/css/bootstrap.css';

const AddArticle = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [urlToImage, setUrlToImage] = useState([]);
    const [sourceName, setSourceName] = useState("");
    const [embedUrl, setEmbedUrl] = useState("");
    const [dateString, setDateString] = useState("");

    const handleDate = () => {
        const timestamp = Timestamp.now();
        const date = convertTimestampToDate(timestamp);
        setDateString(date);
    };

    const convertTimestampToDate = (timestamp) => {
        const date = timestamp.toDate();
        const mm = date.getMonth() + 1;
        const dd = date.getDate();
        const yyyy = date.getFullYear();
        return `${mm}-${dd}-${yyyy}`;
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setUrlToImage(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (dateString.trim() === "") {
            handleDate();
        }

        const urlsList = [];
        for (let i = 0; i < urlToImage.length; i++) {
            if (urlToImage[i] !== null) {
                const imgRef = ref(imageDb, `files/${dateString}/${urlToImage[i].name}`);
                const snapshot = await uploadBytes(imgRef, urlToImage[i]);
                const url = await getDownloadURL(snapshot.ref);
                urlsList.push(url);
            }
        }
        urlsList.push(embedUrl);

        try {
            const sourceObj = {
                id: uuidv4(),
                name: sourceName
            };

            await addDoc(collection(db, "articles"), {
                title,
                description,
                urlToImage: urlsList,
                source: sourceObj,
                created: Timestamp.now(),
                dateStr: dateString,
                embedUrl
            });
            console.log("Document added successfully");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    useEffect(() => {
        handleDate();
    }, []);

    return (
        <div className="container-add">
            <form className="form" onSubmit={handleSubmit}>
                <label className="label">News Title</label> 
                <input className="input oneline" type="text" placeholder="News Title" onChange={(e) => setTitle(e.target.value)} />
                <br /><br />
                <label className="label">News Description</label>  
                <textarea className="textarea oneline" rows={5} cols={30} onChange={(e) => setDescription(e.target.value)}></textarea>
                <br /><br />
                <label className="label">News Source Name</label>    
                <input className="input" type="text" placeholder="News Source Name" onChange={(e) => setSourceName(e.target.value)} />
                <br /><br />
                <label className="label">Youtube Video Link</label>    
                <input className="input" type="text" placeholder="Youtube Video URL" onChange={(e) => setEmbedUrl(e.target.value)} />
                <br /><br />
                <label className="label">Date Program 4-9-2024</label>    
                <input type="text" placeholder="date string"
                        onChange={(e) => { setDateString(e.target.value) }} />
                <br /><br />
                <input className="file-input" type="file" multiple accept="*/*" onChange={handleFileChange} /> 
                <br /><br />
                <button className="submit-button" type="submit">Submit</button>
                <br /><br />
            </form>
        </div>
    );
};

export default AddArticle;
