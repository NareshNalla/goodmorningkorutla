import { React, useState, useEffect } from "react";
import { collection, addDoc  } from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import {db, imageDb} from '../firebase';
import { v4 } from "uuid";
 
const AddArticles = () => {
    const [Title, Settitle] = useState("");
    const [Description, Setdescription] = useState("");
    const [UrlToImage, SeturlToImage] = useState("");
    const [Url, Seturl] = useState("");
    const [Sources, Setsources] = useState([]);
    const [id, Setid] = useState([]);
    const [SourceName, SetsourcesName] = useState([]);
    const [img,setImg] =useState('')
    const [imgUrl,setImgUrl] =useState([])
   // const [Description, Setdescription] = useState("");

   
    const sub = async (e) => {
        e.preventDefault();
        if(img !==null){
            const imgRef =  ref(imageDb,`files/${v4()}`)
            uploadBytes(imgRef,img).then(value=>{
                console.log(value)
                getDownloadURL(value.ref).then(url=>{
                    setImgUrl(data=>[...data,url])
                })
            })
         }
        try {
            const SourceObj = {
                id:id,
                name: SourceName
            }
            const docRef = await addDoc(collection(db, "articles"), {
                    title: Title,
                    description: Description,
                    urlToImage: imgUrl,
                    url: Url,
                    source: SourceObj
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

        // // Add data to the store
        // collection("articles").add({
        //     Title: Title,
        //     Description: Description,
        //     UrlToImage: UrlToImage,
        //     Url: Url
        //    // UrlToImage: course
        // })
        //     .then((docRef) => {
        //         alert("News Article Successfully Submitted");
        //     })
        //     .catch((error) => {
        //         console.error("Error adding document: ", error);
        //     });
    

    }
    useEffect(()=>{
        
    })
 
    // useEffect(()=>{
    //     listAll(ref(imageDb,"files")).then(imgs=>{
    //         console.log(imgs)
    //         imgs.items.forEach(val=>{
    //             getDownloadURL(val).then(url=>{
    //                 setImgUrl(data=>[...data,url])
    //             })
    //         })
    //     })
    // },[])

    return (
        <div>
            <center>
                <form style={{ marginTop: "200px" }}
                    onSubmit={(event) => { sub(event) }}>
                   <label>News Title</label> <input type="text" placeholder="News Title"
                        onChange={(e) => { Settitle(e.target.value) }} />
                    <br /><br />
                    <label>News Description</label>  
                    
                    <textarea rows={10} cols={30} 
                     onChange={(e) => { Setdescription(e.target.value)}}></textarea>
                  <br/>
                    <label>News Image URL</label>   <input type="text" placeholder="News Image url"
                        onChange={(e) => { SeturlToImage(e.target.value) }} />
                    <br /><br />
                    <label>News Source URL</label>    <input type="text" placeholder="Url news source"
                        onChange={(e) => { Seturl(e.target.value) }} />
                    <br /><br />
                    <label>News Source Name</label>    <input type="text" placeholder="news source Name"
                        onChange={(e) => { SetsourcesName(e.target.value) }} />
                    <br /><br />
                    <input type="file" multiple accept="image/*" onChange={(e)=>setImg(e.target.files[0])} /> 
                
                <br/>
               <div>
                        <img src={setImg[0]} height="200px" width="200px" />
                        <br/> 
                    </div>
                    <br /><br />
                    <button type="submit">Submit</button>
                </form>
            </center>
        </div>
    );
}
 
export default AddArticles;