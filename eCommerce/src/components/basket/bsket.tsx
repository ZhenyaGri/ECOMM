import './style/basket.scss';
import { ReactElement, useEffect, useState } from 'react';
import { BasketProductListComponent } from './basket-product-list';
import { BasketTotalDetales } from './basket-total-detales';
import { getCurrentLineItems } from './core/get-item-list';
import { ProductProjection } from '../../api/productsType';
export const BasketComponent = (): ReactElement => {
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
    <section className="basket">
      <h2 className="basket-title">Shopping Cart</h2>
      {/*header*/}
      <div className="basket-header__wrapper">
        <ul className="basket-header-list">
          <li className="basket-header-item  item--product">
            <h2 className="header-item-title">Item</h2>
          </li>

          <li className="basket-header-item item--price">
            <h2 className="header-item-title">Price</h2>
          </li>

          <li className="basket-header-item item--quantity">
            <h2 className="header-item-title">Quantity</h2>
          </li>

          <li className="basket-header-item item--total">
            <h2 className="header-item-title">Total</h2>
          </li>
        </ul>
        <div className="basket-style-line"></div>
      </div>

      {/*product-list*/}
      <BasketProductListComponent
        lineItems={lineItems}
        setLineItems={setLineItems}
      />

      {/*detales*/}
      <BasketTotalDetales lineItems={lineItems} />
    </section>
  );
};
