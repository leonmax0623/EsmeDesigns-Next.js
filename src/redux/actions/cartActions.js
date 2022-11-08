export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const ADD_CLONE_ORDER_TO_CART = "ADD_CLONE_ORDER_TO_CART";

//add to cart
export const addToCart = (
  product,
  addToast,
  quantityCount,
  selectedFabrics,
  selectedFabricsColor,
  selectedFabricsColorId,
  selectedLining,
  selectedLiningFabricsColor,
  selectedLiningFabricsColorId,
  comboArray,
  selectedAttr,
  selectedSizeCategory,
  selectedSizeCategoryId,
  selectedCategorySizeValue,
  selectedCategorySizeValueId,
  alterationSelected,
  styleOptionSelected,
  extraPrice,
  wearDate,
  shipDate,
  selectedRushOption,
  itemsId,
  ordersId
) => {

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }


  return dispatch => {
    console.log("<<==== CART ITEMS ====>>", ordersId)
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
        selectedFabricsColorId: selectedFabricsColorId,
        selectedLining: selectedLining,
        selectedLiningFabricsColor: selectedLiningFabricsColor,
        selectedLiningFabricsColorId: selectedLiningFabricsColorId,
        comboArray: comboArray,
        selectedAttr: selectedAttr,
        selectedSizeCategory: selectedSizeCategory,
        selectedSizeCategoryId: selectedSizeCategoryId,
        selectedSize: selectedCategorySizeValue,
        selectedSizeId: selectedCategorySizeValueId,
        selectedAlteration: alterationSelected,
        selectedStyleOption: styleOptionSelected,
        extraPrice: extraPrice,
        wearDate: formatDate(wearDate),
        shipDate: formatDate(shipDate),
        selectedRushOption: selectedRushOption,
        itemsId: itemsId,
        ordersId: ordersId,
        regularOrder: true
      }
    });
  };
};

export const addBulkToCart = (data) => {
  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  console.log("JJJJJJJJ", data)
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
        selectedFabricsColorId: data.selectedFabricsColorId,
        selectedLining: data.selectedLining,
        selectedLiningFabricsColor: data.selectedLiningFabricsColor,
        selectedLiningFabricsColorId: data.selectedLiningFabricsColorId,
        selectedSizeCategory: data.selectedSizeCategory,
        selectedSizeCategoryId: data.selectedSizeCategoryId,
        regularSizeArray: JSON.parse(data.regularSizeArray),
        // specificSizeArray: JSON.parse(specificSizeArray),
        selectedAlteration: data.alterationSelected,
        selectedStyleOption: data.styleOptionSelected,
        selectedAttr: data.selectedAttr,
        comboArray: data.comboArray,
        extraPrice: data.extraPrice,
        wearDate: formatDate(data.wearDate),
        shipDate: formatDate(data.shipDate),
        selectedRushOption: data.selectedRushOption,
        itemsId: data.tempItemsId,
        ordersId: data.tempOrdersId
      }
    });
  };
};

export const cloneBulkOrder = (data) => {

  console.log("CLONE ITEM===>", data)
  return dispatch => {

    dispatch({
      type: ADD_CLONE_ORDER_TO_CART,
      payload: data
    });
  };
};

// export const preventAddingToCart = (item, addToast) => {

//   // return dispatch => {
//   if (addToast) {
//     addToast("Sorry, you cannot add the dress to the cart because of available shipping options. Place separated order please.", { appearance: "error", autoDismiss: true });
//   }
//   // };
// };



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
