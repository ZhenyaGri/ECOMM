import { ReactElement } from 'react';
import { ProductProjection } from '../../api/productsType';
import {
  decrease,
  getTotalItemPrice,
  increase,
  setStartPrice,
} from './core/calc';
import { cartQuantityUpdate, clearItemLine, removeItem } from './core/api';
import { Link } from 'react-router-dom';

type Props = {
  lineItems: ProductProjection[] | undefined;
  setLineItems: React.Dispatch<
    React.SetStateAction<ProductProjection[] | undefined>
  >;
};

export const BasketProductListComponent = ({
  lineItems,
  setLineItems,
}: Props): ReactElement => {
  return (
    <div className="basket-product-list__wrapper">
      {/* main product list */}
      {lineItems === undefined || lineItems.length === 0 ? (
        <Link to="/catalog" className="basket-link">
          <h2 className="busket-product-list-title">
            Your cart is empty. <br />
            Start shopping to add items!
          </h2>
        </Link>
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

                  <div
                    className="item-product__delete-btn"
                    onClick={async () => {
                      const getRemovedItem = lineItems[index];
                      if (getRemovedItem) {
                        try {
                          if (getRemovedItem.quantity) {
                            setTimeout(() => {
                              removeItem(
                                getRemovedItem.id,
                                getRemovedItem.quantity
                              );
                            }, 0);
                          }

                          const newLineItemsArr = [...lineItems];
                          newLineItemsArr.splice(index, 1);
                          setTimeout(() => {
                            setLineItems(newLineItemsArr);
                          }, 200);
                        } catch {
                          console.error('data hasnt been sent');
                        }
                      }
                    }}
                  >
                    <h2 className="item-product-delete-btn-title">Delete</h2>
                  </div>
                </div>

                <h2 className="price-title">{setStartPrice(itemObj)}</h2>

                <div className="item-quantity__wrapper">
                  <div
                    className="itme-quantity-btn__reduce"
                    onClick={async () => {
                      const newLineArr = decrease(lineItems, index);
                      setLineItems(newLineArr);
                      if (itemObj.quantity) {
                        await cartQuantityUpdate(itemObj.id, itemObj.quantity);
                      }
                    }}
                  >
                    <h2 className="reduce"> - </h2>
                  </div>
                  <div className="itme-quantity__display">
                    <h2 className="reduce">{itemObj.quantity}</h2>
                  </div>
                  <div
                    className="itme-quantity-btn__increase "
                    onClick={async () => {
                      const newLineArr = await increase(lineItems, index);
                      await setLineItems(newLineArr);
                      if (itemObj.quantity) {
                        await cartQuantityUpdate(itemObj.id, itemObj.quantity);
                      }
                    }}
                  >
                    <h2 className="increase"> + </h2>
                  </div>
                </div>

                <div className="item-totla-price__wrapper">
                  <h2 className="item-totla-price">
                    {getTotalItemPrice(itemObj)}
                  </h2>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div
        className="basket-delete-items-btn"
        onClick={async () => {
          try {
            const newArr: ProductProjection[] = [];
            setTimeout(() => {
              clearItemLine();
            }, 0);
            setTimeout(() => {
              setLineItems(newArr);
            }, 100);
          } catch {
            console.error('item list is empty');
          }
        }}
      >
        <h2 className="basket-delete-items-btn-title">Delete all items</h2>
      </div>
    </div>
  );
};
