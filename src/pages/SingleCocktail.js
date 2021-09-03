import React, { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const [loading, setLoading] = useState(true);
  const [cocktail, setCocktail] = useState({});
  const { id } = useParams();
  const cocktailDetail = useCallback(async () => {
    setLoading(true);
    console.log("@@")
    try {
      const getdata = await fetch(`${url}${id}`);
      const { drinks } = await getdata.json();
      if(drinks){
        const {
          idDrink: ID,
          strDrink: drink,
          strCategory: category,
          strAlcoholic: holic,
          strDrinkThumb:img,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = drinks[0];
        const ingredient = [strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,]
          const newList = {ID,img,drink,category,holic,ingredient};
          setCocktail(newList)
      }else{
        setCocktail(null)
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  },[id]);
  useEffect(() => {
    cocktailDetail();
  }, [id,cocktailDetail]);
  if(loading){
      return <Loading />
  }
  if(!cocktail ){
    return <h2 className="section-title">no COcktail</h2>
  }
  const {ID,drink,category,img,holic,ingredient}=cocktail;
  return (
    <section className="section cocktail-section">
      <Link className="btn btn-primary" to="/" >back home</Link>
      <h2 className="section-title">{drink}</h2>
      <div className="drink">
        <img src={img} alt={drink} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>{ID}
          </p>
          <p>
            <span className="drink-data">holic:</span>{holic}
          </p>
          <p>
            <span className="drink-data">category:</span>{category}
          </p>
          <p>
            <span className="drink-data">ingredient:</span>
            {ingredient && ingredient.map((item,index)=>{
              return item?<span key={index}>{index+1}. {item}</span>:null
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
