import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { BreadcrumbOne } from "../../../components/Breadcrumb";
import { LayoutTwo } from "../../../components/Layout";
import {
  ImageGalleryBottomThumb,
  ProductDescription,
  ProductDescriptionTab
} from "../../../components/ProductDetails";
// import products from "../../../data/real_products.json";
import API from '../../../api';
import { addToBulk } from "../../../redux/actions/bulkActions";
import { addToCart } from "../../../redux/actions/cartActions";
import {
  addToCompare,
  deleteFromCompare
} from "../../../redux/actions/compareActions";
import {
  addToWishlist,
  deleteFromWishlist
} from "../../../redux/actions/wishlistActions";

const ProductBasic = ({
  cartItems,
  wishlistItems,
  compareItems,
  addToCart,
  addToBulk,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare
}) => {

  const [allowRating, setAllowRating] = useState("");
  const [allowReviews, setAllowReviews] = useState("");
  const [showRating, setShowRating] = useState("");
  const [showReviews, setShowReviews] = useState("");

  useEffect(() => {
    const formData = {
      feaMethod: 'getConfig'
    }

    API.post('/', new URLSearchParams(formData))
      .then(response => {
        console.log("Response => ", response)
        setAllowRating(response.data.allowRating)
        setAllowReviews(response.data.allowReviews)
        setShowRating(response.data.showRating)
        setShowReviews(response.data.showReviews)
      })
      .catch(error => {
        console.log("Error", error)
      });
  }, [])

  const [pictureColorId, setPictureColorId] = useState("")
  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  const product = [JSON.parse(localStorage.getItem('specificProduct'))]

  const { addToast } = useToasts();
  // const discountedPrice = getDiscountPrice(
  //   product[0].price,
  //   product.discount
  // ).toFixed(2);

  // const productPrice = product.price.toFixed(2);
  const discountedPrice = parseInt(product[0].discountedPrice);
  const productPrice = parseInt(product[0].standardPrice);
  const cartItem = cartItems.filter(
    (cartItem) => cartItem.productId === product[0].productId
  )[0];
  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.productId === product[0].productId
  )[0];
  const compareItem = compareItems.filter(
    (compareItem) => compareItem.productId === product[0].productId
  )[0];

  const changePicture = (colorId) => {
    setPictureColorId(colorId)
  }

  const disallowRush = (val) => {
    if (val) {
      addToast("Sorry, you cannot add the dress to the cart because it has different lead time than the others. Place separated order please.", { appearance: "error", autoDismiss: true });
    } else {
      addToast("Now you can add the product to your cart!", { appearance: "success", autoDismiss: true });
    }
  }

  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle={product[0].productName}
        backgroundImage="/assets/images/esme-images/products_banner.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link
              href="/shop/left-sidebar"
              as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
            >
              <a>Shop</a>
            </Link>
          </li>
          <li>{product[0].productName}</li>
        </ul>
      </BreadcrumbOne>

      {/* product details */}
      <div className="product-details space-mt--r100 space-mb--r100">
        <Container>
          <Row>
            <Col lg={6} className="space-mb-mobile-only--50">
              {/* image gallery bottom thumb */}
              <ImageGalleryBottomThumb
                product={product[0]}
                wishlistItem={wishlistItem}
                addToast={addToast}
                addToWishlist={addToWishlist}
                deleteFromWishlist={deleteFromWishlist}
                pictureColorId={pictureColorId}
              />
            </Col>

            <Col lg={6}>
              {/* product description */}
              <ProductDescription
                product={product[0]}
                productPrice={productPrice}
                discountedPrice={discountedPrice}
                cartItems={cartItems}
                cartItem={cartItem}
                wishlistItem={wishlistItem}
                compareItem={compareItem}
                addToast={addToast}
                addToBulk={addToBulk}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                deleteFromWishlist={deleteFromWishlist}
                addToCompare={addToCompare}
                deleteFromCompare={deleteFromCompare}
                changePicture={changePicture}
                // preventAddingToCart={preventAddingToCart}
                disallowRush={disallowRush}
                showRating={showRating}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {/* product description tab */}
              <ProductDescriptionTab product={product[0]} showReviews={showReviews} allowRating={allowRating} allowReviews={allowReviews} />
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutTwo>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
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
      selectedCategorySizeValue,
      alterationSelected,
      styleOptionSelected,
      extraPrice,
      wearDate,
      shipDate,
      selectedRushOption
    ) => {
      dispatch(
        addToCart(
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
          selectedCategorySizeValue,
          alterationSelected,
          styleOptionSelected,
          extraPrice,
          wearDate,
          shipDate,
          selectedRushOption
        )
      );
    },
    // preventAddingToCart: (item, addToast) => {
    //   dispatch(preventAddingToCart(item, addToast))
    // },
    addToBulk: (product) => {
      dispatch(addToBulk(product));
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductBasic);

// export async function getStaticPaths() {
//   console.log("^^^^^^^^^^^^^", products)
//   // get the paths we want to pre render based on products
//   const paths = products.map((product) => ({
//     params: { slug: product[0].productName }
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   // get product data based on slug
//   const product = JSON.parse(localStorage.getItem('specificProduct'))

//   return { props: { product } };
// }
