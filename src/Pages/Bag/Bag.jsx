import React, { useState,useEffect } from "react";
import { GrCheckbox } from "react-icons/gr";
import { IoIosHeartEmpty } from "react-icons/io";
import Checkout from "../../Components/Checkout/Checkout";
import BasicModal from "../../Components/Product/BasicModal";
import { MdKeyboardArrowDown } from "react-icons/md";
import SimilarProduct from "../../Components/Product/SimilarProduct";
import { useNavigate } from "react-router-dom";
import "../../Style/Cart.css";
import { AiOutlineDelete } from "react-icons/ai";
import { useContext } from "react";
import { IoBagOutline } from "react-icons/io5";
import { UserContext,ProductContext,OrderContext} from "../../Context/MyContext";
import { db } from "../../Firebase/Firebase";
import { addDoc,collection,onSnapshot,doc,updateDoc, query, where, getDocs ,deleteDoc } from "firebase/firestore";
import { TbSquareRounded, TbSquareRoundedCheckFilled} from "react-icons/tb";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  borderRadius: "10px",
  bgcolor: "white",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const Bag = () => {
  const user = JSON.parse(window.localStorage.getItem("August"));
  const {currentuser} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [cart,setCart] = useState([]);
  const [sizeUpdate,setSizeUpdate] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const {size} = useContext(ProductContext);
  const [totalPrice,setTotalPrice] = useState(0);
  const [catId,setCatId] = useState("");
 const [cartUpdate,setCartUpdate] = useState(false);
const [statusAll,setStatusAll] = useState(false);
const {setOrderCartDel} = useContext(OrderContext);


  const handleUserCheck =()=>{

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
        console.log("user.uid",user.uid);
          const q = query(collection(db, 'carts'), where('userId', '==', user?.uid));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            cartid: doc.id,
          }));
          console.log('<<<<<<<<<<<<<<<', data);
          setOrderCartDel(data);
          setCart(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();

  }, [cartUpdate]); 

  useEffect(() => {
    if (user) {
    } else  {
      const cartdata = JSON.parse(window.localStorage.getItem("goodies")) || [];
      setCart(cartdata);
    }
  }, [user]);

useEffect(()=>{

  const price = cart?.reduce((a,{price,status})=>status?a+Number(price):a,0);
const id = cart[cart?.length-1]?.categoriesName?.id;
setCatId(id);
setTotalPrice(price);

},[cart,cartUpdate])

  const priceIn = async(p,i,x)=>{
  if(user){
    // for login user
    const washingtonRef = doc(db, "carts",x?.cartid);
    await updateDoc(washingtonRef, {
      qty:p === "+" ? Number(x.qty)+1 : Number(x.qty)-1,
       price: p === "+" ? Number(x?.actualPrice)*Number(x?.qty+1) : Number(x?.price)-Number(x?.actualPrice),
    });
    setCartUpdate(!cartUpdate);
  }else{
     const cartdata = cart?.map((c)=>{
      if(c.id === i){
        if(c.qty <=0){
          return;
        }
        console.log("ACTUALPRICE",c?.actualPrice);
        return {...c,qty:p === "+" ? Number(c.qty)+1 : Number(c.qty)-1,
        price: p === "+" ? Number(c?.actualPrice)*Number(c?.qty+1) : Number(c?.price)-Number(c?.actualPrice),
      }
      }
      return c;
     })
     window.localStorage.setItem("goodies",JSON.stringify(cartdata));
     setCart(cartdata);
  }

  }

  const handleUpdateSize = (x)=>{
    setSizeUpdate(x);
    handleOpen();
  }

 const handleUdpateCartSize =async()=>{

    if(user){
      // for handle the login user
      const washingtonRef = doc(db, "carts", sizeUpdate?.cartid);
      await updateDoc(washingtonRef, {
        size,
      });
    setCartUpdate(!cartUpdate);
      handleClose();
      setSizeUpdate(null);
    }
    else{
      const cartdata = cart?.map((c)=>{
        if(c.id === sizeUpdate.id){
          if(c.qty <=0){
            return;
          }
          return {...c,size}
        }
        return c;
       })
       window.localStorage.setItem("goodies",JSON.stringify(cartdata));
       setCart(cartdata);
       handleClose();
       setSizeUpdate(null);
    }
    }

const handleProductDelete = async(id,x)=>{
if(user){
  // for login user
  await deleteDoc(doc(db, "carts", x?.cartid));
  setCartUpdate(!cartUpdate);
}else{
  const data = cart?.filter((p)=>(
    p.id !== id
))
window.localStorage.setItem("goodies",JSON.stringify(data));
setCart(data);
}

}

