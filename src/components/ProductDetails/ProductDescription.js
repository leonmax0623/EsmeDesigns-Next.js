import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from "react";
import { IoIosHeartEmpty, IoIosShuffle } from "react-icons/io";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch } from 'react-redux';
import { Tooltip } from "react-tippy";
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
  addToBulk,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare
}) => {
  console.log("Maximus ProductDescription=>", product)
  const router = useRouter()
  const dispatch = useDispatch();
  //custom 
  const [selectedLining, setSelectedLining] = useState("");
  const [selectedLiningFabricsColor, setSelectedLiningFabricsColor] = useState("");
  const [selectedFabrics, setSelectedFabrics] = useState("");
  const [selectedFabricsColor, setSelectedFabricsColor] = useState("");
  const [selectedSizeCategory, setSelectedSizeCategory] = useState(
    product.sizeCategories && product.sizeCategories.length > 0 ? product.sizeCategories[0].sizeCategoryName : ""
  );

  const [selectedCategorySizeValue, setSelectedCategorySizeValue] = useState(
    product.sizeCategories && product.sizeCategories.length > 0 ? product.sizeCategories[0].sizes[0].sizeName : ""
  );
  const [alterationSelected, setAlterationSelected] = useState([]);
  const [styleOptionSelected, setStyleOptionSelected] = useState([]);

  useEffect(() => {
    if (product) {
      if (product.lining && product.lining.length > 0) {
        setSelectedLining(product.selectedLining ? product.selectedLining : product.lining[0].fabricsId)
      }
      if (product.lining && product.lining.length > 0) {
        setSelectedLiningFabricsColor(product.selectedLiningFabricsColor ? product.selectedLiningFabricsColor : product.lining[0].fabricsColor[0].fabricColorName)
      }
      if (product.fabrics && product.fabrics.length > 0) {
        setSelectedFabrics(product.selectedFabrics ? product.selectedFabrics : product.fabrics[0].fabricsId)
      }
      if (product.fabrics && product.fabrics.length > 0) {
        setSelectedFabricsColor(product.selectedFabricsColor ? product.selectedFabricsColor : product.fabrics[0].fabricsColor[0].fabricColorName)
      }

      if (product.selectedAlteration) {
        setAlterationSelected(product.selectedAlteration)
      }

      if (product.selectedStyleOption) {
        setStyleOptionSelected(product.selectedStyleOption)
      }

      if (product.selectedAttr && product.selectedAttr.length > 1) {
        setSelectedAttr(product.selectedAttr);
      } else {
        product.styleAttributes.length > 0 && product.styleAttributes.map((item) => {
          if (item.styleAttrybutesValues && item.styleAttrybutesValues.length > 0) {
            setSelectedAttr((old) => [...old, { attr: item.styleAttrybutesName, value: item.styleAttrybutesValues[0].styleAttrybutesValueName }]);
          }
        });
      }

      if (product.comboArray) {
        setComboArray(product.comboArray);
      } else {
        product.combos && product.combos.map((item) => {
          setComboArray((old) => [...old, { combo: item.combosName, fabric: { fabric_index: 0, fabric_name: item.fabric[0].fabricsName, color: { color_name: item.fabric[0].fabricsColor[0].fabricColorName, rgb: item.fabric[0].fabricsColor[0].fabricsColorRGB } } }]);
        });
      }
    }
  }, [product]);

  //custom
  const alterationOptions = [];
  product.styleAlterations && product.styleAlterations.map((single, i) => {
    let array = {
      label: "",
      value: ""
    };
    array.label = single.styleAlterationName;
    array.value = single.price;
    alterationOptions.push(array)
  });

  const styleOptions = [];
  product.styleOptions && product.styleOptions.map((single, i) => {
    let array = {
      label: "",
      value: ""
    };
    array.label = single.styleOptionName;
    array.value = single.price;
    styleOptions.push(array)
  });

  const bulkOrder = (product) => {
    addToBulk(product);
    router.push('/other/bulk')
  }

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  const [selectedAttr, setSelectedAttr] = useState([]);

  const handleAttributeChange = (event, attribute) => {
    let array = [...selectedAttr];

    for (let i = 0; i < array.length; i += 1) {
      if (array[i].attr === attribute) {
        array[i].value = event.target.value;

        break;
      }
    }

    setSelectedAttr(array);
  }

  const [comboArray, setComboArray] = useState([])

  const handleComboFabricChange = (combo_name) => (e) => {
    let array = [...comboArray];
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    var comboId = optionElement.getAttribute('data-combo-index');
    var fabricId = optionElement.getAttribute('data-fabric-index');

    array[comboId].fabric.fabric_name = e.target.value;
    array[comboId].fabric.fabric_index = fabricId;

    setComboArray(array);
  }

  const handleComboFabricColorsChange = (e) => {
    let array = [...comboArray];
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    var comboId = optionElement.getAttribute('data-combo-index');
    var fabricId = optionElement.getAttribute('data-fabric-index');
    var colorId = optionElement.getAttribute('data-color-index');

    array[comboId].fabric.color.color_name = e.target.value;
    array[comboId].fabric.color.rgb = product.combos[comboId].fabric[fabricId].fabricsColor[colorId].fabricsColorRGB;

    setComboArray(array);
  }

  const handleComboFabricColorsRadioChange = (comboIndex, color_name) => (e) => {
    let array = [...comboArray];

    array[comboIndex].fabric.color.color_name = color_name;
    setComboArray(array);
  }


  //custom
  const [productStock, setProductStock] = useState(
    product.inStock ? product.inStock : 0
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product
  );

  const myTest = (
    product,
    addToast,
    quantityCount,
    selectedFabrics,
    selectedFabricsColor,
    selectedLining,
    selectedLiningFabricsColor,
    comboArray,
    selectedAttr,
    selectedCategorySizeValue,
    alterationSelected,
    styleOptionSelected
  ) => {
    // console.log("Cart product", product)
    // console.log("Cart quantityCount", quantityCount)
    // console.log("Cart selectedFabrics", selectedFabrics)
    // console.log("Cart selectedFabricsColor", selectedFabricsColor)
    // console.log("Cart selectedLining", selectedLining)
    // console.log("Cart selectedLiningFabricsColor", selectedLiningFabricsColor)
    // console.log("Cart comboArray", comboArray)
    // console.log("Cart selectedAttr", selectedAttr)
    // console.log("Cart selectedSize", selectedCategorySizeValue)
    // console.log("Cart alterationSelected", alterationSelected)
    // console.log("Cart styleOptionSelected", styleOptionSelected)
  }

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
      {product.productCode && (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Product Code</div>
            <div className="product-content__size__content">
              <span>{product.productCode}</span>
            </div>
          </div>
        </div>
      )}
      {product.productType && (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Product Type</div>
            <div className="product-content__size__content">
              <span>{product.productType}</span>
            </div>
          </div>
        </div>
      )}
      {product.shortTag && (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Short Tag</div>
            <div className="product-content__size__content">
              <span>{product.shortTag}</span>
            </div>
          </div>
        </div>
      )}

      {product.fabrics && product.fabrics.length > 0 ? (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Fabrics</div>
            <div className="product-content__size__content">
              <select
                style={{ width: "100%", height: "37px", cursor: "pointer" }}
                value={selectedFabrics}
                onChange={(event) => {
                  setSelectedFabrics(event.target.value)
                  setSelectedFabricsColor(product.fabrics.find(x => x.fabricsId === event.target.value).fabricsColor[0].fabricColorName)
                }}
              >
                {product.fabrics &&
                  product.fabrics.map((single, i) => {
                    return (
                      <option key={i} value={single.fabricsId}>{single.fabricsName}</option>
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
                <select
                  style={{ width: "100%", height: "37px", cursor: "pointer" }}
                  value={selectedFabricsColor}
                  onChange={(event) => {
                    setSelectedFabricsColor(event.target.value);
                  }}
                >
                  {product.fabrics.map((single, j) => single.fabricsId === selectedFabrics ? single.fabricsColor.map((color, i) => {
                    return (
                      <option key={i} value={color.fabricColorName}>{color.fabricColorName}</option>
                    );
                  }) : "")}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedFabricsColor && (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title"></div>
            <div className="product-content__size__content">
              <div className="product-content__color__content">
                {product.fabrics.map((single, i) => single.fabricsId === selectedFabrics ? single.fabricsColor.map((color, i) => {
                  return (
                    <Tooltip
                      title={
                        color.fabricColorName
                      }
                      position="bottom"
                      trigger="mouseenter"
                      animation="shift"
                      arrow={true}
                      duration={200}
                      style={{ marginLeft: "15px" }}
                    >
                      <Fragment key={i}>
                        <input
                          type="radio"
                          value={color.fabricColorName}
                          name={`fabrics-${color.fabricColorName}`}
                          id={`fabrics-${color.fabricColorName}`}
                          checked={
                            color.fabricColorName === selectedFabricsColor ? "checked" : ""
                          }
                          onChange={() => {
                            setSelectedFabricsColor(color.fabricColorName);
                            setQuantityCount(1);
                          }}
                        />
                        <label
                          htmlFor={`fabrics-${color.fabricColorName}`}
                          style={{ backgroundColor: `rgb(${color.fabricsColorRGB ? color.fabricsColorRGB : "98,98,98"})` }}
                        ></label>
                      </Fragment>
                    </Tooltip>
                  );
                }) : "")}
              </div>
            </div>
          </div>
        </div>
      )}
      {product.lining && product.lining.length > 0 ? (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Lining</div>
            <div className="product-content__size__content">
              <select
                style={{ width: "100%", height: "37px", cursor: "pointer" }}
                value={selectedLining}
                onChange={(event) => {
                  setSelectedLining(event.target.value)
                  setSelectedLiningFabricsColor(product.lining.find(x => x.fabricsId === event.target.value).fabricsColor[0].fabricColorName)
                }}
              >
                {product.lining &&
                  product.lining.map((single, i) => {
                    return (
                      <option key={i} value={single.fabricsId}>{single.fabricsName}</option>
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
                <select
                  style={{ width: "100%", height: "37px", cursor: "pointer" }}
                  value={selectedLiningFabricsColor}
                  onChange={(event) => {
                    setSelectedLiningFabricsColor(event.target.value);
                  }}
                >
                  {product.lining.map((single, j) => single.fabricsId === selectedLining ? single.fabricsColor.map((color, i) => {
                    return (
                      <option key={i} value={color.fabricColorName}>{color.fabricColorName}</option>
                    );
                  }) : "")}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedLiningFabricsColor && (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title"></div>
            <div className="product-content__size__content">
              <div className="product-content__color__content">
                {product.lining.map((single, i) => single.fabricsId === selectedLining ? single.fabricsColor.map((color, i) => {
                  return (
                    <Tooltip
                      title={
                        color.fabricColorName
                      }
                      position="bottom"
                      trigger="mouseenter"
                      animation="shift"
                      arrow={true}
                      duration={200}
                      style={{ marginLeft: "15px" }}
                    >
                      <Fragment key={i}>
                        <input
                          type="radio"
                          value={color.fabricColorName}
                          name="lining-color"
                          id={`lining-${color.fabricColorName}`}
                          checked={
                            color.fabricColorName === selectedLiningFabricsColor ? "checked" : ""
                          }
                          onChange={() => {
                            setSelectedLiningFabricsColor(color.fabricColorName);
                            setQuantityCount(1);
                          }}
                        />
                        <label
                          htmlFor={`lining-${color.fabricColorName}`}
                          style={{ backgroundColor: `rgb(${color.fabricsColorRGB})` }}
                        ></label>
                      </Fragment>
                    </Tooltip>
                  );
                }) : "")}
              </div>
            </div>
          </div>
        </div>
      )}
      {(product.combos && product.combos.length > 0) ? product.combos.map((combo, comboIndex) => {
        return (
          <>
            <div className="product-content__size-color">
              <div className="product-content__size space-mb--20">
                <div className="product-content__size__title">{combo.combosName}</div>
                <div className="product-content__size__content">
                  <select
                    style={{ width: "100%", height: "37px", cursor: "pointer" }}
                    value={product.comboArray ? product.comboArray[comboIndex].fabric.fabric_name : comboArray[comboIndex]?.fabric.fabric_name ?? ''}
                    onChange={handleComboFabricChange(combo.combosName)}
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
                    <select
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      value={comboArray[comboIndex]?.fabric.color.color_name ?? ''}
                      onChange={handleComboFabricColorsChange}
                    >
                      {combo.fabric[comboArray[comboIndex]?.fabric.fabric_index ?? 0].fabricsColor.map((color, i) => {
                        return (
                          <option data-combo-index={comboIndex} data-fabric-index={comboArray[comboIndex]?.fabric.fabric_index ?? 0} data-color-index={i} value={color.fabricColorName}>{color.fabricColorName}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>


            <div className="product-content__size-color">
              <div className="product-content__size space-mb--20">
                <div className="product-content__size__title"></div>
                <div className="product-content__size__content">
                  <div className="product-content__color__content">
                    {combo.fabric[comboArray[comboIndex]?.fabric.fabric_index ?? 0].fabricsColor.map((color, i) => {
                      return (
                        <Tooltip
                          title={
                            color.fabricColorName
                          }
                          position="bottom"
                          trigger="mouseenter"
                          animation="shift"
                          arrow={true}
                          duration={200}
                          style={{ marginLeft: "15px" }}
                        >
                          <Fragment key={i}>
                            <input
                              type="radio"
                              value={color.fabricColorName}
                              name={`${combo.combosName}-${color.fabricColorName}-${i}`}
                              id={`${combo.combosName}-${color.fabricColorName}-${i}`}
                              checked={
                                color.fabricColorName === comboArray[comboIndex]?.fabric.color.color_name ?? '' ? true : false
                              }
                              onChange={handleComboFabricColorsRadioChange(comboIndex, color.fabricColorName)}
                            />
                            <label
                              htmlFor={`${combo.combosName}-${color.fabricColorName}-${i}`}
                              style={{ backgroundColor: `rgb(${color.fabricsColorRGB})` }}
                            ></label>
                          </Fragment>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }) : (
        ""
      )}
      {product.styleAttributes && product.styleAttributes.length > 0 && product.styleAttributes.map((item, i) => {
        return (
          <div className="product-content__size-color">
            {item.styleAttrybutesValues && item.styleAttrybutesValues.length > 0 && (
              <div className="product-content__size space-mb--20">
                <div className="product-content__size__title">{item.styleAttrybutesName}</div>
                <div className="product-content__size__content">
                  <select
                    style={{ width: "100%", height: "37px", cursor: "pointer" }}
                    value={selectedAttr && selectedAttr.length > 1 && selectedAttr[i].attr === item.styleAttrybutesName ? selectedAttr[i].value : ""}
                    onChange={(event) => {
                      handleAttributeChange(event, item.styleAttrybutesName)
                    }}
                  >
                    {item.styleAttrybutesValues &&
                      item.styleAttrybutesValues.map((single, j) => {
                        return (
                          <option key={j} value={single.styleAttrybutesValueName} > {single.styleAttrybutesValueName}</option>
                        );
                      })
                    }
                  </select>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {product.sizeCategories && product.sizeCategories.length > 0 ? (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Size Category</div>
            <div className="product-content__size__content">
              <select
                style={{ width: "100%", height: "37px", cursor: "pointer" }}
                onChange={(event) => {
                  setSelectedSizeCategory(event.target.value)
                }}
              >
                {product.sizeCategories &&
                  product.sizeCategories.map((size, i) => {
                    return (
                      <option key={i} value={size.sizeCategoryName}>{size.sizeCategoryName}</option>
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
      {selectedSizeCategory && (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title"></div>
            <div className="product-content__size__content">
              <div className="product-content__color__content">
                <select
                  style={{ width: "100%", height: "37px", cursor: "pointer" }}
                  onChange={(event) => {
                    setSelectedCategorySizeValue(event.target.value);
                  }}
                >
                  {product.sizeCategories.map((single, j) => single.sizeCategoryName === selectedSizeCategory ? single.sizes.map((size, i) => {
                    return (
                      <option key={i} value={size.sizeName}>{size.sizeName}</option>
                    );
                  }) : "")}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {product.styleAlterations && product.styleAlterations.length > 0 ? (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Alteration</div>
            <div className="product-content__size__content">
              <MultiSelect
                options={alterationOptions}
                value={alterationSelected}
                onChange={setAlterationSelected}
                labelledBy="Select Alteration"
                hasSelectAll={false}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {product.styleOptions && product.styleOptions.length > 0 ? (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Options</div>
            <div className="product-content__size__content">
              <MultiSelect
                options={styleOptions}
                value={styleOptionSelected}
                onChange={setStyleOptionSelected}
                labelledBy="Select"
                hasSelectAll={false}
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
                  setQuantityCount(quantityCount + 1)
                }
                className="qtybutton"
              >
                +
              </button>
            </div>
            <p style={{ marginLeft: "20px" }}>Products in Stock: <span>{productStock - productCartQty - quantityCount}</span><br />Out of Stocks:<span>{Math.abs(quantityCount - productStock - productCartQty)}</span></p>
          </div>

          <div className="product-content__button-wrapper d-flex align-items-center">
            <button
              onClick={() =>
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
                // myTest(
                //   product,
                //   addToast,
                //   quantityCount,
                //   selectedFabrics,
                //   selectedFabricsColor,
                //   selectedLining,
                //   selectedLiningFabricsColor,
                //   comboArray,
                //   selectedAttr,
                //   selectedCategorySizeValue,
                //   alterationSelected,
                //   styleOptionSelected
                // )
              }
              className="lezada-button lezada-button--medium product-content__cart space-mr--10"
            >
              Add To Cart
            </button>
            <button
              onClick={() =>
                bulkOrder(
                  product
                )
              }
              className="lezada-button lezada-button--medium product-content__cart space-mr--10"
            >
              Bulk Order
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

          {/* <div className="product-content__other-info space-mt--50">
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
              </tbody>
            </table>
          </div> */}
        </Fragment>
      )}
    </div>
  );
};

export default ProductDescription;
