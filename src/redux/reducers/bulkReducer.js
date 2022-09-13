import {
  ADDED_BULK_PRODUCT
} from "../actions/bulkActions";

const initState = [];

const bulkReducer = (state = initState, action) => {
  let bulkProducts = state,
    addedProduct = action.payload;

  if (action.type === ADDED_BULK_PRODUCT) {
    // if (bulkProduct === undefined) {
    //   return [
    //     ...bulkProduct,
    //     {
    //       ...addedProduct,
    //       cartItemId: uuidv4()
    //     }
    //   ];
    // } else {
    //   return bulkProduct = addedProduct;
    // }
    const bulkProduct = bulkProducts.filter(item => item.productId === addedProduct.productId)[0];
    if (bulkProduct === undefined) {
      return [addedProduct];
    } else {
      return bulkProducts;
    }
  }

  // if (action.type === ADD_TO_CART) {
  //   // for non variant products
  //   if (product.variation === undefined) {
  //     const cartItem = cartItems.filter((item) => item.productId === product.productId)[0];
  //     if (cartItem === undefined) {
  //       return [
  //         ...cartItems,
  //         {
  //           ...product,
  //           quantity: product.quantity ? product.quantity : 1,
  //           cartItemId: uuidv4()
  //         }
  //       ];
  //     } else {
  //       return cartItems.map((item) =>
  //         item.cartItemId === cartItem.cartItemId
  //           ? {
  //             ...item,
  //             quantity: product.quantity
  //               ? item.quantity + product.quantity
  //               : item.quantity + 1
  //           }
  //           : item
  //       );
  //     }
  //     // for variant products
  //   } else {
  //     const cartItem = cartItems.filter(
  //       (item) =>
  //         item.id === product.id &&
  //         product.selectedProductColor &&
  //         product.selectedProductColor === item.selectedProductColor &&
  //         product.selectedProductSize &&
  //         product.selectedProductSize === item.selectedProductSize &&
  //         (product.cartItemId ? product.cartItemId === item.cartItemId : true)
  //     )[0];

  //     if (cartItem === undefined) {
  //       return [
  //         ...cartItems,
  //         {
  //           ...product,
  //           quantity: product.quantity ? product.quantity : 1,
  //           cartItemId: uuidv4()
  //         }
  //       ];
  //     } else if (
  //       cartItem !== undefined &&
  //       (cartItem.selectedProductColor !== product.selectedProductColor ||
  //         cartItem.selectedProductSize !== product.selectedProductSize)
  //     ) {
  //       return [
  //         ...cartItems,
  //         {
  //           ...product,
  //           quantity: product.quantity ? product.quantity : 1,
  //           cartItemId: uuidv4()
  //         }
  //       ];
  //     } else {
  //       return cartItems.map((item) =>
  //         item.cartItemId === cartItem.cartItemId
  //           ? {
  //             ...item,
  //             quantity: product.quantity
  //               ? item.quantity + product.quantity
  //               : item.quantity + 1,
  //             selectedProductColor: product.selectedProductColor,
  //             selectedProductSize: product.selectedProductSize
  //           }
  //           : item
  //       );
  //     }
  //   }
  // }



  return state;
};

export default bulkReducer;
