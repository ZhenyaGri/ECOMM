import { ProductProjection } from '../../../api/productsType';
import { ITotalPriceObj } from './type';
export const setStartPrice = (
  itemObj: ProductProjection
): string | undefined => {
  if (itemObj.price) {
    if ('discounted' in itemObj.price && itemObj.price.discounted) {
      return (itemObj.price.discounted.value.centAmount / 100).toFixed(2);
    } else {
      return (itemObj.price.value.centAmount / 100).toFixed(2);
    }
  }
};

export const increase = (
  itemLine: ProductProjection[],
  index: number
): ProductProjection[] => {
  const newArr = [...itemLine];
  if (
    newArr[index].quantity &&
    newArr[index].totalPrice &&
    newArr[index].price
  ) {
    newArr[index].quantity += 1;
    newArr[index].totalPrice.centAmount =
      newArr[index].price.value.centAmount * newArr[index].quantity;
  }
  console.log(newArr);
  return newArr;
};

export const decrease = (
  itemLine: ProductProjection[],
  index: number
): ProductProjection[] => {
  const newArr = [...itemLine];

  if (
    newArr[index].quantity &&
    newArr[index].totalPrice &&
    newArr[index].price
  ) {
    if (newArr[index].quantity > 1) {
      newArr[index].quantity -= 1;
    } else {
      newArr[index].quantity = 1;
    }

    newArr[index].totalPrice.centAmount =
      newArr[index].price.value.centAmount * newArr[index].quantity;
  }
  console.log(newArr);
  return newArr;
};

export const getTotalItemPrice = (
  itemObj: ProductProjection
): string | undefined => {
  let totalPrice: string = '1';
  if (itemObj.price && itemObj.quantity) {
    if ('discounted' in itemObj.price && itemObj.price.discounted) {
      totalPrice = (
        (itemObj.price.discounted.value.centAmount * itemObj.quantity) /
        100
      ).toFixed(2);
    } else {
      totalPrice = (
        (itemObj.price.value.centAmount * itemObj.quantity) /
        100
      ).toFixed(2);
    }
  }
  if (itemObj.totalPrice) {
    return (itemObj.totalPrice.centAmount = parseFloat(totalPrice)).toFixed(2);
  }
};

export const calculationTotal = (
  itemLine: ProductProjection[]
): ITotalPriceObj => {
  const totalPriceObj: ITotalPriceObj = {
    subtotal: 0,
    salesTax: 0,
    discount: 0,
    total: 0,
  };
  totalPriceObj.subtotal = itemLine
    .reduce((acc, itemObj) => {
      if (itemObj.totalPrice) {
        acc += itemObj.totalPrice.centAmount;
      }
      return acc;
    }, 0)
    .toFixed(2);

  totalPriceObj.total = (parseFloat(totalPriceObj.subtotal) * 1.2).toFixed(2);
  totalPriceObj.salesTax = (
    parseFloat(totalPriceObj.total) - parseFloat(totalPriceObj.subtotal)
  ).toFixed(2);

  return totalPriceObj;
};
