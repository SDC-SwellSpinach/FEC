//call to the getinitial data function to check the correct data is being retrieved with a given id
//check if the initial state is updated
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
// import Reviews from '../client/src/components/ratings/index.jsx';
import {RatingBreakdown} from '../client/src/components/ratings/rating_components/rating_breakdown.jsx';
// import {Stars} from '../client/src/components/ratings/rating_components/stars.jsx';
// const Reviews = require('../client/src/components/ratings/index.jsx');
import { useSelector, useDispatch, Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';

describe('summation test test', () => {
  test('adds 1 + 1 to equal 2', () => {
    expect((() => 1+1)()).toBe(2);
  });
})


describe('RatingBreakdown component', () => {
  const props = {
    ratings: {
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      5: 6,
    }
  };

  let store;
  beforeEach(() => {
    const mockStore = configureStore();
    store = mockStore({
      reviews: {
        allReviews: []
      }

    })
  })

  it('should render a populated div', () => {
    const { getByTestId } = render(
      <Provider store = {store}>
        <RatingBreakdown {...props}/>
      </Provider>)
    ;
    const divElement = getByTestId('rating-breakdown-div');
    expect(divElement).toBeInTheDocument();
  });
});