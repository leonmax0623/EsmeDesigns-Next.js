import { Fragment } from "react";

import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { addToCart } from "../../redux/actions/cartActions";
import {
  addToCompare,
  deleteFromCompare
} from "../../redux/actions/compareActions";
import {
  addToWishlist,
  deleteFromWishlist
} from "../../redux/actions/wishlistActions";
import ProductGridList from "./ProductGridList";

const ProductGridWrapper = ({
  products,
  bottomSpace,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare,
  cartItems,
  wishlistItems,
  compareItems
}) => {
  const { addToast } = useToasts();
  console.log("API Products => ", products)
  return (
    <Fragment>
      {products &&
        products.map((product) => {
          const discountedPrice = parseInt(product.discountedPrice)
          const productPrice = parseInt(product.standardPrice);
          const cartItem = cartItems.filter(
            (cartItem) => cartItem.productId === product.productId
          )[0];
          const wishlistItem = wishlistItems.filter(
            (wishlistItem) => wishlistItem.productId === product.productId
          )[0];
          const compareItem = compareItems.filter(
            (compareItem) => compareItem.productId === product.productId
          )[0];

          return (
            <ProductGridList
              key={product.productId}
              product={product}
              discountedPrice={discountedPrice}
              productPrice={productPrice}
              cartItem={cartItem}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
              bottomSpace={bottomSpace}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              deleteFromWishlist={deleteFromWishlist}
              addToCompare={addToCompare}
              deleteFromCompare={deleteFromCompare}
              addToast={addToast}
              cartItems={cartItems}
            />
          );
        })}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
    deleteFromCompare: (item, addToast) => {
      dispatch(deleteFromCompare(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridWrapper);
