import { React, useState, useEffect } from "react";
import { collection, addDoc  } from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import {db, imageDb} from '../firebase';
import { v4 } from "uuid";
 
const AddArticles = () => {
    const [Title, Settitle] = useState("");
    const [Description, Setdescription] = useState("");
    const [UrlToImage, SeturlToImage] = useState([]);
    const [Url, Seturl] = useState("");
    const [Sources, Setsources] = useState([]);
    const [id, Setid] = useState([]);
    const [SourceName, SetsourcesName] = useState([]);
    const [img,setImg] =useState('')
    const [imgs,setImgs] =useState([])
    const [imgUrl,setImgUrl] =useState([])
    const [URLs, setURLs] = useState([]);
    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState(0);
   // const [Description, Setdescription] = useState("");

   
    const sub = async (e) => {
        e.preventDefault();
        images.map((file) => {
            if(img !==null){
                const imgRef =  ref(imageDb,`files/${file.name}`)
                uploadBytes(imgRef,file).then(value=>{
                    console.log(value)
                    getDownloadURL(value.ref).then(url=>{
                        setImgUrl(data=>[...data,url])
                    })
                })
             }
         
        });
        try {
            const SourceObj = {
                id:id,
                name: SourceName
            }
            console.log("befor await addDoc", URLs);
            const docRef = await addDoc(collection(db, "articles"), {
                    title: Title,
                    description: Description,
                    urlToImage: imgUrl,
                    url: Url,
                    source: SourceObj
            });
            console.log("Document written with ID: ", docRef.id);
            console.log("end await addDoc", URLs);
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
       // uploadImages(images);
    })
    const handleImageChange = (e) => {
        let allImages = [];
        for (let i = 0; i < e.target.files.length; i++) {
          const newImage = e.target.files[i];
          newImage["id"] = Math.random();
          allImages.push(newImage);
        }
        setImages(allImages);
      };
    //   const uploadImages = (files) => {
    //     const promises = [];
    //     files.map((file) => {
    //       const storageRef = ref(imageDb, `files/${file.name}`);
    //       const uploadTask = uploadBytesResumable(storageRef, file);
    //       promises.push(uploadTask);
    //       uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //           const progress = Math.round(
    //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //           );
    //           setProgress(progress);
    //         },
    //         (error) => {
    //           console.log(error);
    //         },
    //         async () => {
    //           await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //            // setURLs(data=>[...data,downloadURL])
    //            // setImgUrl(data=>[...data,downloadURL])
    //             console.log("File available at", downloadURL);
    //             console.log("File available at", imgUrl);
    //           });
    //         } );

    //       getDownloadURL(uploadTask.snapshot.ref).then(url=>{
    //         setImgUrl(data=>[...data,url])
    //         console.log(" NEW TRY File available at", imgUrl);
    //     });
    // });
        
    
    //     console.log("File available at", URLs);
    //     Promise.all(promises)
    //       .then(() => alert("All images uploaded"))
    //       .catch((err) => console.log(err));
    //   };
 
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
                         <div>
                        <img src={setImg[0]} height="200px" width="200px" />
                        <br/> 
                    </div>
                    <br />
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
                    <input type="file" multiple accept="image/*"  onChange={(e)=>setImgs(e.target.files)} /> 
                
                <br/>
                <div className="mb-5 w-1/2 px-2">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            multiple
            onChange={handleImageChange}
            className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-md transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
          />
          <p className="text-sm text-black" id="file_input_help">
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>
        </div>

              
                    <button type="submit">Submit</button>
                </form>
            </center>
        </div>
    );
}
 
export default AddArticles;