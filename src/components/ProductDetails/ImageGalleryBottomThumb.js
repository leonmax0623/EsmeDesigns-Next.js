import { Fragment, useEffect, useMemo, useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward, IoIosHeartEmpty, IoMdExpand
} from "react-icons/io";
import Swiper from "react-id-swiper";
import ReactImageMagnify from 'react-image-magnify';
import { LightgalleryItem, LightgalleryProvider } from "react-lightgallery";
import { Tooltip } from "react-tippy";

const ImageGalleryBottomThumb = ({
  product,
  wishlistItem,
  addToast,
  addToWishlist,
  deleteFromWishlist,
  pictureColorId
}) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [activeSwiper, setActiveSwiper] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  };

  // const props = {
  //   width: 400,
  //   height: 250,
  //   zoomWidth: 500,
  //   zoomPosition: "original",
  //   img: product.pictures[0].url
  // }

  const thumbnailSwiperParams = {
    // on: {
    //   realIndexChange: (swiper) => console.log("RRRRRRRRRRR", swiper.realIndex)
    // },
    getSwiper: getThumbnailSwiper,
    // activeSlideKey: '2',
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: false,
    slideToClickedSlide: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },

    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <IoIosArrowBack />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <IoIosArrowForward />
      </button>
    )

  };

  // useMemo(() => {
  //   console.log("KaraRex")
  //   let activeIndex = 0;
  //   product.picture.forEach((image, i) => {
  //     if (localStorage.getItem("imageFabricsColorId") && localStorage.getItem("imageFabricsColorId") === image.fabricsColorId) {
  //       setActiveSwiper(i)
  //       activeIndex = 1;
  //     }
  //   })
  //   if (activeIndex === 0) setActiveSwiper(0);
  // }, [localStorage.getItem("imageFabricsColorId")])


  useMemo(() => {
    console.log("PICTURE COLOR ID => ", pictureColorId)
    product.picture.forEach((image, i) => {
      if (image.fabricsColorId === pictureColorId) {
        console.log("$$$$$$$$$$$$$$$$$", i)
        setActiveSwiper(i)
        setActiveIndex(1);
      }
    })
    const pictureIndex = product.picture.findIndex(image => image.fabricsColorId === pictureColorId);
    if (pictureIndex > -1) {
      setActiveSwiper(pictureIndex);
      setActiveIndex(1);
    } else {
      setActiveIndex(0);
    }
    // if (pictures.length > 0) {
    //   setActiveSwiper(pictures[0]);
    //   setActiveIndex(1);
    // } else {
    //   setActiveIndex(0);
    // }
    // if (activeIndex === 0) setActiveSwiper(null);
  }, [pictureColorId])

  return (
    <Fragment>
      <div className="product-large-image-wrapper space-mb--30">
        {/* floating badges */}
        <div className="product-large-image-wrapper__floating-badges">
          {parseInt(product.discountedPrice) && parseInt(product.discountedPrice) > 0 ? (
            <span className="onsale">{product.discountTag}</span>
          ) : (
            ""
          )}
          {product.new ? <span className="hot">New</span> : ""}
          {product.stock === 0 ? <span className="out-of-stock">out</span> : ""}
        </div>

        {/* wishlist button */}
        <div className="product-details-button-wrapper">
          <Tooltip
            title={
              wishlistItem !== undefined
                ? "Added to wishlist"
                : "Add to wishlist"
            }
            position="left"
            trigger="mouseenter"
            animation="shift"
            arrow={true}
            duration={200}
          >
            <button
              onClick={
                wishlistItem !== undefined
                  ? () => deleteFromWishlist(product, addToast)
                  : () => addToWishlist(product, addToast)
              }
              className={`wishlist-icon ${wishlistItem !== undefined ? "active" : ""
                }`}
            >
              <IoIosHeartEmpty />
            </button>
          </Tooltip>
        </div>
        <LightgalleryProvider >
          <div className="maximus">
            <Swiper {...gallerySwiperParams}>
              {product.picture &&
                product.picture.map((image, i) => {
                  return (
                    <div key={i} >
                      <LightgalleryItem
                        group="any"
                        src={image.url}
                      >
                        <Tooltip
                          title="Click to enlarge"
                          position="left"
                          trigger="mouseenter"
                          animation="shift"
                          arrow={true}
                          duration={200}
                        >
                          <button className="enlarge-icon">
                            <IoMdExpand />
                          </button>
                        </Tooltip>
                      </LightgalleryItem>
                      <div className="single-image">
                        {/* <img
                        src={process.env.PUBLIC_URL + image.url}
                        className="img-fluid"
                        alt=""
                      /> */}
                        <ReactImageMagnify {...{
                          smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: image.url
                          },
                          largeImage: {
                            src: image.url,
                            width: 1800,
                            height: 2700
                          }
                        }} />
                      </div>
                    </div>
                  );
                })}
            </Swiper>
          </div>
        </LightgalleryProvider>
      </div>
      <div className="product-small-image-wrapper" >

        <Swiper {...thumbnailSwiperParams} activeSlideKey={activeIndex === 1 ? String(activeSwiper) : null}>
          {product.picture &&
            product.picture.map((image, i) => {
              return (
                <div className="slide" key={String(i)}>
                  <div className={`single-image maximus-${i}`}>
                    <img
                      src={image.url}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
        </Swiper>
      </div>
    </Fragment>
  );
};

export default ImageGalleryBottomThumb;
