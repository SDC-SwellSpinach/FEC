import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { comparisonSlice } from '../../slices/comparisonSlice';
import { saveOutfits } from './outfitStorage.js';
import {Stars} from '../ratings/rating_components/stars.jsx';

const Outfit = ({ outfit, index }) => {
  const dispatch = useDispatch();
  let comparisonState = useSelector((state) => state.relatedItems)

  const handleXclick = (index) => {
    const updatedOutfits = [...comparisonState.outfits];
    updatedOutfits.splice(index, 1); // Remove the element at the specified index
    saveOutfits(updatedOutfits);
    dispatch(comparisonSlice.actions.removeOutfit(outfit.id)); //removes from state
  };

  if (outfit.productStyles && outfit.outfitRatings) {
    const one = Number(outfit.outfitRatings[1]);
    const two = Number(outfit.outfitRatings[2]);
    const three = Number(outfit.outfitRatings[3]);
    const four = Number(outfit.outfitRatings[4]);
    const five = Number(outfit.outfitRatings[5]);
    const numerator = 1 * one + 2 * two + 3 * three + 4 * four + 5 * five;
    const denominator = one + two + three + four + five;

    const average = numerator / denominator;
    const fixedAvg = average.toFixed(2);

    return (
      <div className="individualCard">
        <i className="fa-sharp fa-solid fa-x" onClick={() => handleXclick(index)} data-testid="x-button" ></i>
        <div className="imageContainer">
          <img
            className="outfitImage"
            src={outfit.productStyles[0].photos[0].url || "https://images.pexels.com/photos/249210/pexels-photo-249210.jpeg?cs=srgb&dl=pexels-nitin-dhumal-249210.jpg&fm=jpg"}
            alt="Product Image"
          />
        </div>
        <div className='cardCategory'>{outfit.category}</div>
        <div className='cardName'>
          <strong>{outfit.name}</strong>
        </div>
        <div>
        {outfit.productStyles.some((style) => style.sale_price !== null) ? (
          <div>
            <del>${outfit.default_price}</del>{" "}
            <span style={{ color: "#FF6961" }}>
              ${outfit.productStyles.find((style) => style.sale_price !== null).sale_price}
            </span>
          </div>
        ) : (
          <div>${outfit.default_price}</div>
        )}
        </div>
        <div className='cardStars'><Stars rating={fixedAvg}/></div>
      </div>
    )
  } else {
    return (<div></div>)
  }

}

export default Outfit;