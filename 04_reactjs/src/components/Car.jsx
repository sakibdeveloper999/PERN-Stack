import React from 'react'

const Car = ({ make, model, year, color ,price }) => {
  return (
    <li>
        <p>Make: {make}</p>
        <p>Model: {model}</p>
        <p>Year: {year}</p>
        <p>Color: {color}</p>
        <p>Price: ${price}</p>
    </li>
  )
}

export default Car