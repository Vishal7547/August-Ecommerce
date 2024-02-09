import React from 'react';
import { useState,useEffect } from 'react';
import { ProductContext } from './MyContext';
import { db } from '../Firebase/Firebase';
import {collection,onSnapshot,doc} from "firebase/firestore";

const ProductProvider = ({children}) => {
    const [topProduct,setTopProduct] = useState([]);
    const [product,setProduct] = useState([]);
    const [size,setSize] = useState(null);
  const [toggleSearch,setToggleSearch] = useState(false);

    const [category,setCategory] = useState({
      categories:[],
      inFocusPhoto:{},
      inFocusVideo:{},
      homeBanner:"",
      homeEveryMood:[],
      video:[],
    });
const [filterCategory,setFilterCategory] = useState([]);

const handleSearch=()=>{
  setToggleSearch(!toggleSearch);
  console.log(toggleSearch);
  }


    useEffect(()=>{
try{
  onSnapshot(collection(db, "product"), (snapshot) => {
        const data = snapshot.docs.map((doc)=>{
          return {
            ...doc.data(),
            id:doc.id,
          }
        })
    setProduct(data);
        setTopProduct(data.slice(0,6));

      });
}catch(e){
   console.log(e);
}
    },[])

    useEffect(()=>{
      try{
        onSnapshot(collection(db, "category"), (snapshot) => {
              const data = snapshot.docs.map((doc)=>{
                return {
                  ...doc.data(),
                  id:doc.id,
                }
              })
         setFilterCategory(data);       
      
            });
      }catch(e){
         console.log(e);
      }
          },[])


    useEffect(()=>{
      try{
        onSnapshot(doc(db, "home","jsdfhdsffoidgjdsgoi"), (snapshot) => {
             
              const data= {
               ...snapshot.data(),
               id:snapshot.id,
              }
              setCategory({
                categories:data?.categories?.slice(0,3),
                inFocusPhoto:data?.inFocusPhoto,
                inFocusVideo:data?.inFocusVideo,
                homeBanner:data?.bannerName,
                homeEveryMood:data?.yourEveryMood,
                video:data?.video,
              });
            });

      }catch(e){
         console.log(e);
      }
          },[])
const inFocusPhoto = category.inFocusPhoto;
const inFocusVideo = category.inFocusVideo;
const homeBanner = category.homeBanner;
const homeEveryMood = category.homeEveryMood;
const video = category.video;
  return (
   <ProductContext.Provider value={{topProduct,toggleSearch,handleSearch,size,setSize,category,filterCategory,inFocusPhoto,inFocusVideo,homeBanner,homeEveryMood,video,product}}>
    {children}
   </ProductContext.Provider>
  )
}

export default ProductProvider
