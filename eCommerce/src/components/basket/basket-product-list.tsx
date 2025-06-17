import { ReactElement, useEffect, useState } from 'react';
import { getCurrentLineItems } from './core/get-item-list';
import { ProductProjection } from '../../api/productsType';

export const BasketProductListComponent = (): ReactElement => {
  const [lineItems, setLineItems] = useState<ProductProjection[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const currLineItem = await getCurrentLineItems();
      if (currLineItem) {
        console.log(currLineItem);
        setLineItems(currLineItem);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="basket-product-list__wrapper">
      {/* main product list */}
      {lineItems === undefined || lineItems.length === 0 ? (
        <h2 className="busket-product-list-title">
          Your cart is empty. <br />
          Start shopping to add items!
        </h2>
      ) : (
        <ul className="buscket-product-list">
          {lineItems.map((itemObj, index) => {
            return (
              <li className="buscket-product-item" key={index}>
                <div className="item-product__wrapper">
                  <div className="item-produc-info">
                    <div className="itme-img__wrapper">
                      <img
                        className="img"
                        src={itemObj.variant?.images?.[0]?.url ?? ''}
                        alt="product-photo"
                      />
                    </div>
                    <div className="item-title__wrapper">
                      <h2 className="itme-title">{itemObj.name.en}</h2>
                    </div>
                  </div>

                  <div className="item-product__delete-btn">
                    <h2 className="item-product-delete-btn-title">Delete</h2>
                  </div>
                </div>

                <h2 className="price-title">
                  {' '}
                  {itemObj.price?.value.centAmount
                    ? (itemObj.price?.value.centAmount / 100).toFixed(2)
                    : 'there is no any price'}
                </h2>

                <div className="item-quantity__wrapper">
                  <div className="itme-quantity-btn__reduce">
                    <h2 className="reduce"> - </h2>
                  </div>
                  <div className="itme-quantity__display">
                    <h2 className="reduce">{itemObj.quantity}</h2>
                  </div>
                  <div className="itme-quantity-btn__increase">
                    <h2 className="increase"> + </h2>
                  </div>
                </div>

                <div className="item-totla-price__wrapper">
                  <h2 className="item-totla-price">
                    {' '}
                    {itemObj.totalPrice?.centAmount
                      ? (itemObj.totalPrice?.centAmount / 100).toFixed(2)
                      : 'there is no any price'}
                  </h2>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="basket-delete-items-btn">
        <h2 className="basket-delete-items-btn-title">Delete all items</h2>
      </div>
    </div>
  );
};
/*

   <li className="buscket-product-item">
            <div className="item-product__wrapper">
              <div className="item-produc-info">
                <div className="itme-img__wrapper">
                  <img
                    className="img"
                    src=''
                    alt="product-photo"
                  />
                </div>
                <div className="item-title__wrapper">
                  <h2 className="itme-title">product</h2>
                </div>
              </div>

              <div className="item-product__delete-btn">
                <h2 className="item-product-delete-btn-title">Delete</h2>
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
*/
