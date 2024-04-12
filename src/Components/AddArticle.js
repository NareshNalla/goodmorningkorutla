import { React, useState, useEffect } from "react";
import { collection, addDoc , Timestamp } from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import {db, imageDb} from '../firebase';
import { v4 } from "uuid";
 
const AddArticles = () => {
    const [Title, Settitle] = useState("");
    const [Description, Setdescription] = useState("");
    const [UrlToImage, SeturlToImage] = useState([]);
    const [Sources, Setsources] = useState([]);
    const [id, Setid] = useState([]);
    const [SourceName, SetsourcesName] = useState([]);
    const [img,setImg] =useState([])
    const [imgUrl,setImgUrl] =useState([])
    const [embedUrl, SetembedUrl] = useState("");
    const [dateString, SetdateString] = useState("");
    

   function convertTimestampToDate(timestamp) {
    let date = timestamp.toDate();
    let mm = date.getMonth()+1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = mm + '-' + dd + '-' + yyyy;
    return date;
};
const timestampStr = Timestamp.now(); 

const  dateStr =  convertTimestampToDate(timestampStr);

    const sub = async (e) => {
        e.preventDefault();
        let urlsList = [];
        if(dateString.trim() == ""){
            
        for(let i = 0; i<img.length; i++){
            if(img[i] !==null){
               // const imgRef =  ref(imageDb,`files/${v4()}`)
            const  imgRef =  ref(imageDb,`files/${dateStr}/${img[i].name}`);
               
             const snapshot =  await  uploadBytes(imgRef,img[i]); 
    
             const url   = await  getDownloadURL(snapshot.ref); 
                        console.log("url "+url)
                        urlsList.push(url);
        
             }
            }
        }else{
            for(let i = 0; i<img.length; i++){
                if(img[i] !==null){
                   // const imgRef =  ref(imageDb,`files/${v4()}`)
                 const imgRef =  ref(imageDb,`files/${dateString}/${img[i].name}`);
                   
                 const snapshot =  await  uploadBytes(imgRef,img[i]); 
        
                 const url   = await  getDownloadURL(snapshot.ref); 
                            console.log("url "+url)
                            urlsList.push(url);
                // getDownloadURL(snapshot.ref).then(url=>{
                //     console.log("url "+url)
                //     urlsList.push(url);
                // })
                 }
                }
        }
        console.log("size urlsList"+urlsList.length);
       
        urlsList.push(embedUrl);
         
        try {
            const SourceObj = {
                id:id,
                name: SourceName
            }
            
            const docRef = await addDoc(collection(db, "articles"), {
                    title: Title,
                    description: Description,
                    urlToImage: urlsList,
                    source: SourceObj,
                    created:timestampStr,
                    dateStr:dateStr,
                    embedUrl:embedUrl
            });
            console.log("uploade at"+urlsList);
            console.log("uploade at"+urlsList.length);
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          

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
                   
                
                    <label>News Source Name</label>    <input type="text" placeholder="news source Name"
                        onChange={(e) => { SetsourcesName(e.target.value) }} />
                    <br /><br />
                    <label>Youtube Video Link</label>    <input type="text" placeholder="youtube video url"
                        onChange={(e) => { SetembedUrl(e.target.value) }} />
                    <br /><br />
                    <label>Date Program 4-9-2024</label>    <input type="text" placeholder="date string"
                        onChange={(e) => { SetdateString(e.target.value) }} />
                    <br /><br />
                    <input type="file" multiple  accept="*/*" onChange={(e)=>setImg(e.target.files)} /> 
                
                <br/>
               
                    <br /><br />
                    <button type="submit">Submit</button>
                </form>
            </center>
        </div>
    );
}
 
export default AddArticles;