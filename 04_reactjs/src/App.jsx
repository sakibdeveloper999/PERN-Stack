import React from 'react'
import Car from './components/Car'
import { useState } from 'react'
import { useEffect } from 'react';

const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch cars from the backend API
    fetch('api/v1/cars/')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));
      console.log(cars);
  }, [])
  
  return (
    <div>
      <h1>Welcome to the Car Store</h1>
      <ul>
        <Car/>
        <Car/>
      </ul>
    </div>
  )
}

export default App