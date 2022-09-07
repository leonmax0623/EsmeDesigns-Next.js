import { combineReducers } from "redux";
import bulkReducer from "./bulkReducer";
import cartReducer from "./cartReducer";
import compareReducer from "./compareReducer";
import productReducer from "./productReducer";
import wishlistReducer from "./wishlistReducer";

const rootReducer = combineReducers({
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  bulkProductData: bulkReducer
});

export default rootReducer;
