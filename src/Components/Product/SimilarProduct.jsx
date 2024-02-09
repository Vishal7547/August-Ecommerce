import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext,useEffect,useState} from "react";
import { ProductContext } from "../../Context/MyContext";
const SimilarProduct = ({id:catId}) => {
  console.log("id for category for checkout",catId );
  const navigate = useNavigate();
  const { id } = useParams();
  const [similarProduct,setSimilarProduct] = useState([]);
  console.log(id);
  const handleNavigate = (i) => {
    navigate(`/details/${i}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const {product} = useContext(ProductContext);
  useEffect(()=>{
   const data = product.filter((c)=>(
      c?.categoriesName?.id === catId
   ))
   console.log("data of similar",data);
   setSimilarProduct(data);
  },[catId])


  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="row productHeading">
          <h1>You might also like</h1>
        </div>
        <div className="row">
          {similarProduct.map((d, i) => (
            <div
              className="col-sm-3 my-2"
              key={d.id}
              onClick={() => handleNavigate(d.id)}
            >
          <div className="similarImg">
                <img
                  src={d.photo.url}
                  alt={d.name}
                />
              </div>
              <div className="productNameOfDetails my-2">
                <p>{d.name}</p>
                <p>₹{d.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProduct;