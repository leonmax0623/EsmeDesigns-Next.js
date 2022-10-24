import { useRouter } from 'next/router';
import { Fragment, useEffect, useMemo, useState } from "react";
import { Col } from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { IoIosHeartEmpty, IoIosInformationCircleOutline } from "react-icons/io";
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
  // compareItem,
  addToast,
  addToCart,
  addToBulk,
  addToWishlist,
  deleteFromWishlist,
  // addToCompare,
  // deleteFromCompare,
  changePicture,
  // preventAddingToCart,
  disallowRush,
  showRating
}) => {
  console.log("Maximus ProductDescription=>", product)
  const router = useRouter()
  const dispatch = useDispatch();

  const [wearDate, setWearDate] = useState(new Date());
  const [shipDate, setShipDate] = useState(new Date());
  const [rushError, setRushError] = useState(true)
  const [comboArray, setComboArray] = useState([])

  //custom 
  const [selectedLining, setSelectedLining] = useState("");
  const [selectedRushOptionId, setSelectedRushOptionId] = useState("999");
  const [selectedRushOption, setSelectedRushOption] = useState("");
  const [selectedLiningFabricsColor, setSelectedLiningFabricsColor] = useState("");
  const [selectedLiningFabricsColorId, setSelectedLiningFabricsColorId] = useState("");
  const [selectedFabrics, setSelectedFabrics] = useState("");
  const [selectedFabricsColor, setSelectedFabricsColor] = useState("");
  const [selectedFabricsColorId, setSelectedFabricsColorId] = useState("");
  const [selectedAttr, setSelectedAttr] = useState([]);
  const [selectedSizeCategory, setSelectedSizeCategory] = useState(
    product.sizeCategories && product.sizeCategories.length > 0 ? product.sizeCategories[0].sizeCategoryName : ""
  );
  const [selectedSizeCategoryId, setSelectedSizeCategoryId] = useState(
    product.sizeCategories && product.sizeCategories.length > 0 ? product.sizeCategories[0].sizeCategoryId : ""
  );

  const [selectedCategorySizeValue, setSelectedCategorySizeValue] = useState(
    product.sizeCategories && product.sizeCategories.length > 0 ? product.sizeCategories[0].sizes[0].sizeName : ""
  );
  const [selectedCategorySizeValueId, setSelectedCategorySizeValueId] = useState(
    product.sizeCategories && product.sizeCategories.length > 0 ? product.sizeCategories[0].sizes[0].sizeId : ""
  );
  const [alterationSelected, setAlterationSelected] = useState([]);
  const [styleOptionSelected, setStyleOptionSelected] = useState([]);
  const [extraPrice, setExtraPrice] = useState(0)
  const [productStock, setProductStock] = useState(
    product.inStock ? product.inStock : 0
  );
  const [quantityCount, setQuantityCount] = useState(1);

  useMemo(() => {
    if (product.lining && product.lining.length > 0) {
      setSelectedLining(product.selectedLining ? product.selectedLining : product.lining[0].fabricsId)
      setSelectedLiningFabricsColor(product.selectedLiningFabricsColor ? product.selectedLiningFabricsColor : product.lining[0].fabricsColor[0].fabricColorName)
      setSelectedLiningFabricsColorId(product.selectedLiningFabricsColors ? product.selectedLiningFabricsColor : product.lining[0].fabricsColor[0].fabricsColorId)
    }
  }, [product.lining])

  useMemo(() => {
    if (product.fabrics && product.fabrics.length > 0) {
      setSelectedFabrics(product.selectedFabrics ? product.selectedFabrics : product.fabrics[0].fabricsId)
      setSelectedFabricsColor(selectedFabricsColor ? selectedFabricsColor : product.fabrics[0].fabricsColor[0].fabricColorName)
      setSelectedFabricsColorId(product.fabrics[0].fabricsColor[0].fabricsColorId)

    }
  }, [product.fabrics])

  useMemo(() => {
    if (product.comboArray) {
      setComboArray(product.comboArray);
    } else {
      let comboTempArray = []
      product.combos && product.combos.map((item) => {
        comboTempArray[comboTempArray.length] = {
          combo: item.combosName,
          comboId: item.combosId,
          fabric: {
            fabric_index: 0,
            fabric_name: item.fabric[0].fabricsName,
            fabric_id: item.fabric[0].fabricsId,
            color: {
              color_name: item.fabric[0].fabricsColor[0].fabricColorName,
              color_id: item.fabric[0].fabricsColor[0].fabricsColorId,
              rgb: item.fabric[0].fabricsColor[0].fabricsColorRGB
            }
          }
        }
      });
      setComboArray(comboTempArray);
    }
  }, [product.comboArray])

  console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHH", comboArray)

  useMemo(() => {
    if (product.selectedAttr && product.selectedAttr.length > 0) {
      setSelectedAttr(product.selectedAttr);
    } else {
      let selectedAttrArray = []
      product.styleAttributes.length > 0 && product.styleAttributes.map((item) => {
        if (item.styleAttrybutesValues && item.styleAttrybutesValues.length > 0) {
          selectedAttrArray[selectedAttrArray.length] = { attr: item.styleAttrybutesName, attrId: item.styleAttrybutesId, value: item.styleAttrybutesValues[0].styleAttrybutesValueName, valueId: item.styleAttrybutesValues[0].styleAttrybutesValueId }
        }
      });
      setSelectedAttr(selectedAttrArray);
    }
  }, [product.styleAttributes])

  // useEffect(() => {
  //   if (product) {
  //     // if (product.lining && product.lining.length > 0) {
  //     //   setSelectedLining(product.selectedLining ? product.selectedLining : product.lining[0].fabricsId)
  //     // }
  //     // if (product.lining && product.lining.length > 0) {
  //     //   setSelectedLiningFabricsColor(product.selectedLiningFabricsColor ? product.selectedLiningFabricsColor : product.lining[0].fabricsColor[0].fabricColorName)
  //     // }
  //     // if (product.lining && product.lining.length > 0) {
  //     //   setSelectedLiningFabricsColorId(product.selectedLiningFabricsColors ? product.selectedLiningFabricsColor : product.lining[0].fabricsColor[0].fabricsColorId)
  //     // }
  //     // if (product.fabrics && product.fabrics.length > 0) {
  //     //   setSelectedFabrics(product.selectedFabrics ? product.selectedFabrics : product.fabrics[0].fabricsId)
  //     // }
  //     // if (product.fabrics && product.fabrics.length > 0) {
  //     //   setSelectedFabricsColor(selectedFabricsColor ? selectedFabricsColor : product.fabrics[0].fabricsColor[0].fabricColorName)
  //     // }
  //     // if (product.fabrics && product.fabrics.length > 0) {
  //     //   setSelectedFabricsColorId(selectedFabricsColor ? selectedFabricsColor : product.fabrics[0].fabricsColor[0].fabricsColorId)
  //     // }

  //     // if (product.styleAlterations) {
  //     //   setAlterationSelected(product.styleAlterations)
  //     // }

  //     // if (product.styleOptions) {
  //     //   setStyleOptionSelected(product.styleOptions)
  //     // }


  //   }
  // }, [product]);

  //custom
  const alterationOptions = [];
  product.styleAlterations && product.styleAlterations.map((single, i) => {
    let array = {
      label: '',
      value: '',
      price: "",
      id: ''
    };
    array.label = single.styleAlterationName + ' ' + `($${single.price})`;
    array.value = single.styleAlterationId;
    array.price = single.price;
    array.id = single.styleAlterationId;
    alterationOptions.push(array)
  });

  const styleOptions = [];
  product.styleOptions && product.styleOptions.map((single, i) => {
    let array = {
      label: "",
      value: "",
      price: "",
      id: ''
    };
    array.label = single.styleOptionName + ' ' + `($${single.price})`;
    array.value = single.styleOptionId;
    array.price = single.price;
    array.id = single.styleOptionId;
    styleOptions.push(array)
  });

  const bulkOrder = (product) => {
    addToBulk(product);
    localStorage.setItem('router', '/other/bulk')
    router.push('/other/bulk')
  }

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });



  const handleAttributeChange = (event, attribute) => {
    let array = JSON.parse(JSON.stringify(selectedAttr));//[...selectedAttr];
    for (let i = 0; i < array.length; i++) {
      if (array[i].attr === attribute) {
        array[i].value = event.target.value;

        break;
      }
    }

    setSelectedAttr(array);
  }



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

  const productCartQty = getProductCartQuantity(
    cartItems,
    product
  );

  const handleChangePicture = (colorId, coloName) => {
    changePicture(colorId)
    // localStorage.setItem("imageFabricsColorId", colorId)
  }

  const handleStyleOption = (options) => {
    let testExtra = 0;
    setStyleOptionSelected(options)
    const sum = sumExtraPrices(options);
    let alterationSum = 0;
    if (alterationSelected.length > 0) alterationSum = sumExtraPrices(alterationSelected);
    setExtraPrice(sum + alterationSum);
  }

  const handleAlterationOption = (options) => {
    let testExtra = 0;
    setAlterationSelected(options)
    const sum = sumExtraPrices(options);
    let styleOptionSum = 0;
    if (styleOptionSelected.length > 0) styleOptionSum = sumExtraPrices(styleOptionSelected);
    setExtraPrice(sum + styleOptionSum);
  }

  const handleRushDate = (e) => {
    console.log("EEEEE", e)
    setWearDate(e)
  }

  const sumExtraPrices = (arr) => {
    return arr.reduce((a, b) => { return a + parseInt(b.price) }, 0);
  }

  const handleSelectRushOption = (val) => {
    const selectedOption = product.rushOptions.filter((option, i) => option.rushId === val);
    const leadTime = selectedOption[0].leadTime;
    const today = new Date();
    const estimatedShipDate = new Date(today.getTime() + parseInt(leadTime) * 7 * 24 * 60 * 60 * 1000);
    setShipDate(estimatedShipDate);
    setSelectedRushOptionId(val);
    setSelectedRushOption(selectedOption);
  }

  useEffect(() => {
    if (selectedRushOptionId !== "999") {

      if (shipDate.getTime() > wearDate.getTime()) {
        disallowRush(true);
        setRushError(true)
      } else {
        disallowRush(false);
        setRushError(false)
      }
    }
  }, [wearDate, selectedRushOptionId])

  const handleAddToCart = (
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
    selectedRushOption
  ) => {
    // if (cartItems.length === 0) {
    // localStorage.setItem("rushOptions", JSON.stringify(product.rushOptions))
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
      selectedSizeCategoryId,
      selectedCategorySizeValue,
      selectedCategorySizeValueId,
      alterationSelected,
      styleOptionSelected,
      extraPrice,
      wearDate,
      shipDate,
      selectedRushOption
    )
    // } else {
    //   let commonRushOptions = JSON.parse(localStorage.getItem("rushOptions"));
    //   const filteredOptions = commonRushOptions.filter(option => product.rushOptions.findIndex(bItem => bItem.rushId === option.rushId) >= 0)
    //   console.log("Maximus commonRushOptions => ", commonRushOptions)
    //   console.log("Maximus product.rushOptions => ", product.rushOptions)
    //   console.log("Maximus => ", filteredOptions)
    //   if (filteredOptions.length > 0) {
    //     localStorage.setItem("rushOptions", JSON.stringify(filteredOptions))
    //     addToCart(
    //       product,
    //       addToast,
    //       quantityCount,
    //       selectedFabrics,
    //       selectedFabricsColor,
    //       selectedLining,
    //       selectedLiningFabricsColor,
    //       comboArray,
    //       selectedAttr,
    //       selectedSizeCategory,
    //       selectedCategorySizeValue,
    //       alterationSelected,
    //       styleOptionSelected,
    //       extraPrice)
    //   } else {
    //     preventAddingToCart(product, addToast)
    //   }
    // }

  }

  return (
    <div className="product-content">
      {showRating === "True" && product.reviewList && product.reviewList.length > 0 ? (
        <div className="product-content__rating-wrap d-block d-sm-flex space-mb--20">
          <div className="product-content__rating space-mr--20">
            <ProductRating ratingValue={product.reviewList.reduce((ac, a) => parseInt(a.rating) + ac, 0) / product.reviewList.length} />
          </div>
          <div className="product-content__rating-count">
            <a href="#">( {product.reviewList.length} customer reviews )</a>
          </div>
        </div>
      ) : (
        ""
      )}
      <h2 className="product-content__title space-mb--20">{product.productName}</h2>
      <div className="product-content__price space-mb--20">
        {parseInt(product.discountedPrice) > 0 && parseInt(product.standardPrice) > parseInt(product.discountedPrice) ? (
          <Fragment>
            <span className="main-price discounted">${productPrice}</span>
            <span className="main-price">${discountedPrice}</span>
          </Fragment>
        ) : (
          <span className="main-price">${productPrice} </span>
        )}
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
                  console.log("KKKKKKK", event.target.value)
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
                  onChange={(event) => {
                    // console.log("!!!!!!!!!", event.target.value.split("/")[1])
                    setSelectedFabricsColor(event.target.value.split("/")[1]);
                    setSelectedFabricsColorId(event.target.value.split("/")[0]);
                    handleChangePicture(event.target.value.split("/")[0], event.target.value.split("/")[1])
                  }}
                >
                  {product.fabrics.map((single, j) => single.fabricsId === selectedFabrics ? single.fabricsColor.map((color, i) => {
                    return (
                      <option key={i} selected={selectedFabricsColor === color.fabricColorName} value={`${color.fabricsColorId}/${color.fabricColorName}`}>{color.fabricColorName}</option>
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
                      key={i}
                      title={
                        `${color.fabricColorName}/${color.fabricsColorId}`
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
                            setSelectedFabricsColorId(color.fabricsColorId);
                            handleChangePicture(color.fabricsColorId, color.fabricColorName)
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
                    setSelectedLiningFabricsColor(event.target.value.split("/")[1]);
                    setSelectedLiningFabricsColorId(event.target.value.split("/")[0]);
                  }}
                >
                  {product.lining.map((single, j) => single.fabricsId === selectedLining ? single.fabricsColor.map((color, i) => {
                    return (
                      <option key={i} value={`${color.fabricsColorId}/${color.fabricColorName}`}>{color.fabricColorName}</option>
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
                      key={i}
                      title={
                        `${color.fabricColorName}/${color.fabricsColorId}`
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
                            setSelectedLiningFabricsColorId(color.fabricsColorId);
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
          <div key={comboIndex}>
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
                          <option key={i} data-combo-index={comboIndex} data-fabric-index={i} value={item.fabricsName}>{item.fabricsName}</option>
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
                          <option key={i} data-combo-index={comboIndex} data-fabric-index={comboArray[comboIndex]?.fabric.fabric_index ?? 0} data-color-index={i} value={color.fabricColorName}>{color.fabricColorName}</option>
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
                          key={i}
                          title={
                            `${color.fabricColorName}/${color.fabricsColorId}`
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
          </div>
        );
      }) : (
        ""
      )}
      {product.styleAttributes && product.styleAttributes.length > 0 && product.styleAttributes.map((item, i) => {
        return (
          <div key={i} className="product-content__size-color">
            {item.styleAttrybutesValues && item.styleAttrybutesValues.length > 0 && (
              <div className="product-content__size space-mb--20">
                <div className="product-content__size__title">{item.styleAttrybutesName}</div>
                <div className="product-content__size__content">
                  <select
                    style={{ width: "100%", height: "37px", cursor: "pointer" }}
                    value={selectedAttr && selectedAttr.length > 0 && selectedAttr[i].attr === item.styleAttrybutesName ? selectedAttr[i].value : ""}
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
                  setSelectedSizeCategory(event.target.value.split("/")[1])
                  setSelectedSizeCategoryId(event.target.value.split("/")[0])
                }}
              >
                {product.sizeCategories &&
                  product.sizeCategories.map((size, i) => {
                    return (
                      <option key={i} value={`${size.sizeCategoryId}/${size.sizeCategoryName}`}>{size.sizeCategoryName}</option>
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
                    setSelectedCategorySizeValue(event.target.value.split("/")[1]);
                    setSelectedCategorySizeValueId(event.target.value.split("/")[0]);
                  }}
                >
                  {product.sizeCategories.map((single, j) => single.sizeCategoryName === selectedSizeCategory ? single.sizes.map((size, i) => {
                    return (
                      <option key={i} value={`${size.sizeId}/${size.sizeName}`}>{size.sizeName}</option>
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
                onChange={handleAlterationOption}
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
                onChange={handleStyleOption}
                labelledBy="Select"
                hasSelectAll={false}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <Fragment class="descTable">
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
          {product.showStock && (
            <p style={{ marginLeft: "20px" }}>Products in Stock: <span>{productStock - productCartQty - quantityCount}</span><br />Out of Stocks:<span>{Math.abs(quantityCount - productStock - productCartQty)}</span></p>
          )}
        </div>

        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Wear date</div>
            <div className="product-content__size__content">
              <DatePicker onChange={handleRushDate} value={wearDate} />
            </div>
          </div>
        </div>

        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Lead time</div>
            <div className="product-content__size__content">
              <select
                style={{ width: "100%", height: "37px", cursor: "pointer" }}
                onChange={(event) => {
                  handleSelectRushOption(event.target.value)
                }}
                selected={selectedRushOptionId}
              >
                <option key={999} value="999">-- Select the rush option --</option>
                {product.rushOptions &&
                  product.rushOptions.map((single, i) => {
                    return (
                      <option key={i} value={single.rushId}>{single.rushName}</option>
                    );
                  })
                }
              </select>
            </div>
          </div>
        </div>

        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Estimated ship date</div>
            <div className="product-content__size__content">
              <DatePicker disabled value={shipDate} />
            </div>
          </div>
        </div>

        <div className="price-table descTableMob" style={{ padding: "10px 0px", border: "1px solid", marginBottom: "20px" }}>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <Col lg={3}><div className="product-content__size__title">Price: </div></Col>
            <Col lg={3}><div className="product-content__size__content">
              <span>${parseInt(product.discountedPrice).toFixed(2)}</span>
            </div></Col>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <Col lg={3}><div className="product-content__size__title">Quantity: </div></Col>
            <Col lg={3}><div className="product-content__size__content">
              <span>{quantityCount}</span>
            </div></Col>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <Col lg={3}><div className="product-content__size__title">Extras: </div></Col>
            <Col lg={3}><div className="product-content__size__content">
              <span>${(extraPrice * quantityCount).toFixed(2)}</span>
            </div></Col>
          </div>
          <div style={{ display: "flex" }}>
            <Col lg={3}><div className="product-content__size__title">Total: </div></Col>
            <Col lg={3}><div className="product-content__size__content">
              <span>${parseInt(product.discountedPrice) * quantityCount + (extraPrice * quantityCount).toFixed(2)}</span>
            </div></Col>
          </div>
        </div>



        <table className="cart-table descTableDes" style={{ marginBottom: "30px" }}>
          <thead>
            <tr>
              <th className="product-price" style={{ fontSize: "14px", textAlign: "center", padding: "5px 12px" }}>Price</th>
              <th className="product-price" style={{ fontSize: "14px", textAlign: "center", padding: "5px 12px" }}>Quantity </th>
              <th className="product-quantity" style={{ fontSize: "14px", textAlign: "center", padding: "5px 12px" }}>
                Extras
                {extraPrice > 0 && (
                  <Tooltip
                    interactive
                    html={(
                      <div style={{ textAlign: "left" }}>
                        {alterationSelected.concat(styleOptionSelected).map((item, i) => {
                          return (
                            <p style={{ margin: "5px" }}>- {item.label}: ${item.price}</p>
                          )
                        })}
                      </div>
                    )}
                    position="bottom"
                    trigger="mouseenter"
                    animation="shift"
                    arrow={true}
                    duration={200}
                    style={{ cursor: "pointer" }}
                  >
                    <IoIosInformationCircleOutline size={20} style={{ marginBottom: "15px" }} />
                  </Tooltip>
                )}

              </th>
              <th className="product-subtotal" style={{ fontSize: "14px", textAlign: "center", padding: "5px 12px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ textAlign: "center" }}>
              <td style={{ paddingLeft: "10px 0px" }}>${parseInt(product.discountedPrice).toFixed(2)}</td>
              <td style={{ paddingLeft: "10px 0px" }}>{quantityCount}</td>
              <td style={{ paddingLeft: "10px 0px" }}>${(extraPrice * quantityCount).toFixed(2)}</td>
              <td style={{ paddingLeft: "10px 0px" }}>${(parseInt(product.discountedPrice) * quantityCount + (extraPrice * quantityCount)).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="product-content__button-wrapper d-flex align-items-center">
          <button
            disabled={rushError}
            onClick={() =>
              handleAddToCart(
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
                formatDate(wearDate),
                formatDate(shipDate),
                selectedRushOption
              )
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

          {/* <button
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
          </button> */}
        </div>
      </Fragment>
    </div>
  );
};

export default ProductDescription;
