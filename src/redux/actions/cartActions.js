export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";

//add to cart
export const addToCart = (
  item,
  addToast,
  quantityCount,
  selectedFabrics,
  selectedFabricsColor,
  selectedLining,
  selectedLiningFabricsColor,
  comboArray,
  selectedSize,
  alterationSelected,
  selectedAttr,
  styleOptionSelected
) => {

  return dispatch => {
    if (addToast) {
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        quantity: quantityCount,
        selectedFabrics: selectedFabrics,
        selectedFabricsColor: selectedFabricsColor,
        selectedLining: selectedLining,
        selectedLiningFabricsColor: selectedLiningFabricsColor,
        selectedFirstComboFabrics: selectedFirstComboFabrics,
        selectedSecondComboFabrics: selectedSecondComboFabrics,
        selectedThirdComboFabrics: selectedThirdComboFabrics,
        selectedForthComboFabrics: selectedForthComboFabrics,
        selectedFirstComboFabricsColor: selectedFirstComboFabricsColor,
        selectedSecondComboFabricsColor: selectedSecondComboFabricsColor,
        selectedThirdComboFabricsColor: selectedThirdComboFabricsColor,
        selectedForthComboFabricsColor: selectedForthComboFabricsColor,
        selectedMeshColorAttribute: selectedMeshColorAttribute,
        selectedLengthAttribute: selectedLengthAttribute,
        selectedSlitAttribute: selectedSlitAttribute,
        selectedSize: selectedSize,
        selectedAlteration: alterationSelected,
        selectedStyleOption: styleOptionSelected
        // selectedProductColor: selectedProductColor
        //   ? selectedProductColor
        //   : item.selectedProductColor
        //     ? item.selectedProductColor
        //     : null,
        // selectedProductSize: selectedProductSize
        //   ? selectedProductSize
        //   : item.selectedProductSize
        //     ? item.selectedProductSize
        //     : null
      }
    });
  };
};

export const addBulkToCart = (
  bulkProduct,
  addToast,
  selectedFabrics,
  selectedFabricsColor,
  selectedLining,
  selectedLiningFabricsColor,
  comboArray,
  selectedAttr,
  regularSizeArray,
  alterationSelected,
  styleOptionSelected,
  totalItems
) => {

  return dispatch => {
    if (addToast) {
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...bulkProduct,
        totalItems: totalItems,
        selectedFabrics: selectedFabrics,
        selectedFabricsColor: selectedFabricsColor,
        selectedLining: selectedLining,
        selectedLiningFabricsColor: selectedLiningFabricsColor,
        regularSizeArray: JSON.parse(regularSizeArray),
        selectedAlteration: alterationSelected,
        selectedStyleOption: styleOptionSelected,
        selectedAttr: selectedAttr,
        comboArray: comboArray,

      }
    });
  };
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
