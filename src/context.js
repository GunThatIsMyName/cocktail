import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading,setLoaindg]=useState(true);
  const [cocktails,setCocktails]=useState([]);
  const [search,setSearch]=useState('a')

  const getCocktails = useCallback(async()=>{
    setLoaindg(true)
    console.log("con")
    try {
      const getData = await fetch(`${url}${search}`)
      const {drinks} = await getData.json()
      if(drinks){
        const newList = drinks.map((item)=>{
          const {idDrink:id,strDrink:info,strDrinkThumb:img,strGlass:glass,strAlcoholic:holic}=item;
          return{id,info,img,glass,holic}
        })
        setCocktails(newList)
      }else{
        setCocktails([])
      }
    } catch (error) {
        console.log(error)
    }finally{
      setLoaindg(false)
    }
  },[search]);
  useEffect(()=>{
    getCocktails()
  },[search,getCocktails])
  return <AppContext.Provider value={{loading,cocktails,search,setSearch}}>
    {children}
    </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
