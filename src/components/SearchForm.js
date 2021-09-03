import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setSearch}=useGlobalContext()
  const searchValue = useRef('')
  const handleSubmit = (e)=>{
    e.preventDefault()
    setSearch(searchValue.current.value)
    searchValue.current.value =""
  }
  useEffect(()=>{
    searchValue.current.focus();
  },[])
  return (
    <section className="section search">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-control">
          <label htmlFor="name">search your cocktails</label>
          <input type="text" id="name" ref={searchValue}/>
        </div>
      </form>
    </section>
  )
}

export default SearchForm
