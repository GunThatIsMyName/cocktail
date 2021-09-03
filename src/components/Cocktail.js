import React from 'react'
import { Link } from 'react-router-dom'

const Cocktail = ({id,info,img,glass,holic}) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={img} alt={holic} />
      </div>
      <div className="cocktail-footer">
        <h3>{holic}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details" >DETAIL</Link>
      </div>
    </article>
  )
}

export default Cocktail
