export const ADDED_BULK_PRODUCT = "ADDED_BULK_PRODUCT";

export const addToBulk = (item) => {
  return dispatch => {
    dispatch({ type: ADDED_BULK_PRODUCT, payload: item });
  };
};