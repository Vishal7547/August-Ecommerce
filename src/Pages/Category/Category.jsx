import React from "react";
import { useContext,useEffect,useState,useRef} from "react";
import { MdKeyboardArrowDown,MdKeyboardArrowUp } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import CategoryVideo from "../../Components/Product/CategoryVideo";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../Context/MyContext";
const Category = () => {
  const navigate = useNavigate();
  const [category,setCategory] = useState([]);
  const [filterCategory,setFilterCategory] = useState([]);
  const {product} = useContext(ProductContext);
  const { id } = useParams();
  console.log("id for category",id);
  useEffect(()=>{
    const data = product.filter((c)=>(
       c?.categoriesName?.id === id
    ))
    setCategory(data);
   },[id,product])

   const [rightFilterOpen, setRightFilterOpen] = useState(false);
   const [leftFilterOpen, setLeftFilterOpen] = useState(false);

   console.log(id);
   const rightFilterRef = useRef(null);
   const leftFilterRef = useRef(null);
   const [price, setPrice] = useState(200);

   const handlePriceChange = (event) => {
    const newPrice = Number(event.target.value);
    setPrice(newPrice);
  
    const filteredData = category?.filter((p) => Number(p?.price) <= newPrice);
    console.log(filteredData);
    // setCategory(filteredData);
    setFilterCategory(filteredData);
  };
  
  let minPrice = 0;
  let maxPrice = 40000;
  const handlePricemax=()=>{
   let max=0;
  let min=Math.min();
   for(let i=0;i<category.length;i++){
    if(Number(category[i]?.price)>max){
      max=category[i]?.price;
    }
      if(Number(category[i]?.price)<min){
        min=category[i]?.price;
        
      }
    
   }
   console.log("min/max",max,min);
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
     };
 
     document.addEventListener("click", handleClickOutside);
 
     return () => {
       document.removeEventListener("click", handleClickOutside);
     };
   }, [leftFilterRef, rightFilterOpen]);

  const handleHighToLow = ()=>{
    const sortedArray = category.sort((a, b) => b.price - a.price);
    setCategory(sortedArray);
  }

  const handleLowToHigh = ()=>{
    const sortedArray = category.sort((a, b) => a.price - b.price );
    setCategory(sortedArray);
  }

  const recomended = ()=>{
    const data = product.filter((c)=>(
      c?.categoriesName?.id === id
   ))
   setCategory(data);
  }

  return (

    <>
      <CategoryVideo />

      <div className="product mt-3">
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
            <div className="row Product mt-4">
  <div className="row">
    {(filterCategory.length > 0 ? filterCategory : category).map((d, i) => (
      <div
        className="col-sm-3 my-2"
        key={d.id}
        onClick={() => navigate(`/details/${d.id}`)}
      >
        <div className="similarImg">
          <img src={d.photo.url} alt={d.name} />
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
        </div>
      </div>
    </>
  );
};

export default Category;