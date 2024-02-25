import React from "react";
import { useState, useEffect } from "react";
import { OrderContext } from "./MyContext";
import { db } from "../Firebase/Firebase";
import toast from "react-hot-toast";
import {
  collection,
  onSnapshot,
  doc,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
const OrderProvider = ({ children }) => {
  const user = JSON.parse(window.localStorage.getItem("August"));
  const [placeOrder, setPlaceOrder] = useState([]);
  const [checkOut, setCheckOut] = useState(false);
  const [totalPayment, setTotalPayment] = useState(0);
  const [orderCartDel, setOrderCartDel] = useState([]);
  const [orderPurchaseCart, setOrderPurchaseCart] = useState([]);
  const [orderUpdate, setOderUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [processing, setProcessing] = useState([]);
  const [shipped, setShipped] = useState([]);
  const [deliverd, setDelivered] = useState([]);
  const [currentShippedPage, setCurrentShippedPage] = useState(1);
  const [currentProcessingPage, setCurrentProcessingPage] = useState(1);
  const [currentDeliveredPage, setCurrentDeliveredPage] = useState(1);
  const [totalPageShipped, setTotalPageShipped] = useState(1);
  const [totalPageDelivered, setTotalPageDelivered] = useState(1);
  const [totalPageProcessing, setTotalPageProcessing] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          console.log("user.uid", user.uid);
          const q = query(
            collection(db, "orders"),
            where("userId", "==", user?.uid)
          );
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            orderid: doc.id,
          }));

          const processingStatus = data.filter(
            (p) => p.orderStatus === "Processing"
          );
          const shippedStatus = data.filter((p) => p.orderStatus === "Shipped");
          const deliveredStatus = data.filter(
            (p) => p.orderStatus === "deliverd"
          );
          const orderPerPage = 2;
          const startIndex = (currentPage - 1) * orderPerPage;
          const lastIndex = startIndex + orderPerPage;
          const startIndexP = (currentProcessingPage - 1) * orderPerPage;
          const lastIndexP = startIndexP + orderPerPage;
          const startIndexS = (currentShippedPage - 1) * orderPerPage;
          const lastIndexS = startIndexS + orderPerPage;
          const startIndexD = (currentDeliveredPage - 1) * orderPerPage;
          const lastIndexD = startIndexD + orderPerPage;
          setOrderPurchaseCart(data.slice(startIndex, lastIndex));
          setProcessing(processingStatus.slice(startIndexP, lastIndexP));
          setDelivered(deliveredStatus.slice(startIndexD, lastIndexD));
          setShipped(shippedStatus.slice(startIndexS, lastIndexS));
          setTotalPage(Math.ceil(data.length / orderPerPage));
          setTotalPageProcessing(
            Math.ceil(processingStatus.length / orderPerPage)
          );
          setTotalPageDelivered(
            Math.ceil(deliveredStatus.length / orderPerPage)
          );
          setTotalPageShipped(Math.ceil(shippedStatus.length / orderPerPage));
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [orderUpdate]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPage) {
      return;
    }
    setCurrentPage(page);
    setOderUpdate(!orderUpdate);
  };

  const handlePageChangeS = (page) => {
    if (page < 1 || page > totalPage) {
      return;
    }
    setCurrentShippedPage(page);
    setOderUpdate(!orderUpdate);
  };

  const handlePageChangeD = (page) => {
    if (page < 1 || page > totalPage) {
      return;
    }
    setCurrentDeliveredPage(page);
    setOderUpdate(!orderUpdate);
  };

  const handlePageChangeP = (page) => {
    if (page < 1 || page > totalPage) {
      return;
    }
    setCurrentProcessingPage(page);
    setOderUpdate(!orderUpdate);
  };

  const handleCheckOut = () => {
    setCheckOut(!checkOut);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const q = query(
            collection(db, "carts"),
            where("userId", "==", user?.uid)
          );
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            cartid: doc.id,
          }));
          const totalPayment = data.reduce(
            (a, { price, status }) => (status ? a + Number(price) : a),
            0
          );
          setTotalPayment(totalPayment);
          setPlaceOrder(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    console.log("yugfsdfui");
    fetchData();
  }, [checkOut]);

  const handleOrders = async (o, defaultAdress) => {
    const order = placeOrder.filter((p) => p.status === true);
    const userOrder = {
      order,
      method: o,
      orderCreatedAt: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      orderStatus: "Processing",
      totalPayment,
      orderqty: order.length,
      defaultAdress,
      userId: user?.uid,
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), userOrder);
    } catch (e) {
      console.log(e);
    }
    setOderUpdate(!orderUpdate);
  };

  const handleOrderOnline = (o, defaultAdress) => {
    const order = placeOrder.filter((p) => p.status === true);
    const userOrder = {
      order,
      method: o,
      orderCreatedAt: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      orderStatus: "Processing",
      totalPayment,
      orderqty: order.length,
      defaultAdress,
      userId: user.uid,
    };

    var options = {
      key: process.env.REACT_APP_ROZARPAY_KEY_ID,
      amount: parseInt(userOrder.totalPayment * 100),
      currency: "INR",
      order_receipt: `order_rcptid_${userOrder.defaultAdress.Fullname}`,
      name: "August",
      image:
        "https://august-mu.vercel.app/static/media/logo.e6d810c06552b94fc3e6.png",
      description: "for testing purpose",
      handler: async function (response) {
        console.log(response);
        const paymentId = response.razorpay_payment_id;
        toast("payment sucessfull", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        if (response) {
          setOderUpdate(!orderUpdate);
          window.location.href = "userprofile";
        }
        try {
          userOrder.paymentId = paymentId;
          const docRef = await addDoc(collection(db, "orders"), userOrder);
        } catch (e) {
          console.log(e);
        }
      },
      prefill: {
        name: userOrder.defaultAdress.Fullname,
        email: userOrder.defaultAdress.Email,
        contact: userOrder.defaultAdress.MobileNo,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#000",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  const handleDeleteCartShop = async () => {
    const result = orderCartDel.filter((d, i) => d.status === true);
    for (let i = 0; i < result.length; i++) {
      await deleteDoc(doc(db, "carts", result[i]?.cartid));
    }
  };
  return (
    <OrderContext.Provider
      value={{
        handlePageChangeS,
        handlePageChangeP,
        handlePageChangeD,
        currentProcessingPage,
        currentDeliveredPage,
        currentShippedPage,
        totalPageDelivered,
        totalPageProcessing,
        totalPageShipped,
        shipped,
        deliverd,
        totalPage,
        processing,
        currentPage,
        handlePageChange,
        placeOrder,
        orderPurchaseCart,
        setOrderCartDel,
        handleDeleteCartShop,
        handleCheckOut,
        totalPayment,
        handleOrders,
        handleOrderOnline,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
