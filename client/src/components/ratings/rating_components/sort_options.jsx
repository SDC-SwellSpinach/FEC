import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getReviews, getMetaData, reducers} from '../../../slices/reviewSlice.jsx'

export const SortOptions = () => {
  const [search, setSearch] = useState('');
<<<<<<< HEAD
<<<<<<< HEAD
  const reviews = useSelector(state => state.reviews);
  // console.log('search====', reviews)
=======
=======
>>>>>>> 1f0e03f8141c7bf06bfde98d87f4ce8a454e5fd7
  const reviews = useSelector(state => state.reviews.allReviews);
  const dispatch = useDispatch();



  var subHandler = (e) => {
    event.preventDefault();
    //line 15 creates a filtered set of reviews based on the search input
    var filteredReviews = reviews.filter((rev) => {
      return rev.summary.includes(search) || rev.body.includes(search);
    })

    dispatch(reducers.updateReviews(filteredReviews));
  }

  var handleSort = (e) => {
    console.log(e.target.value)
    dispatch(reducers.updateSort(e.target.value));
<<<<<<< HEAD
>>>>>>> be60cb0d40ae1f37eef44b06a7d302ab5dc11f4f
=======
>>>>>>> 1f0e03f8141c7bf06bfde98d87f4ce8a454e5fd7

  }

  return (
    <div>
      <form onSubmit = {subHandler}>
        <input placeholder = 'Keyword' onChange = {(e) =>{setSearch(e.target.value)}}></input>
        <button>Search</button>
      </form>
      <label >Sorted by:</label>
      <select id="sort" name="sort" onChange = {handleSort}>
        <option value = 'newest'>Newest</option>
        <option value = 'helpful'>Helpful</option>
        <option value = 'relevant'>Relevant</option>
      </select>

    </div>
  )
}