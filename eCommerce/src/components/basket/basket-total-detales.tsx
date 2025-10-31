import { ReactElement, useCallback, useEffect, useState } from 'react';
import { ProductProjection } from '../../api/productsType';
import { calculationTotal } from './core/calc';
import { Button } from '../button/button';
import { useCart } from '../../context/useCart';
import {
  applyDiscountCode,
  getCart,
  removeDiscountCode,
} from '../../api/cartService';
import { parseError } from '../../api/errorHandler';
import { ITotalPriceObj } from './core/type';
type Props = {
  lineItems: ProductProjection[] | undefined;
};
export const BasketTotalDetales = ({ lineItems }: Props): ReactElement => {
  const [discountCode, setDiscountCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { cart, updateCart } = useCart();
  const [totals, setTotals] = useState<ITotalPriceObj | null>(null);

  const calculateTotals = useCallback(() => {
    if (!lineItems) return null;
    return calculationTotal(lineItems, cart || undefined);
  }, [lineItems, cart]);

  useEffect(() => {
    const newTotals = calculateTotals();
    if (newTotals) {
      setTotals(newTotals);
    }
  }, [calculateTotals, cart?.version, lineItems]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDiscountCode(e.target.value);
    setError(null);
    setSuccess(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleApplyDiscount();
    }
  };

  const handleApplyDiscount = async (): Promise<void> => {
    if (!discountCode.trim()) {
      setError('Please enter a promo code');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const currentCart = await getCart({ cartId: cart?.id });
      if (!currentCart) throw new Error('Cart not found');

      let updatedCart = currentCart;
      if (currentCart.discountCodes?.length) {
        updatedCart = await removeDiscountCode(
          currentCart.id,
          currentCart.version,
          currentCart.discountCodes[0].discountCode.id
        );
      }
      updatedCart = await applyDiscountCode(
        updatedCart.id,
        updatedCart.version,
        discountCode
      );
      setSuccess(true);
      updateCart(updatedCart);
      setDiscountCode('');
    } catch (err) {
      const totals = calculateTotals();
      if (totals) {
        totals.discount = 0;
      }
      setTotals(totals);
      const errDiscount = parseError(err);
      setError(
        errDiscount.message ||
          'Failed to apply promo code. The code may be invalid or expired.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="basket-total-detales__wrapper">
      {/*detales-promo*/}
      <div className="detales-promo__wrapper">
        <div className="detales-promo-input__wrapper">
          <label className="promo-input-label" htmlFor="promo-input">
            Enter promo code
          </label>
          <input
            className="promo_input"
            type="text"
            id="promo-input"
            value={discountCode}
            onChange={handleCodeChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          {error && <h3 className="error-message">{error}</h3>}
          {success && (
            <div className="success-message">
              Promo code applied successfully!
            </div>
          )}
        </div>
        <Button
          type="button"
          className="btn-dark"
          onClick={handleApplyDiscount}
          disabled={isLoading || !discountCode.trim()}
          children={isLoading ? 'Applying...' : 'Apply'}
        ></Button>
      </div>

      {/*detales-list-info*/}
      <ul className="total-detales-list">
        <li className="detales-list-item subtotla">
          <h2 className="detales-list-item-title">Subtotal</h2>
          <h2 className="detales-list-item-prce">
            {lineItems ? calculationTotal(lineItems).subtotal : null}
          </h2>
        </li>

        <li className="detales-list-item sales-tax">
          <h2 className="detales-list-item-title">Sales Tax</h2>
          <h2 className="detales-list-item-prce">
            {' '}
            {lineItems ? calculationTotal(lineItems).salesTax : null}
          </h2>
        </li>

        <li className="detales-list-item discont">
          <h2 className="detales-list-item-title">Discount</h2>
          <h2 className="detales-list-item-prce">
            {totals?.discount ? `-${totals.discount}` : '0.00'}
          </h2>
        </li>

        <li className="detales-list-item total">
          <h2 className="detales-list-item-title">Total</h2>
          <h2 className="detales-list-item-prce">
            {lineItems ? calculationTotal(lineItems).total : null}
          </h2>
        </li>
      </ul>
    </div>
  );
};
