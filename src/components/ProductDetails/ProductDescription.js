import Link from "next/link";
import { Fragment, useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoIosHeartEmpty, IoIosShuffle } from "react-icons/io";
import { MultiSelect } from "react-multi-select-component";
import { getProductCartQuantity } from "../../lib/product";
import { ProductRating } from "../Product";



const ProductDescription = ({
  product,
  productPrice,
  discountedPrice,
  cartItems,
  wishlistItem,
  compareItem,
  addToast,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare
}) => {
  console.log("Maximus", product)
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );

  //custom 
  const [selectedLining, setSelectedLining] = useState(
    product.lining ? product.lining[0].fabricsName : ""
  );

  const [selectedLiningFabricsColor, setSelectedLiningFabricsColor] = useState(
    product.lining ? product.lining[0].fabricsColors[0].fabricsColorName : ""
  );

  const [selectedFabrics, setSelectedFabrics] = useState(
    product.fabrics ? product.fabrics[0].fabricsName : ""
  );

  const [selectedFabricsColor, setSelectedFabricsColor] = useState(
    product.fabrics ? product.fabrics[0].fabricsColors[0].fabricsColorName : ""
  );

  const [selectedSize, setSelectedSize] = useState(
    product.sizeCategories ? product.sizeCategories[0].sizes[0].sizeCode : ""
  );

  const [selectedComboFabric, setSelectedComboFabric] = useState(
    product.combos.map((combo, i) => {
      return { combo: i, fabric: 0, color: 0 }
    })
  );

  const [selectedComboFabricsColor, setSelectedComboFabricsColor] = useState(
    ""
  );

  const [selectedFabric, setSelectedFabric] = useState({ combo: 0, fabric: 0, color: 0 });
  //custom
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(3);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  const alterationOptions = [];
  product.styleAlterations.map((single, i) => {
    let array = {
      label: "",
      value: ""
    };
    array.label = single.styleAlterationName;
    array.value = single.price;
    alterationOptions.push(array)
  });

  const styleOptions = [];
  product.styleOptions.map((single, i) => {
    let array = {
      label: "",
      value: ""
    };
    array.label = single.styleOptionName;
    array.value = single.price;
    styleOptions.push(array)
  });

  const [alterationSelected, setAlterationSelected] = useState([]);
  const [styleOptionSelected, setStyleOptionSelected] = useState([]);



  return (
    <div className="product-content">
      {product.reviewsList && product.reviewsList.length > 0 ? (
        <div className="product-content__rating-wrap d-block d-sm-flex space-mb--20">
          <div className="product-content__rating space-mr--20">
            <ProductRating ratingValue={product.reviewsList.reduce((ac, a) => parseInt(a.rating) + ac, 0) / product.reviewsList.length} />
          </div>
          <div className="product-content__rating-count">
            <a href="#">( {product.reviewsList.length} customer reviews )</a>
          </div>
        </div>
      ) : (
        ""
      )}
      <h2 className="product-content__title space-mb--20">{product.productName}</h2>
      <div className="product-content__price space-mb--20">
        {parseInt(product.discountedPrice) > 0 ? (
          <Fragment>
            <span className="main-price discounted">${productPrice}</span>
            <span className="main-price">${discountedPrice}</span>
          </Fragment>
        ) : (
          <span className="main-price">${productPrice} </span>
        )}
      </div>
      <div className="product-content__description space-mb--30">
        <p>{product.description}</p>
      </div>


      {product.fabrics ? (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Fabrics</div>
            <div className="product-content__size__content">
              <select
                style={{ width: "100%", height: "37px", cursor: "pointer" }}
                onChange={(event) => {
                  console.log("event", event.target.value)
                  setSelectedFabrics(event.target.value.split("/")[0])
                  setSelectedFabricsColor(event.target.value.split("/")[1])
                }}
              >
                {product.fabrics &&
                  product.fabrics.map((single, i) => {
                    return (
                      <option key={i} value={`${single.fabricsName}/${single.fabricsColors[0].fabricsColorName}`}>{single.fabricsName}</option>
                    );
                  })
                }
              </select>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {selectedFabricsColor && (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title"></div>
            <div className="product-content__size__content">
              <div className="product-content__color__content">
                {product.fabrics.map((single, i) => single.fabricsName === selectedFabrics ? single.fabricsColors.map((color, i) => {
                  return (
                    <Fragment key={i}>
                      <input
                        type="radio"
                        value={color.fabricsColorName}
                        name="fabrics-color"
                        id={`fabrics-${color.fabricsColorName}`}
                        checked={
                          color.fabricsColorName === selectedFabricsColor ? "checked" : ""
                        }
                        onChange={() => {
                          console.log("FabricsColor", event.target)
                          setSelectedFabricsColor(color.fabricsColorName);
                          setQuantityCount(1);
                        }}
                      />
                      <label
                        htmlFor={`fabrics-${color.fabricsColorName}`}
                        style={{ backgroundColor: `rgb(${color.fabricsColorRGB})` }}
                      ></label>
                    </Fragment>
                  );
                }) : "")}
              </div>
            </div>
          </div>
        </div>
      )}
      {product.lining ? (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Lining</div>
            <div className="product-content__size__content">
              <select
                style={{ width: "100%", height: "37px", cursor: "pointer" }}
                onChange={(event) => {
                  console.log("event", event.target.value)
                  setSelectedLining(event.target.value.split("/")[0])
                  setSelectedLiningFabricsColor(event.target.value.split("/")[1])
                }}
              >
                {product.lining &&
                  product.lining.map((single, i) => {
                    return (
                      <option key={i} value={`${single.fabricsName}/${single.fabricsColors[0].fabricsColorName}`}>{single.fabricsName}</option>
                    );
                  })
                }
              </select>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {selectedLiningFabricsColor && (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title"></div>
            <div className="product-content__size__content">
              <div className="product-content__color__content">
                {product.lining.map((single, i) => single.fabricsName === selectedLining ? single.fabricsColors.map((color, i) => {
                  return (
                    <Fragment key={i}>
                      <input
                        type="radio"
                        value={color.fabricsColorName}
                        name="lining-color"
                        id={`lining-${color.fabricsColorName}`}
                        checked={
                          color.fabricsColorName === selectedLiningFabricsColor ? "checked" : ""
                        }
                        onChange={() => {
                          console.log("LiningColor", color.fabricsColorName)
                          setSelectedLiningFabricsColor(color.fabricsColorName);
                          setQuantityCount(1);
                        }}
                      />
                      <label
                        htmlFor={`lining-${color.fabricsColorName}`}
                        style={{ backgroundColor: `rgb(${color.fabricsColorRGB})` }}
                      ></label>
                    </Fragment>
                  );
                }) : "")}
              </div>
            </div>
          </div>
        </div>
      )}


      {product.combos ?
        product.combos.map((combo, comboIndex) => {
          return (
            <>
              <div className="product-content__size-color">
                <div className="product-content__size space-mb--20">
                  <div className="product-content__size__title">{combo.combosName}</div>
                  <div className="product-content__size__content">
                    <select
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      onChange={(event) => {
                        console.log(event.target)
                        console.log("event", event.target.value)
                        var index = event.target.selectedIndex
                        var optionElement = event.target.childNodes[index]
                        var comboId = optionElement.getAttribute('data-combo-index')
                        var fabricId = optionElement.getAttribute('data-fabric-index')
                        console.log(comboId, fabricId)
                        var tempArr = selectedComboFabric
                        tempArr[comboId].combo = comboId;
                        tempArr[comboId].fabric = fabricId;
                        setSelectedComboFabric(tempArr)
                        setSelectedFabric({ combo: comboId, fabric: fabricId })
                      }}
                    >
                      {combo.fabric &&
                        combo.fabric.map((item, i) => {
                          return (
                            <option data-combo-index={comboIndex} data-fabric-index={i} value={item.fabricsName}>{item.fabricsName}</option>
                          );
                        })
                      }
                    </select>
                  </div>
                </div>
              </div>
              <div className="product-content__size-color">
                <div className="product-content__size space-mb--20">
                  <div className="product-content__size__title"></div>
                  <div className="product-content__size__content">
                    <div className="product-content__color__content">
                      {combo.fabric.map((single, fabricIndex) => ((fabricIndex == selectedComboFabric[comboIndex].fabric && selectedFabric.fabric != null) ? single.fabricsColors.map((color, i) => {
                        return (
                          <Fragment key={i}>
                            <input
                              type="radio"
                              value={color.fabricsColorName}
                              name={`color-${selectedComboFabric[comboIndex].combo}`}
                              id={`${color.fabricsColorName}-${selectedComboFabric[comboIndex].combo}`}
                              data-combo-index={comboIndex}
                              data-fabric-index={fabricIndex}
                              data-color-index={i}
                              checked={
                                color.fabricsColorName === product.combos[selectedComboFabric[comboIndex].combo].fabric[selectedComboFabric[comboIndex].fabric].fabricsColors[selectedComboFabric[comboIndex].color].fabricsColorName ? "checked" : ""
                              }
                              onClick={() => {
                                console.log('aaaaaaaaaa')
                              }}
                              onChange={(event) => {
                                console.log("Combo", color.fabricsColorName)
                                console.log(event.target)
                                var optionElement = event.target
                                var comboId = optionElement.getAttribute('data-combo-index')
                                var fabricId = optionElement.getAttribute('data-fabric-index')
                                var colorId = optionElement.getAttribute('data-color-index')
                                var tempArr = selectedComboFabric
                                tempArr[comboId].combo = comboId;
                                tempArr[comboId].fabric = fabricId;
                                tempArr[comboId].color = colorId;
                                setSelectedComboFabric(tempArr)
                                setSelectedFabric({ combo: comboId, fabric: fabricId, color: colorId })
                                setQuantityCount(1);
                              }}
                            />
                            <label
                              htmlFor={`${color.fabricsColorName}-${selectedComboFabric[comboIndex].combo}`}
                              style={{ backgroundColor: `rgb(${color.fabricsColorRGB})` }}
                            ></label>
                          </Fragment>
                        );
                      }) : ""))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }) : (
          ""
        )}

      {product.styleAttributes ? (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20" style={{ alignItems: "baseline" }}>
            <div className="product-content__size__title">Attributes</div>
            <div className="product-content__size__content">
              {product.styleAttributes.map((attr, i) => {
                return (
                  <div className="product-content__size-color">
                    <div className="product-content__size space-mb--20">
                      <div className="product-content__size__title">{attr.styleAttrybutesName}</div>
                      <div className="product-content__size__content">
                        <select
                          style={{ width: "100%", height: "37px", cursor: "pointer" }}
                          onChange={(event) => {
                            // console.log("event", event.target.value)
                            // setSelectedLining(event.target.value.split("/")[0])
                            // setSelectedLiningFabricsColor(event.target.value.split("/")[1])
                          }}
                        >
                          {attr.styleAttrybutesValues &&
                            attr.styleAttrybutesValues.map((single, i) => {
                              return (
                                <option key={i} value={single.styleAttrybutesValueId}>{single.styleAttrybutesValueName}</option>
                              );
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {product.sizeCategories ? (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20" style={{ alignItems: "baseline" }}>
            <div className="product-content__size__title">Size</div>
            <div className="product-content__size__content">
              {product.sizeCategories.map((category, i) => {
                return (
                  <div className="product-content__size-color">
                    <div className="product-content__size space-mb--20">
                      <div className="product-content__size__title">{category.sizeCategoryName}</div>
                      <div className="product-content__size__content">
                        <select
                          style={{ width: "100%", height: "37px", cursor: "pointer" }}
                          onChange={(event) => {
                            // console.log("event", event.target.value)
                            // setSelectedLining(event.target.value.split("/")[0])
                            // setSelectedLiningFabricsColor(event.target.value.split("/")[1])
                          }}
                        >
                          {category.sizes &&
                            category.sizes.map((single, i) => {
                              return (
                                <option key={i} value={single.sizeCode}>{single.sizeName}</option>
                              );
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {product.styleAlterations ? (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Alteration</div>
            <div className="product-content__size__content">
              <MultiSelect
                options={alterationOptions}
                value={alterationSelected}
                onChange={setAlterationSelected}
                labelledBy="Select Alteration"
              />

            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {product.styleOptions ? (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Options</div>
            <div className="product-content__size__content">
              <MultiSelect
                options={styleOptions}
                value={styleOptionSelected}
                onChange={setStyleOptionSelected}
                labelledBy="Select"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {product.affiliateLink ? (
        <div className="product-content__quality">
          <div className="product-content__cart btn-hover">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
              className="lezada-button lezada-button--medium"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="product-content__quantity space-mb--40">
            <div className="product-content__quantity__title">Quantity</div>
            <div className="cart-plus-minus">
              <button
                onClick={() =>
                  setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
                }
                className="qtybutton"
              >
                -
              </button>
              <input
                className="cart-plus-minus-box"
                type="text"
                value={quantityCount}
                readOnly
              />
              <button
                onClick={() =>
                  setQuantityCount(
                    quantityCount < productStock - productCartQty
                      ? quantityCount + 1
                      : quantityCount
                  )
                }
                className="qtybutton"
              >
                +
              </button>
            </div>
          </div>

          <div className="product-content__button-wrapper d-flex align-items-center">
            <button
              onClick={() =>
                addToCart(
                  product,
                  addToast,
                  quantityCount,
                  selectedProductColor,
                  selectedProductSize
                )
              }
              disabled={productCartQty >= productStock}
              className="lezada-button lezada-button--medium product-content__cart space-mr--10"
            >
              Add To Cart
            </button>

            <button
              className={`product-content__wishlist space-mr--10 ${wishlistItem !== undefined ? "active" : ""
                }`}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={
                wishlistItem !== undefined
                  ? () => deleteFromWishlist(product, addToast)
                  : () => addToWishlist(product, addToast)
              }
            >
              <IoIosHeartEmpty />
            </button>

            <button
              className={`product-content__compare space-mr--10 ${compareItem !== undefined ? "active" : ""
                }`}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={
                compareItem !== undefined
                  ? () => deleteFromCompare(product, addToast)
                  : () => addToCompare(product, addToast)
              }
            >
              <IoIosShuffle />
            </button>
          </div>

          <div className="product-content__other-info space-mt--50">
            <table>
              <tbody>
                <tr className="single-info">
                  <td className="title">Product Code: </td>
                  <td className="value">{product.productCode}</td>
                </tr>
                <tr className="single-info">
                  <td className="title">Product Type: </td>
                  <td className="value">
                    {product.productType &&
                      (
                        <Link
                          href="/shop/left-sidebar"
                          as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
                        >
                          <a>
                            {product.productType}
                          </a>
                        </Link>
                      )}
                  </td>
                </tr>
                <tr className="single-info">
                  <td className="title">Short Tag: </td>
                  <td className="value">
                    {product.shortTag &&
                      (
                        <Link
                          href="/shop/left-sidebar"
                          as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
                        >
                          <a>
                            {product.shortTag}
                          </a>
                        </Link>
                      )}
                  </td>
                </tr>
                <tr className="single-info">
                  <td className="title">Share on: </td>
                  <td className="value">
                    <ul className="social-icons">
                      <li>
                        <a href="https://www.twitter.com">
                          <FaTwitter />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.facebook.com">
                          <FaFacebookF />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com">
                          <FaInstagram />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com">
                          <FaYoutube />
                        </a>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ProductDescription;
