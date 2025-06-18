import { ProductProjection } from '../../../api/productsType';

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
    newArr[index].quantity -= 1;
    newArr[index].totalPrice.centAmount =
      newArr[index].price.value.centAmount * newArr[index].quantity;
  }
  return newArr;
};
