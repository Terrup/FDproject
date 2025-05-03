import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)

  // Fallback: loading or empty state
  if (!Array.isArray(food_list)) {
    return <p style={{ textAlign: 'center' }}>Loading food menu...</p>
  }

  return (
    <div className='food-display' id='food-display'>
      <h2 className='h2we'>Full Menu</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            )
          } else {
            return null
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
