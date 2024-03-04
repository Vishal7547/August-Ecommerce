import React, { useState, useEffect } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { PiKeyReturnBold } from "react-icons/pi";
import { useContext } from "react";
import { OrderContext, UserContext } from "../../Context/MyContext";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { Radio } from "antd";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  const [defaultAdress, setDefaultAddress] = useState(null);
  const {
    placeOrder,
    totalPayment,
    handleOrders,
    handleOrderOnline,
    handleDeleteCartShop,
  } = useContext(OrderContext);
  const { User, setheading } = useContext(UserContext);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const navigate = useNavigate();
  const datacheck = "";
  console.log("useradress", User.defaultAdress);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    // if(User.defaultAdress){
    // }
    setDefaultAddress(User?.defaultaddress);
    // console.log("userdefaultadress",User.defaultaddress);
  }, [User]);

  const handlePlaceOrder = async () => {
    setheading("All");
    if (paymentMethod === "cod") {
      await handleOrders(paymentMethod, defaultAdress);
      navigate("/userprofile");
    } else {
      await handleOrderOnline(paymentMethod, defaultAdress);
    }
    handleDeleteCartShop();
  };

  return (
    <div className="paymentCheckout">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7">
            <div className="row addressCheckoutTime">
              <div className="d-flex justify-content-between align-items-center">
                {window.localStorage.getItem("Ad") ? (
                  <div className="div">
                    <h6>
                      <span>{defaultAdress?.Address}, </span>
                      <span>{defaultAdress?.Locality} </span>
                      <span>{defaultAdress?.City} , </span>
                      <span>{defaultAdress?.State} , </span>
                      <span>{defaultAdress?.Pincode} </span>
                    </h6>
                  </div>
                ) : (
                  <button
                    className="btn btn-dark"
                    onClick={() => navigate("/userprofile")}
                  >
                    ADD ADDRESS
                  </button>
                )}

                <div className="div">
                  <span>
                    <HiOutlineChevronRight />
                  </span>
                </div>
              </div>

              <p>
                <span>{defaultAdress?.Fullname} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{defaultAdress?.MobileNo}</span>
              </p>
            </div>
            <div className="deliveryDate row">
              <p>Standard Delivery</p>
              <p>Delivery by Thu, 25 Jan - Mon, 29 Jan</p>
            </div>

            <div className="row mt-4">
              {placeOrder?.map(
                (x, i) =>
                  x?.status && (
                    <div className="cartShow " key={i}>
                      <div className="cartImage px-2 checkoutImag">
                        <img
                          src={x?.photo?.url}
                          alt={x?.name}
                          className="bg-dark"
                        />
                      </div>
                      <div className="hearIcon"></div>
                      <div className="CartSize">
                        <div className="row ">
                          <div className="cartPrice">
                            <div className="cartProductName">
                              <p>{x?.name}</p>
                              <p>
                                <b>{x?.size}</b>
                              </p>
                            </div>
                            <div className="">₹{x?.price}</div>
                            <div className="cartInc ">
                              <div className="text-center numberCart noneInitially">
                                <span>{x?.qty}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>

            <div className="row">
              <Radio.Group onChange={onChange} value={paymentMethod}>
                <Radio value="cod">cash on delivery</Radio>
                <Radio value="online">online</Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="col-md-5 ">
            <div className="px-3">
              <div className="row CheckoutHeading">
                <h5>Price Details 3(items)</h5>
                <div className="row">
                  <div className=" d-flex justify-content-between align-items-center">
                    <div>
                      <span>Total MRP</span>
                    </div>
                    <div>
                      <span>{totalPayment}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className=" d-flex justify-content-between align-items-center">
                    <div>
                      <span>Discount on MRP:</span>
                    </div>
                    <div>
                      <span>-₹50</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className=" d-flex justify-content-between align-items-center">
                    <div>
                      <span>Shipping charges: ₹0</span>
                    </div>
                    <div>
                      <span>Free</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className=" d-flex justify-content-between align-items-center">
                    <div>
                      <span>Total Amount:</span>
                    </div>
                    <div>
                      <span>₹{totalPayment - 50}</span>
                    </div>
                  </div>
                </div>
                <div className="row m-auto py-4">
                  <button
                    className="btn btn-dark"
                    // disabled={!window.localStorage.getItem("Ad")}
                    onClick={() => {
                      if (!window.localStorage.getItem("Ad")) {
                        return toast.error("Add Address!");
                      } else {
                        handlePlaceOrder();
                      }
                    }}
                  >
                    PLACE ORDER(
                    {placeOrder.filter((p) => p.status === true).length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
