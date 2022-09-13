import Link from "next/link";
import { useEffect } from "react";
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
import products from "../../../data/real_products.json";
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
  product,
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
  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  const { addToast } = useToasts();
  // const discountedPrice = getDiscountPrice(
  //   product.price,
  //   product.discount
  // ).toFixed(2);

  // const productPrice = product.price.toFixed(2);
  const discountedPrice = product.discountedPrice;
  const productPrice = product.standardPrice;
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
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle={product.productName}
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
          <li>{product.productName}</li>
        </ul>
      </BreadcrumbOne>

      {/* product details */}
      <div className="product-details space-mt--r100 space-mb--r100">
        <Container>
          <Row>
            <Col lg={6} className="space-mb-mobile-only--50">
              {/* image gallery bottom thumb */}
              <ImageGalleryBottomThumb
                product={product}
                wishlistItem={wishlistItem}
                addToast={addToast}
                addToWishlist={addToWishlist}
                deleteFromWishlist={deleteFromWishlist}
              />
            </Col>

            <Col lg={6}>
              {/* product description */}
              <ProductDescription
                product={product}
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
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {/* product description tab */}
              <ProductDescriptionTab product={product} />
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
    compareItems: state.compareData
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
      selectedLining,
      selectedLiningFabricsColor,
      comboArray,
      selectedAttr,
      selectedSizeCategory,
      selectedCategorySizeValue,
      alterationSelected,
      styleOptionSelected
    ) => {
      dispatch(
        addToCart(
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
          styleOptionSelected
        )
      );
    },
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

export async function getStaticPaths() {
  // get the paths we want to pre render based on products
  const paths = products.map((product) => ({
    params: { slug: product.productName }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // get product data based on slug
  const product = products.filter((single) => single.productName === params.slug)[0];

  return { props: { product } };
}