const handleStatusUpdate =async(x)=>{
  const washingtonRef = doc(db, "carts", x?.cartid);
  await updateDoc(washingtonRef, {
    status:!x?.status,
  });
setCartUpdate(!cartUpdate);
}

useEffect(()=>{
  let checkStatus = true;
for(let i=0;i<cart.length;i++){

  if(cart[i].status !== true){
     checkStatus = false;
  }
}
console.log("checkstatusoffff",checkStatus);
if(checkStatus){
  setStatusAll(false);
}else{
  setStatusAll(true);
}
},[cart,cartUpdate])


const handleAllStatus = async () => {
  const promises = [];

  for (let i = 0; i < cart.length; i++) {
    const washingtonRef = doc(db, "carts", cart[i]?.cartid);
    console.log("printsomething");
    promises.push(updateDoc(washingtonRef, { status:statusAll?true:false}));
  }

  await Promise.all(promises);
  console.log("Before setCartUpdate",promises);
  setCartUpdate((prevCartUpdate) => !prevCartUpdate);
  console.log("After setCartUpdate");
};

  return (
    <>
      <div className="bag">
        {/* <h1>hello cart</h1> */}
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-md-7 ">
              <div className="row cartHeading p-3 mx-3">
                <h4>
                  Congratulations! Your order qualifies for our free shipping.
                </h4>
              </div>
              <div className="row cartIcon py-4 mx-3">
                <div className="col-6">
                  <div className="row">
                    <div
                      className="col fontFamilyCart"
                      onClick={() => navigate("/cart")}
                    >
                      {
                        cart.length > 0 && <span onClick={()=>handleAllStatus()}>
                        {statusAll?<TbSquareRounded  fontSize={23} />:<TbSquareRoundedCheckFilled fontSize={23} />}
                          
                        </span>
                      }

                      <span className="mx-3">My Bag ({cart?.length ? cart?.length : 0})</span>
                    </div>

                    <div
                      className="col fontFamilyCart"
                      onClick={() => navigate("/wishlist")}
                    >
                      <span>
                        <IoIosHeartEmpty fontSize={25} />
                      </span>
                      <span className="mx-3">Wishlist</span>
                    </div>
                  </div>
                </div>
              </div>
       {!cart?.length && <div className="row text-center my-5">
  <div className="row">

    <span><IoBagOutline fontSize={30}/></span>
    <h5 className=" mt-2 mb-5">Your shopping bag is empty</h5>
    <button className="btn btn-dark w-50 m-auto" onClick={()=>navigate('/')}>Start Shopping</button>
  </div>
</div>}



              <div className="row mt-4">
                {cart?.map((x, i) => (
                  <div className="cartShow my-2" key={x?.id}>
                    <div className="cartSelect">
                      <span onClick={()=>handleStatusUpdate(x)}>
                        {x?.status?<TbSquareRoundedCheckFilled fontSize={23} />:<TbSquareRounded  fontSize={23} />}
                        
                      </span>
                    </div>
                    <div className="cartImage px-2 ">
                      <img
                        src={x?.photo?.url}
                        alt={x?.name}
                        className="bg-dark"
                      />
                    </div>
                    <div className="hearIcon">
                      <IoIosHeartEmpty fontSize={25} />
                    </div>
                    <div className="CartSize">
                      <div className="row ">
                        <div className="cartPrice">
                          <div className="cartProductName">
                            <p>{x?.name}</p>
                            <p onClick={()=>handleUpdateSize(x)}>
                              <b>{x?.size}</b>
                              <MdKeyboardArrowDown
                                color="black"
                                fontSize={25}
                              />
                            </p>
                          </div>
                          <div className="">₹{x?.price}</div>
                          <div className="cartInc ">
                            <div className="text-center noneInitially">
                              <span className={`decCart ${x?.qty > 1 ? 'mb-1' : ''}`}  onClick={()=>{x?.qty === 1?handleProductDelete(x?.id,x):priceIn("-",x?.id,x)}}>{x?.qty === 1?<AiOutlineDelete className="mb-2" fontSize={17} />:"-"}</span>
                            </div>
                            <div className="text-center numberCart noneInitially">
                              <span>{x?.qty}</span>
                            </div>
                            <div className="text-center showAllDiv">
                              <span className="incCart mb-1" onClick={()=>priceIn("+",x?.id,x)} >+</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-5">
              <Checkout 
              totalPrice={totalPrice}
              cart={cart}
              />
            </div>
          </div>
          <div className="row">
            <SimilarProduct 
                   id={catId}
            />
          </div>
        </div>
      </div>
      <BasicModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleOpen={handleClose}
        setSizeUpdate = {setSizeUpdate}
        sizeUpdate = {sizeUpdate}
        handleUdpateCartSize={handleUdpateCartSize}
        style={style}
        user={user}
      />
    </>
  );
};

export default Bag;