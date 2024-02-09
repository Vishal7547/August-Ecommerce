import React, { useState,useContext,useEffect} from 'react'
import style from "../Profile/All.module.css";
import { OrderContext } from '../../Context/MyContext';
import { HiOutlineChevronLeft } from "react-icons/hi2";
import { HiOutlineChevronRight } from "react-icons/hi2";
const All = ({status,type,totalPage,currentPage,handlePageChange}) => {
const [data,setData] = useState([]);
const {orderPurchaseCart} = useContext(OrderContext);
useEffect(()=>{
if(type === 'All'){
setData(orderPurchaseCart);
}else{
  setData(status);
}

},[type,status,orderPurchaseCart]);

const handlePageClick = (i)=>{
  if(currentPage === i+1){
    return;
  }
  handlePageChange(i+1);
}

  return (
  <>
   {data.map((o,i)=>(
    <div className={style.container} key={o.orderid}>
    <div className={style.allheading}>
   <span className={style.ordersts}>Order Status : </span><span className={style.dispatchsts}>{o.orderStatus}</span>
    </div>
    <div className={style.allsubheading}>
    <span>Order ID : </span><span className={style.orderiddata}>{o.orderid
}</span><span>Order date : </span><span>{o.orderCreatedAt}</span>
    </div>
{
  o?.order?.map((p,i)=>(
    <div className={style.innercard} key={p?.id}>
    <div className={style.allleft}>
      
      <div className={style.allimg}>
      <img src={p.photo.url} alt={p.name} />
      </div>
      <div className={style.allimgheading}>
      <span>{p.name}</span>
      </div>
      <div className={style.allimgsubheading}>
      <span>{p.size}</span>
      </div>

      </div>

      <div className={style.allright}>
      <div className={style.allitems}>
       <span>x{p.qty}</span>
      </div>
      <div className={style.btns}>
      <button>Track your order</button>
      <button>View Details</button>
      </div>
    </div>
    

    </div>
  ))
}


  </div>
  ))
   }

   <div className ={style.pagination}>
    <span>Total {totalPage} Page </span> 
    <span onClick={()=>handlePageChange(currentPage-1)} style={{opacity:currentPage === 1 && 0.4}} > <HiOutlineChevronLeft /> </span>
    <span>
      {
        Array.from({length:totalPage}).map((p,i)=>(
          <span key={i} onClick={()=>handlePageClick(i)} style={{fontSize:currentPage === i+1 && 17,opacity:currentPage!== i+1 && 0.6}}>
            {i+1}{" "}
          </span>
        )) 
      }
    </span>
    <span onClick={()=>handlePageChange(currentPage+1)} style={{opacity:currentPage === totalPage && 0.4}}> <HiOutlineChevronRight /> </span>

   </div>

  </>
  )
}

export default All
