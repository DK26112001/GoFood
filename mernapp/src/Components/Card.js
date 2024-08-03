import React, { useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let cart = useCart(); // Move useCart to the top level
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  const handleAddToCart = async () => {
    await dispatch({
      type: 'ADD',
      id: props.item._id,
      name: props.item.name,
      price: props.finalPrice,
      qty: parseInt(qty, 10),
      size: size,
      img: props.item.img
    });
    console.log(cart); // Log the cart data here if needed
  };

  console.log(props.item)

  const calculateTotalPrice = () => {
    if(size==="full"){
      return (props.finalPrice * qty * 2).toFixed(2);
    }
    else if(size=="medium"){
      return (props.finalPrice * qty * 1.5).toFixed(2);
    }
    else if(size=="large"){
      return (props.finalPrice * qty * 2).toFixed(2);
    }
    return (props.finalPrice * qty).toFixed(2);
  };

  return (
    <div>
      <div className="card" style={{ width: '18rem' }}>
        <img src={props.item.img} className="card-img-top" style={{ height: '14rem' }} alt={props.item.name} />
        <div className="card-body">
          <h5 className="card-title">{props.item.name}</h5> {/* Display item name */}
          <div className='container w-100'>
            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(parseInt(e.target.value, 10))}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setSize(e.target.value)}>
              {props.item.CategoryName === 'Pizza' ? (
                <>
                  <option value="regular">Regular</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </>
              ) : (
                <>
                  <option value="half">Half</option>
                  <option value="full">Full</option>
                </>
              )}
            </select>
            <div className='d-inline'>
              ${calculateTotalPrice()}/-
            </div>
          </div>
          <hr />
          <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
