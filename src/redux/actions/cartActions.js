export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";

//add to cart
export const addToCart = (
  product,
  addToast,
  quantityCount,
  selectedFabrics,
  selectedFabricsColor,
  selectedLining,
  selectedLiningFabricsColor,
  comboArray,
  selectedAttr,
  selectedSizeCategory,
  selectedCategorySizeValue,
  alterationSelected,
  styleOptionSelected,
  extraPrice
) => {

  console.log("CART ITEMS =>>>", product)

  return dispatch => {
    if (addToast) {
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...product,
        quantity: quantityCount,
        selectedFabrics: selectedFabrics,
        selectedFabricsColor: selectedFabricsColor,
        selectedLining: selectedLining,
        selectedLiningFabricsColor: selectedLiningFabricsColor,
        comboArray: comboArray,
        selectedAttr: selectedAttr,
        selectedSizeCategory: selectedSizeCategory,
        selectedSize: selectedCategorySizeValue,
        selectedAlteration: alterationSelected,
        selectedStyleOption: styleOptionSelected,
        extraPrice: extraPrice,
        regularOrder: true
      }
    });
  };
};

export const addBulkToCart = (data) => {
  return dispatch => {
    if (data.addToast) {
      data.addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...data.bulkProduct,
        totalItems: data.totalItems,
        selectedFabrics: data.selectedFabrics,
        selectedFabricsColor: data.selectedFabricsColor,
        selectedLining: data.selectedLining,
        selectedLiningFabricsColor: data.selectedLiningFabricsColor,
        selectedSizeCategory: data.selectedSizeCategory,
        regularSizeArray: JSON.parse(data.regularSizeArray),
        // specificSizeArray: JSON.parse(specificSizeArray),
        selectedAlteration: data.alterationSelected,
        selectedStyleOption: data.styleOptionSelected,
        selectedAttr: data.selectedAttr,
        comboArray: data.comboArray,
        extraPrice: data.extraPrice,
      }
    });
  };
};

export const preventAddingToCart = (item, addToast) => {

  // return dispatch => {
  if (addToast) {
    addToast("Sorry, you cannot add the dress to the cart because of available shipping options. Place separated order please.", { appearance: "error", autoDismiss: true });
  }
  // };
};



//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Item Decremented From Cart", {
        appearance: "warning",
        autoDismiss: true
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};

//delete from cart
export const deleteFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Removed From Cart", { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//delete all from cart
export const deleteAllFromCart = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Removed All From Cart", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  console.log("cartItemStock", item)
  console.log("cartItemStock", color)
  console.log("cartItemStock", size)
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      .filter(single => single.color === color)[0]
      .size.filter(single => single.name === size)[0].stock;
  }
};
