import React, { useState } from "react";
import { RiAddBoxFill } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import Checkout from "../../Components/Checkout/Checkout";
import BasicModal from "../../Components/Product/BasicModal";
import SimilarProduct from "../../Components/Product/SimilarProduct";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import "../../Style/Cart.css";
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
const Wishlist = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="bag">
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
                      <span>My Bag (7)</span>
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
              <div className="row mx-2">
                {[1, 2, 3, 4, 5].map((d, i) => (
                  <div
                    className="col-sm-4 my-2"
                    key={i}
                    onClick={() => navigate(i)}
                  >
                    <div className="similarImg similarTag">
                      <img
                        src="https://img101.urbanic.com/v1/goods-pic/366dd2ea9e73474bae9a0e06da7410bbUR_w1440_q90.webp"
                        alt=""
                      />
                      <div className="crossIcon">
                        <span>
                          <RxCross1 fontSize={25} />
                        </span>
                      </div>
                    </div>
                    <div className="productNameOfDetails my-2">
                      <p>Bodycon Dresses</p>
                      <p>₹3,690</p>
                      <p onClick={handleOpen}>
                        <span>
                          <RiAddBoxFill fontSize={30} />
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-5">
              <Checkout />
            </div>
          </div>
          <div className="row">
            <SimilarProduct />
          </div>
        </div>
      </div>
      <BasicModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleOpen={handleClose}
        style={style}
      />
    </>
  );
};

export default Wishlist;