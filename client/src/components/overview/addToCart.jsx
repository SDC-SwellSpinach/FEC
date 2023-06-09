import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import Select from 'react-select';
import { addToCart, resetMessages } from '../../slices/productSlice';
import { FaTwitterSquare, FaFacebookSquare, FaPinterestSquare } from 'react-icons/fa';

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
  const [messageTimer, setMessageTimer] = useState('');

  const onClickSize = (option) => {
    const size = option.label;
    let quantity = currentStyle.skus[Number(option.value)].quantity > 15 ? 15 : currentStyle.skus[Number(option.value)].quantity;
    // console.log({sku: option.value,quantity: quantity}, selectedOrder, size)
    dispatch(resetMessages());
    setSelectedSku({sku: option.value, quantity: quantity});
    setSelectedOrder((prevState) => ({...prevState, size: size}));
    setMessage("");
    setOpenMenu(false);
  }

  const onClickQuantity = (option) => {
    let quantity = option.value;
    dispatch(resetMessages());
    setSelectedOrder((prevState) => ({...prevState, quantity: quantity}));
  }

  const onClickAddToBag = (e) => {
    e.preventDefault();
    // console.log(selectedOrder);

    if (!selectedOrder.size.length) { // no size has been selected
      setMessage("Please select a size before adding to bag.");
      setOpenMenu(true);
    } else {
      dispatch(addToCart({sku_id: Number(selectedSku.sku)}))
    }
    if (messageTimer) {
      clearTimeout(messageTimer)
    }
    let timer = setTimeout(() => {dispatch(resetMessages())}, 6000);
    setMessageTimer(timer);
  }

  useEffect(() => {
    // if product id or the current style has changed, reset the available sizes
    setSelectedSku({});
    dispatch(resetMessages());
    if (!product.successMessage) {
      setSelectedOrder({size:'', quantity: 1});
    }

    // if there is a current style in state, add all available sizes and quantities to available sizes
    if (currentStyle.style_id) {
      let newSizes = {};
      Object.keys(currentStyle.skus).map((sku) => {
        if (!Object.values(newSizes).includes(currentStyle.skus[sku].size)) {
          newSizes[Number(sku)] = currentStyle.skus[sku].size;
        }
      })
      setAvailableSizes(newSizes);
    }

  }, [product.id, currentStyle]);
// product.successMessage
  // console.log("selectedSku", selectedSku, "selectedOrder", selectedOrder)
  return (
    <div>
       <div className="addToCart">
        {Object.keys(currentStyle).length && Object.keys(availableSizes).length && currentStyle.skus[Object.keys(availableSizes)[0]]?
          <div className="block">
            {message.length ? <h4>{message}</h4> : null}
            <div className="inlineBlock">
              <Select
                styles={{control: (baseStyles) => ({...baseStyles, border: "0.1vh pink solid", cursor: "pointer"})}}
                className="sizeSelectors"
                placeholder="Select Size"
                data-testid="select-size"
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
                styles={{control: (baseStyles) => ({...baseStyles, border: "0.1vh pink solid", cursor: "pointer"})}}
                className="sizeSelectors"
                inputId="quantity"
                defaultValue={{value:1, label:1}}
                options={selectedSku.quantity ?
                [...Array(selectedSku.quantity + 1).keys()].slice(1).map((value) => ({label: value, value: value}))
                : [{value:1, label:1}]}
                getOptionValue={option => option.value}
                onChange={option => onClickQuantity(option)}/>
            </div>
            <div>
              <button className="addToBagButton inlineBlock" onClick={onClickAddToBag} >
                <p style={{fontSize: "16px"}}>Add to bag</p>
                <FaPlus className="plusIcon"/>
              </button>
              {product.successMessage.length ? <div><p className="inlineBlock">{product.successMessage} Added {selectedOrder.quantity} of {currentStyle.name} in size {selectedOrder.size}</p> </div>: null}
            </div>
            <div style={{display: "flex"}}>
              <a href="https://twitter.com/intent/tweet?text=Checkout%20this%20cute%20item!">
                <FaTwitterSquare className="inlineBlock shareIcons" target="_blank" rel="noreferrer noopener"/>
              </a>
              <div data-href="https://localhost:3000" data-layout="button_count" data-size="small"><a target="_blank" rel="noreferrer noopener" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flocalhost%3A3000%2F&amp;src=sdkpreparse"><FaFacebookSquare className="inlineBlock shareIcons"/></a></div>
              <FaPinterestSquare className="inlineBlock shareIcons"/>
            </div>
          </div>
        :
          <Select className="sizeSelectors"  styles={{control: (baseStyles) => ({...baseStyles, border: "0.1vh pink solid", cursor: "pointer"})}} placeholder="OUT OF STOCK" />
        }
      </div>
    </div>
  )
}

export default AddToCart;