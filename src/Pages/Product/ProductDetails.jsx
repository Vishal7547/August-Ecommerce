import { useState } from "react";
import { CiHeart, CiSaveUp2 } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuShirt } from "react-icons/lu";
import SimilarProduct from "../../Components/Product/SimilarProduct";
import BasicModal from "../../Components/Product/BasicModal";
import { useParams,useNavigate} from "react-router-dom";
import { useContext,useEffect} from "react";
import { ProductContext, UserContext } from "../../Context/MyContext";
import {collection,onSnapshot,addDoc,where,query,getDocs,doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

const style = {
  position: "absolute",
  top: "40%",
  left: "75%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  borderRadius: "10px",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};


const ProductDetails = () => {
  const user = JSON.parse(window.localStorage.getItem("August"));
  const [productDetails,setProductDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [cartData,setCartData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading,setLoading] = useState();
  const {product,size,setSize} = useContext(ProductContext);
  
      const { currentuser} = useContext(UserContext);

  const { id } = useParams();
  console.log(id);

  useEffect(()=>{
    try{
      onSnapshot(doc(db, "product",id), (snapshot) => {
           
            const data= {
             ...snapshot.data(),
             id:snapshot.id,
            
            }
            setProductDetails(data);
            console.log("#######",data);
          });

    }catch(e){
       console.log(e);
    }
        },[id])

const navigate = useNavigate();


const handleCart = async()=>{
  const userId = window.localStorage.getItem("UserId");
  if(size){

      if(user){
        const citiesRef = collection(db, "carts");
    
        const q = query(citiesRef, where("id", "==", 
        productDetails?.id));
    
        const querySnapshot = await getDocs(q);
      const check = querySnapshot?.docChanges();
  if(check.length === 0){
    try{
      const docRef = await addDoc(collection(db, "carts"), {
        ...productDetails,size,userId:user?.uid,status:true,
        qty: 1, 
      });
    }catch(e){
      console.log("carterror",e);
    }

  }
  else{
console.log("already added");
console.log(check[0]?.doc?.id,"check123");
const cartid = check[0]?.doc?.id;
const washingtonRef = doc(db, "carts", cartid);
const total = Number(productDetails?.qty)+1;
console.log("total",total);
await updateDoc(washingtonRef, {
  qty:total,
  size,
});
  }
    }
    else{
    const cart = window.localStorage.getItem("goodies")?JSON.parse(window.localStorage.getItem("goodies")):[];
    const check = cart?.find((c,i)=>(
    c?.id === productDetails?.id
    ));
    if(check){
      const cartUpdate = cart?.map((c,i)=>{
      if(c?.id === productDetails?.id){
      return {...c,qty:Number(c?.qty)+1,size}
      }else{
      return c;
      }
      })
    window.localStorage.setItem("goodies",JSON.stringify(cartUpdate));

    }
    else{
        const notLoginUser = {...productDetails,size,status:true,
        };
    cart.push(notLoginUser);
    window.localStorage.setItem("goodies",JSON.stringify(cart));
    }

    }

  //  return navigate('/cart');
  }else{

    handleOpen();
  }
}

  return (
    <>
      <div className="detailsProject">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="imageProductDetails">
                  <img
                    src={productDetails?.photo?.url}
                    alt="product"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6  py-1">
              <div className="row mt-5 px-5">
                <div className="row productHeading">
                  <h1>
                  {productDetails?.name}
                  </h1>
                </div>
                <div className="row mt-4 productPrice">
                  <div className="d-flex justify-content-between">
                    <div className="price">
                      <h4 >MRP ₹ {productDetails?.price}</h4>
                      <p >Inclusive of all taxes</p>
                    </div>
                    <div className="fav">
                      <span>
                        <CiHeart fontSize={30} />
                      </span>
                      <span>
                        <CiSaveUp2 fontSize={30} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row DetailsBtn">
                  <button className="btn  py-2 sizeBtn" onClick={handleOpen}>
                    {!size?"SELECT SIZE":size}
                    <MdKeyboardArrowDown color="black" fontSize={25} />
                  </button>
                </div>
                <div className="row DetailsBtn my-2">
                  <button className="btn btn-dark py-2" onClick={handleCart}>
                    ADD TO BAG
                  </button>
                </div>
                <div className="row p-0 aboutProductDetails mt-4">
                  <p>
                    <LuShirt /> ABOUT THIS PROJECT
                  </p>
                  <p className="detailsDescrption">
                  {productDetails?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BasicModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleOpen={handleClose}
        style={style}
        productDetails={productDetails}
      />
      <SimilarProduct 
        id={productDetails?.categoriesName?.id}
      />

    </>
  );
};

export default ProductDetails;