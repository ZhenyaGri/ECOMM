export const BasketComponent = () => {
  return (
    <section className="basket">
      {/*header*/}
      <div className="basket-header__wrapper">
        <ul className="basket-header-list">
          <li className="basket-header-item">
            <h2 className="header-item-title">Item</h2>
          </li>

          <li className="basket-header-item">
            <h2 className="header-item-title">Price</h2>
          </li>

          <li className="basket-header-item">
            <h2 className="header-item-title">Quantity</h2>
          </li>

          <li className="basket-header-item">
            <h2 className="header-item-title">Total</h2>
          </li>
        </ul>
      </div>

      {/*main prodact list*/}
      <ul className="buscket-product-list">
        <li className="buscket-product-item">
          {/*product description*/}
          <div className="item__wrapper">
            <div className="itme-img__wrapper">
              <img src="" alt="prduct-photo" />
            </div>
            <div className="item-title__wrapper">
              <h2 className="itme-title">product</h2>
            </div>
          </div>

          {/*price*/}
          <h2 className="price-title"></h2>

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

          {/*total price*/}
          <div className="item-totla-price__wrapper">
            <h2 className="item-totla-price">0.00 </h2>
          </div>
        </li>
      </ul>

      {/*detales*/}
      <div className="basket-total-detales__wrapper">
        {/*detales-promo*/}
        <div className="detales-promo__wrapper">
          <div className="detales-promo-input__wrapper">
            <input className="promo_input" type="text" id="promo-input" />
            <label htmlFor="promo-input">add your promo</label>
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
            <h2 className="detales-list-item-title">Sales - tax</h2>
            <h2 className="detales-list-item-prce">0.00</h2>
          </li>

          <li className="detales-list-item discont">
            <h2 className="detales-list-item-title">Price Off</h2>
            <h2 className="detales-list-item-prce">0%</h2>
          </li>

          <li className="detales-list-item total">
            <h2 className="detales-list-item-title">Total</h2>
            <h2 className="detales-list-item-prce">0.00</h2>
          </li>
        </ul>
      </div>
    </section>
  );
};
