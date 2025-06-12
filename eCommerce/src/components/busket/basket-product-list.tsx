import { ReactElement } from 'react';
// import mainLightingImg from '../../assets/img/main-lighting.jpg'

export const BasketProductListComponent = (): ReactElement => {
  return (
    <div className="basket-product-list__wrapper">
      {/* main product list */}
      <h2 className="busket-product-list-title">
        Your cart is empty. <br />
        Start shopping to add items!
      </h2>
      <ul className="buscket-product-list">
        {/*
                        busket item structure 
                                            <li className="buscket-product-item">
                  
                        <div className="item-product__wrapper">
    
                            <div className='item-produc-info'>
                                <div className="itme-img__wrapper">
                                    <img className='img' src={mainLightingImg} alt="product-photo" />
                                </div>
                                <div className="item-title__wrapper">
                                    <h2 className="itme-title">product</h2>
                                </div>
                            </div>
    
                            <div className='item-product__delete-btn'>
                                <h2 className='item-product-delete-btn-title'>Delete</h2>
                            </div>
    
                        </div>
    
                  
                        <h2 className="price-title">0.00</h2>
    
                        <div className="item-quantity__wrapper">
                            <div className="itme-quantity-btn__reduce">
                                <h2 className="reduce"> - </h2>
                            </div>
                            <div className="itme-quantity__display">
                                <h2 className="reduce"> 0 </h2>
                            </div>
                            <div className="itme-quantity-btn__increase">
                                <h2 className="increase"> + </h2>
                            </div>
                        </div>
    
                   
                        <div className="item-totla-price__wrapper">
                            <h2 className="item-totla-price">0.00</h2>
                        </div>
                    </li>
                    */}
      </ul>

      <div className="basket-delete-items-btn">
        <h2 className="basket-delete-items-btn-title">Delete all items</h2>
      </div>
    </div>
  );
};
