import React,{useContext,useRef,useEffect,useState} from "react";
import { MdKeyboardArrowDown,MdKeyboardArrowUp } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import { useNavigate,useParams} from "react-router-dom";
import HomeBanner from "../../Components/Home/HomeBanner.jsx";
import { ProductContext } from "../../Context/MyContext.js";
import { Select } from "antd";
import { SlHeart } from "react-icons/sl";
const { Option } = Select;

const Product = () => {
  const navigate = useNavigate();
   const {product,filterCategory} = useContext(ProductContext);
   const recomendedp = product;
   const [catOpen, setCatOpen] = useState(false);
   const [fProduct,setFProduct] = useState([]);
   const [rightFilterOpen, setRightFilterOpen] = useState(false);
  const [leftFilterOpen, setLeftFilterOpen] = useState(false);
  const [categoriesName, setCategoriesName] = useState(null);
  console.log("product test",product);
  const { id } = useParams();
  console.log(id);
  const rightFilterRef = useRef(null);
  const leftFilterRef = useRef(null);
  const [price, setPrice] = useState(500);

   useEffect(()=>{
    setFProduct(product);
   },[product])

  const handlePriceChange = (event) => {
    const newPrice = Number(event.target.value);
    setPrice(newPrice);
  
    const filteredData = product.filter((p) => 
    {
      if(categoriesName){
       return p.price <= newPrice && 
       p?.categoriesName?.id === categoriesName.id
      }
      return p.price <= newPrice
    }
    
    );
    setFProduct(filteredData);
  };
  let minPrice = 0;
  let maxPrice = 0;
  const handlePricemax=()=>{
   let max=0;
  let min=Math.min();
   for(let i=0;i<product.length;i++){
    if(Number(product[i]?.price)>max){
      max=product[i]?.price;
    }
      if(Number(product[i]?.price)<min){
        min=product[i]?.price;
        
      }
    
   }
   minPrice = min;
   maxPrice = max;
  }
  handlePricemax();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        leftFilterRef.current &&
        !leftFilterRef.current.contains(event.target)
      ) {
        // Clicking inside the leftFilter, do nothing
        setLeftFilterOpen(false);
        return;
      }
      if (
        rightFilterRef.current &&
        !rightFilterRef.current.contains(event.target)
      ) {
        setRightFilterOpen(false);
        return;
      }
      // Clicking outside the leftFilter, close it
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [leftFilterRef, rightFilterOpen]);

  const handleHighToLow = () => {
    const sortedArray = [...fProduct].sort((a, b) => b.price - a.price);
    setFProduct(sortedArray);
  };
  
  const handleLowToHigh = () => {
    const sortedArray = [...fProduct].sort((a, b) => a.price - b.price);
    setFProduct(sortedArray);
  };
  

  const recomended = ()=>{
   setFProduct(recomendedp);
  }

  const handleCategoryFilter = (value)=>{
    const data = product.filter((p,i)=>(
    p?.categoriesName?.id === value.id
    && p.price <= price
    ))
    setFProduct(data);
    setCategoriesName(value);


  }

  return (
    <>
      <div className="product my-5">
        <div className="container-fluid">
          <div className="row">
<div className="filterRow d-flex justify-content-between align-items-center">
              <div
                className="leftFilter"
                onClick={() => setLeftFilterOpen(true)}
                ref={leftFilterRef}
              >
                <span>
                  <CiFilter />
                </span>
                <span> Show Filter</span>
                {leftFilterOpen && (
                  <div className="popupFilterFirst">
                    <div className="underpayment">
                      <div className="price-range-container row p-2">
                        <div className="row m-0 p-0">
                          <h6 className="m-0 p-0">Price</h6>
                        </div>
                        <div className="row">
                          <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            step="5"
                            value={price}
                            onChange={handlePriceChange}
                          />
                        </div>
                      </div>
                      <div className="price-display">
                        <span className="min-price">₹{minPrice}</span>
                        <span className="max-price">₹{price}</span>

                      </div>
                     <div className="row">
                     <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  handleCategoryFilter(JSON.parse(value));
                }}
              >
             {filterCategory?.map((c) => (
  <Option className="categorydropdown" key={c.id} value={JSON.stringify(c)}>
    {c.category}
  </Option>
))}
              </Select>
                     </div>

                    </div>
                  </div>
                )}
              </div>
              <div
                className="rightFilter"
                onClick={() => setRightFilterOpen(!rightFilterOpen)}
                ref={rightFilterRef}
              >
                <span>Sort By </span>
                <span>
                  Recommended{" "}
                  {!rightFilterOpen ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowUp />
                  )}
                </span>
                {rightFilterOpen && (
                  <div className="popupFilter">
                    <div className="underpayment">
                      <p onClick={recomended}>Recommended</p>
                      <p onClick={handleHighToLow}>Price: High to Low</p>
                      <p onClick={handleLowToHigh}>Price: Low to High</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="row m-auto mt-4 ">
              {/* <div className="w100Set ">
                <div className="left" style={{ display: "none" }}>
                  hello
                </div>
                <div className="right" style={{ left: "0" }}>
                  <div className="r">
                    <div className="row">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4].map((d, i) => (
                        <div
                          className="col-sm-3 my-2"
                          key={i}
                          onClick={() => navigate(`/details/${i}`)}
                        >
                          <div className="similarImg">
                            <img
                              src="https://img101.urbanic.com/v1/goods-pic/366dd2ea9e73474bae9a0e06da7410bbUR_w1440_q90.webp"
                              alt=""
                            />
                          </div>
                          <div className="productNameOfDetails my-2">
                            <p>Bodycon Dresses</p>
                            <p>₹3,690</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div> */}
                                  <div className="row m-auto">
                      {fProduct.map((d, i) => (
                        <div
                          className="col-sm-3 my-2 productoutcls"
                          key={d.id}
                          onClick={() => navigate(`/details/${d.id}`)}
                        >
                          <div className="similarImg text-center">
                            <img className="m-auto"
                              src={d.photo.url}
                              alt={d.name}
                            />
                          </div>
                          <div className="productNameOfDetails my-2">
                            <p>{d.name}</p>
                            <p>{d.price}</p>
                          </div>
                          <div className="fav-icon">
                            <SlHeart fontSize={20} />
                          </div>
                        </div>
                      ))}
                    </div>
            </div>
          </div>
        </div>
 
      </div>
      <HomeBanner/>
    </>
  );
};

export default Product;