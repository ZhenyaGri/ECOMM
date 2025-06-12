import { ReactElement } from 'react';

export const BasketTotalDetales = (): ReactElement => {
  return (
    <div className="basket-total-detales__wrapper">
      {/*detales-promo*/}
      <div className="detales-promo__wrapper">
        <div className="detales-promo-input__wrapper">
          <label className="promo-input-label" htmlFor="promo-input">
            Enter promo code
          </label>
          <input className="promo_input" type="text" id="promo-input" />
        </div>
        <div className="detales-promo-btn">
          <h2 className="detales-promo-btn-title">Apply</h2>
        </div>
      </div>

      {/*detales-list-info*/}
      <ul className="total-detales-list">
        <li className="detales-list-item subtotla">
          <h2 className="detales-list-item-title">Subtotal</h2>
          <h2 className="detales-list-item-prce">0.00</h2>
        </li>

        <li className="detales-list-item sales-tax">
          <h2 className="detales-list-item-title">Sales Tax</h2>
          <h2 className="detales-list-item-prce">0.00</h2>
        </li>

        <li className="detales-list-item discont">
          <h2 className="detales-list-item-title">Discount</h2>
          <h2 className="detales-list-item-prce">0%</h2>
        </li>

        <li className="detales-list-item total">
          <h2 className="detales-list-item-title">Total</h2>
          <h2 className="detales-list-item-prce">0.00</h2>
        </li>
      </ul>
    </div>
  );
};
