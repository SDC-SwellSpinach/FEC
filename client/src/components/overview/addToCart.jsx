import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import Select from 'react-select';
import { addToCart } from '../../slices/productSlice';

const AddToCart = () => {
  const product = useSelector((state) => state.product);
  const {currentStyle} = product;

  const dispatch = useDispatch();

  const [availableSizes, setAvailableSizes] = useState({});
  const [selectedSku, setSelectedSku] = useState({});
  const [selectedOrder, setSelectedOrder] = useState({
    size: '',
    quantity: 1
  });
  const [message, setMessage] = useState('');
  const [openMenu, setOpenMenu] = useState(false);

  const onClickSize = (option) => {
    const size = option.label;
    let quantity = currentStyle.skus[Number(option.value)].quantity > 15 ? 15 : currentStyle.skus[Number(option.value)].quantity
    setSelectedSku({sku: option.value, size: size, quantity: quantity});
    setSelectedOrder((prevState) => ({...prevState, size: size}));
    setMessage("");
    setOpenMenu(false);
  }

  const onClickQuantity = (option) => {
    let quantity = option.value;
    setSelectedOrder((prevState) => ({...prevState, quantity: quantity}));
  }

  const onClickAddToBag = (e) => {
    e.preventDefault();
    if (!selectedSku.size) { // no size has been selected
      setMessage("Please select a size before adding to bag.");
      setOpenMenu(true);
    } else {
      dispatch(addToCart({sku_id: Number(selectedSku.sku)}));
    }
  }

  useEffect(() => {
    // if product id or the current style has changed, reset the available sizes
    setSelectedSku({});
    // if there is a current style in state, add all available sizes and quantities to available sizes
    if (currentStyle.style_id) {
      let newSizes = {};
      Object.keys(currentStyle.skus).map((sku) => {
        newSizes[Number(sku)] = currentStyle.skus[sku].size
      })
      setAvailableSizes(newSizes);
    }

  }, [product.id, currentStyle]);

  return (
    <div>
       <div className="addToCart">
        {Object.keys(currentStyle).length && Object.keys(availableSizes).length && currentStyle.skus[Object.keys(availableSizes)[0]]?
          <div className="block">
            {message.length ? <h4>{message}</h4> : null}
            <div className="inlineBlock">
              <Select
                className="sizeSelectors"
                placeholder="Select Size"
                menuIsOpen={openMenu}
                options={Object.keys(availableSizes).map((sku) => ({value: sku, label: currentStyle.skus[sku].size}))}
                getOptionLabel={option => option.label}
                getOptionValue={option => option.value}
                onChange={option => onClickSize(option)}
                onFocus={() => setOpenMenu(true)}
                onBlur={() => setOpenMenu(false)}
                />
            </div>
            <div className="inlineBlock">
              <Select
                className="sizeSelectors"
                inputId="quantity"
                defaultValue={{value:1, label:1}}
                options={selectedSku.quantity ?
                [...Array(selectedSku.quantity + 1).keys()].slice(1).map((value) => ({label: value, value: value}))
                : [{value:1, label:1}]}
                getOptionValue={option => option.value}
                onChange={option => onClickQuantity(option)}/>
            </div>
            <button className="addToBagButton" onClick={onClickAddToBag} >
              <p>ADD TO BAG</p>
              <FaPlus />
            </button>
          </div>
        :
        <Select className="sizeSelectors" placeholder="OUT OF STOCK" />
        // <select className="sizeSelectors">
        //   <option value="OUT OF STOCK">OUT OF STOCK</option>
        // </select>
        }
      </div>
    </div>
  )
}

//  && currentStyle.skus[Object.keys(availableSizes)[0]]
{/* <select className="sizeSelectors" onChange={onClickSize}>
  <option value="SELECT SIZE">SELECT SIZE</option>
  {Object.keys(availableSizes).map((sku, index) =>
    <option value={sku} key={index}>{currentStyle.skus[sku].size}</option>
  )}
</select> */}
{/* <select className="sizeSelectors" id="quantity" onChange={onClickQuantity}>
  {selectedSku.quantity ?
    [...Array(selectedSku.quantity + 1).keys()].slice(1).map((value) =>
      <option value={value} key={value}>{value}</option>
    )
  : <option value="1">1</option>
  }
</select> */}
// options={[{value: "OUT OF STOCK", label: "OUT OF STOCK"}]}
export default AddToCart;