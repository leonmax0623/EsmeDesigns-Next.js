import Router, { useRouter } from 'next/router';
import { Fragment, useEffect, useMemo, useState } from "react";
import { Col } from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { IoIosHeartEmpty, IoIosInformationCircleOutline } from "react-icons/io";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch } from 'react-redux';
import { Tooltip } from "react-tippy";
import API from '../../api';
import { getProductCartQuantity } from "../../lib/product";
import { getCheckoutOptions } from "../../redux/actions/checkoutOptions";
import { ProductRating } from "../Product";

const ProductDescription = ({
  product,
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
  // console.log("1111", product)
  const router = useRouter()
  const dispatch = useDispatch();

  let tempWearDate = localStorage.getItem("previous_wearDate")

  const [rushError, setRushError] = useState(true)
  const [comboArray, setComboArray] = useState([])

  const [totalCost, setTotalCost] = useState("0.00")
  const [extraCost, setExtraCost] = useState("0.00")
  const [price, setPrice] = useState("0.00")
  const [extraDesc, setExtraDesc] = useState([])
  //custom 
  const [selectedLining, setSelectedLining] = useState("");
  const [selectedRushOptionId, setSelectedRushOptionId] = useState(product.rushOptions ? product.rushOptions[0].rushId : "");
  const [selectedRushOption, setSelectedRushOption] = useState(product.rushOptions ? [product.rushOptions[0]] : "");
  const [selectedLiningFabricsColor, setSelectedLiningFabricsColor] = useState("");
  const [selectedLiningFabricsColorId, setSelectedLiningFabricsColorId] = useState(product.lining[0] ? product.lining[0].fabricsColor[0].fabricsColorId : "");
  const [selectedFabrics, setSelectedFabrics] = useState("");
  const [selectedFabricsColor, setSelectedFabricsColor] = useState("");
  const [selectedFabricsColorId, setSelectedFabricsColorId] = useState(product.fabrics[0] ? product.fabrics[0].fabricsColor[0].fabricsColorId : "");
  const [selectedAttr, setSelectedAttr] = useState([]);
  const [selectedAttrValue, setSelectedAttrValue] = useState([]);
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
  const [realChange, setRealChange] = useState(false)


  const [billingCompany, setBillingCompany] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingCountryId, setBillingCountryId] = useState("");
  const [selectedBillingStateId, setSelectedBillingStateId] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");
  const [billingStreetOne, setBillingStreetOne] = useState("");
  const [billingStreetTwo, setBillingStreetTwo] = useState("");

  const [shippingCompany, setShippingCompany] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingCountryId, setShippingCountryId] = useState("");
  const [selectedShippingStateId, setSelectedShippingStateId] = useState("");
  const [shippingZipCode, setShippingZipCode] = useState("");
  const [shippingStreetOne, setShippingStreetOne] = useState("");
  const [shippingStreetTwo, setShippingStreetTwo] = useState("");
  const [shippingToName, setShippingToName] = useState("");
  const [shippingPhoneNumber, setShippingPhoneNumber] = useState("");

  const [shipDate, setShipDate] = useState(new Date(new Date().getTime() + parseInt(selectedRushOption[0].leadTime) * 7 * 24 * 60 * 60 * 1000));
  const [wearDate, setWearDate] = useState(tempWearDate && tempWearDate !== "" ? new Date(tempWearDate) : "");

  // setRealChange(false)

  useEffect(() => {
    if (!realChange) {

      if (product.lining && product.lining.length > 0) {
        setSelectedLining(product.selectedLining ? product.selectedLining : product.lining[0].fabricsId)
        setSelectedLiningFabricsColor(selectedLiningFabricsColor ? selectedLiningFabricsColor : product.lining[0].fabricsColor[0].fabricColorName)
        // setSelectedLiningFabricsColorId(product.lining[0].fabricsColor[0].fabricsColorId)
      }
      if (product.fabrics && product.fabrics.length > 0) {
        setSelectedFabrics(product.selectedFabrics ? product.selectedFabrics : product.fabrics[0].fabricsId)
        setSelectedFabricsColor(selectedFabricsColor ? selectedFabricsColor : product.fabrics[0].fabricsColor[0].fabricColorName)
        // setSelectedFabricsColorId(product.fabrics[0].fabricsColor[0].fabricsColorId)
      }
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
        let selectedAttrArray = []
        product.styleAttributes.length > 0 && product.styleAttributes.map((item) => {
          if (item.styleAttrybutesValues && item.styleAttrybutesValues.length > 0) {
            selectedAttrArray[selectedAttrArray.length] = { attr: item.styleAttrybutesName, attrId: item.styleAttrybutesId, value: item.styleAttrybutesValues[0].styleAttrybutesValueName, valueId: item.styleAttrybutesValues[0].styleAttrybutesValueId }
          }
        });
        setComboArray(comboTempArray);
        setSelectedAttr(selectedAttrArray);
        setRealChange(false)

      }
    }
  }, [product])
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
        var index = event.target.selectedIndex;
        var optionElement = event.target.childNodes[index];
        let attrId = optionElement.getAttribute('data-attr-id');
        array[i].value = event.target.value;
        array[i].valueId = attrId;
        break;
      }
    }
    setSelectedAttr(array);

  }



  const handleComboFabricChange = (combo_name) => (e) => {
    setRealChange(true)
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
    setRealChange(true)
    let array = [...comboArray];
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    var comboId = optionElement.getAttribute('data-combo-index');
    var fabricId = optionElement.getAttribute('data-fabric-index');
    var colorId = optionElement.getAttribute('data-color-index');

    array[comboId].fabric.color.color_name = e.target.value;
    array[comboId].fabric.color.color_id = product.combos[comboId].fabric[fabricId].fabricsColor[colorId].fabricsColorId;
    array[comboId].fabric.color.rgb = product.combos[comboId].fabric[fabricId].fabricsColor[colorId].fabricsColorRGB;

    setComboArray(array);
  }

  const handleComboFabricColorsRadioChange = (comboIndex, color_name, color_id, color_rgb) => (e) => {
    setRealChange(true)
    let array = [...comboArray];

    array[comboIndex].fabric.color.color_name = color_name;
    array[comboIndex].fabric.color.color_id = color_id;
    array[comboIndex].fabric.color.rgb = color_rgb;
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

  const handleFabricsChange = (value) => {
    setRealChange(true)
    setSelectedFabricsColorId(value.split("/")[0]);
    setSelectedFabricsColor(value.split("/")[1]);
    handleChangePicture(value.split("/")[0], value.split("/")[1])
    console.log("!!!!!!!!!", value.split("/")[0])
  }

  const handleChangePicture = (colorId, coloName) => {
    changePicture(colorId)
    // localStorage.setItem("imageFabricsColorId", colorId)
  }

  const handleStyleOption = (options) => {
    setRealChange(true)
    let testExtra = 0;
    setStyleOptionSelected(options)
    const sum = sumExtraPrices(options);
    let alterationSum = 0;
    if (alterationSelected.length > 0) alterationSum = sumExtraPrices(alterationSelected);
    setExtraPrice(sum + alterationSum);
  }

  const handleAlterationOption = (options) => {
    setRealChange(true)
    let testExtra = 0;
    setAlterationSelected(options)
    const sum = sumExtraPrices(options);
    let styleOptionSum = 0;
    if (styleOptionSelected.length > 0) styleOptionSum = sumExtraPrices(styleOptionSelected);
    setExtraPrice(sum + styleOptionSum);
  }

  const handleRushDate = (e) => {
    setRealChange(true)
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


  useMemo(() => {
    console.log("REAL CHANGE-----------", realChange)
    if (realChange) {
      if (wearDate !== "") {
        if (shipDate.getTime() > wearDate.getTime()) {
          disallowRush(true);
          setRushError(true)
        } else {
          disallowRush(false);
          setRushError(false)
        }
      }
    }
  }, [wearDate, selectedRushOptionId])



  useMemo(async () => {
    if (!realChange) {

      const response = await getCheckoutOptions();
      if (response.data.errorText === 'accessToken expired') {
        addToast("Access Token expired, please log in again!", { appearance: "error", autoDismiss: true });
        Router.push('/other/login');
      } else {

        setBillingCompany(response.data.billingCompany)
        setBillingCity(response.data.billingCity)
        setBillingCountryId(response.data.billingCountry)
        setSelectedBillingStateId(response.data.billingState)
        setBillingStreetOne(response.data.billingStreet)
        setBillingStreetTwo(response.data.billingStreet2)
        setBillingZipCode(response.data.billingZipCode)

        setShippingCompany(response.data.shippingCompany)
        setShippingCity(response.data.shippingCity)
        setShippingCountryId(response.data.shippingCountry)
        setSelectedShippingStateId(response.data.shippingState)
        setShippingStreetOne(response.data.shippingStreet)
        setShippingStreetTwo(response.data.shippingStreet2)
        setShippingZipCode(response.data.shippingZipCode)
        setShippingToName(response.data.shippingToName)
        setShippingPhoneNumber(response.data.shippingPhoneNumber)
      }
    }


  }, [])

  let itemsArray = [];

  let comboArr = [];
  let attrArr = [];

  selectedAttr.map((attr, i) => {
    let temp = {};
    temp.styleAttrybutesId = attr.attrId;
    temp.styleAttrybutesValueId = attr.valueId;

    attrArr = [...attrArr, temp]

    return attrArr
  })

  comboArray.map((data, i) => {
    let temp = {};

    temp.combosId = data.comboId
    temp.combosfabricsId = data.fabric.fabric_id
    temp.combosfabricsColorId = data.fabric.color.color_id;
    comboArr = [...comboArr, temp];

    return comboArr;
  })

  let alterationOptionsArray = [];

  if (alterationSelected.length > 0) {
    alterationSelected.map((item, i) => {
      let temp = {
        styleAlterationId: item.id
      }
      alterationOptionsArray = [...alterationOptionsArray, temp]
    })
  }

  let styleOptionsArray = [];

  if (styleOptionSelected.length > 0) {
    styleOptionSelected.map((item, i) => {
      let temp = {
        styleOptionId: item.id
      }
      styleOptionsArray = [...styleOptionsArray, temp]
    })
  }

  itemsArray = {
    "itemsId": "",
    "productTypeId": product.productTypeId,
    "productId": product.productId,
    "selfFabricsId": selectedFabrics,
    "selfFabricsColorId": selectedFabricsColorId,
    "liningFabricsId": selectedLining,
    "liningFabricsColorId": selectedLiningFabricsColorId,
    "combos": comboArr,
    "sizeCategoryId": selectedSizeCategoryId,
    "sizes": [
      {
        "sizeId": selectedCategorySizeValueId,
        "amount": quantityCount
      }
    ],
    "styleAlterations": alterationOptionsArray,
    "styleAttributes": attrArr,
    "styleOptions": styleOptionsArray,
    "rushId": selectedRushOptionId,
    "wearDate": formatDate(wearDate),
    "estimatedShipDate": formatDate(shipDate)
  };

  if (selectedFabrics === "") {
    delete itemsArray['selfFabricsId'];
  }
  if (selectedFabricsColorId === "") {
    delete itemsArray['selfFabricsColorId'];
  }
  if (selectedLining === "") {
    delete itemsArray['liningFabricsId'];
  }
  if (selectedLiningFabricsColorId === "") {
    delete itemsArray['liningFabricsColorId'];
  }
  if (comboArr.length === 0) {
    delete itemsArray['combos'];
  }
  if (alterationOptionsArray.length === 0) {
    delete itemsArray['styleAlterations'];
  }
  if (attrArr.length === 0) {
    delete itemsArray['styleAttributes'];
  }
  if (styleOptionsArray.length === 0) {
    delete itemsArray['styleOptions'];
  }
  if (selectedRushOptionId === "") {
    delete itemsArray['rushId'];
  }

  let parameters = {
    "ordersId": localStorage.getItem("OrderId") ? localStorage.getItem("OrderId") : "",
    "ordersType": "WS",
    "ordersSubType": "F",
    "billingCompany": billingCompany,
    "billingStreet": billingStreetOne,
    "billingStreet2": billingStreetTwo,
    "billingCity": billingCity,
    "billingZipCode": billingZipCode,
    "billingState": selectedBillingStateId,
    "billingCountry": billingCountryId,
    "shippingToName": shippingToName,
    "shippingPhoneNumber": shippingPhoneNumber ? shippingPhoneNumber : "",
    "shippingCompany": shippingCompany,
    "shippingStreet": shippingStreetOne,
    "shippingStreet2": shippingStreetTwo,
    "shippingCity": shippingCity,
    "shippingZipCode": shippingZipCode,
    "shippingState": selectedShippingStateId,
    "shippingCountry": shippingCountryId,
    "finalized": "False",
    "items": [itemsArray]
  }

  // let totalCost = "0.00";
  // let extraCost = "0.00";
  // let price = "0.00";
  // let extraDesc = [];
  console.log("REAL CHANGE", realChange)

  const getPriceAPI = () => {
    const tokenInStorage = localStorage.getItem('accessToken')

    const priceJson = {
      "productTypeId": product.productTypeId,
      "productId": product.productId,
      "selfFabricsId": selectedFabrics,
      "selfFabricsColorId": selectedFabricsColorId,
      "liningFabricsId": selectedLining,
      "liningFabricsColorId": selectedLiningFabricsColorId,
      "combos": comboArr,
      "sizeCategoryId": selectedSizeCategoryId,
      "sizes": [
        {
          "sizeId": selectedCategorySizeValueId,
          "amount": quantityCount
        }
      ],
      "styleAlterations": alterationOptionsArray,
      "styleAttributes": attrArr,
      "styleOptions": styleOptionsArray,
      "estimatedShipDate": shipDate
    }

    const formData = {
      "feaMethod": "getPrice",
      "accessToken": tokenInStorage,
      "parameters": JSON.stringify(priceJson)
    }

    if (realChange) {

      API.post('/', new URLSearchParams(formData))
        .then(response => {
          if (response.data.errorCode === "0") {
            setRealChange(false)
            setTotalCost(response.data.total)
            setExtraCost(response.data.extra)
            setPrice(response.data.price)
            setExtraDesc(response.data.extraDescription)
            // totalCost = response.data.total;
            // extraCost = response.data.extra;
            // price = response.data.price;
            // extraDesc = response.data.extraDescription;
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    }

  }

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
    extraCost,
    wearDate,
    shipDate,
    selectedRushOption,
    price
  ) => {



    const tokenInStorage = localStorage.getItem('accessToken')

    const formData = {
      "feaMethod": "upsertOrder",
      "accessToken": tokenInStorage,
      "parameters": JSON.stringify(parameters)
    }

    API.post('/', new URLSearchParams(formData))
      .then(response => {
        console.log('====ddd====', response);
        if (response.data.errorCode === "0") {

          let tempOrdersId = "";
          let tempItemsId = ""
          //getting itemsId
          let allCartItemsIds = [];
          cartItems.map((item, i) => {
            allCartItemsIds.push(item.itemsId)
          })
          let responseItemsIds = [];
          response.data.items.map((item, i) => {
            responseItemsIds.push(item.itemsId)
          })

          if (cartItems.length === 0) {
            tempItemsId = response.data.items[0].itemsId;
          } else {
            tempItemsId = responseItemsIds.filter(element => allCartItemsIds.indexOf(element) === -1)[0]
          }

          if (localStorage.getItem("OrderId")) {
            tempOrdersId = localStorage.getItem("OrderId")
          } else {
            localStorage.setItem("OrderId", response.data.ordersId)
            tempOrdersId = response.data.ordersId;
          }

          console.log("~~~~~~~ExtraCost~~~~~~~", extraCost)

          addToCart(
            product,
            null,
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
            extraCost,
            wearDate,
            shipDate,
            selectedRushOption,
            tempItemsId,
            tempOrdersId,
            price
          )

          localStorage.setItem("previous_wearDate", wearDate)

          addToast("Order was successfully saved!", { appearance: "success", autoDismiss: true });
          // Router.push('/other/cart');
        } else {
          addToast(response.data.errorMessage, { appearance: "error", autoDismiss: true });
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  useMemo(() => {
    if (realChange) {
      console.log("GetPriceParams", comboArr)
      // eslint-disable-next-line
      const getData = setTimeout(() =>
        getPriceAPI()
        , 1000)
      return () => clearTimeout(getData)
    }
  }, [
    selectedFabrics,
    selectedFabricsColorId,
    selectedLining,
    selectedLiningFabricsColorId,
    comboArr,
    selectedSizeCategoryId,
    selectedCategorySizeValueId,
    quantityCount,
    alterationOptionsArray,
    attrArr,
    styleOptionsArray,
    shipDate,
    wearDate,
    selectedRushOptionId
  ])

  return (
    <div className="product-content">
      {showRating === "Users" && product.reviewList && product.reviewList.length > 0 ? (
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
        {/* {parseInt(product.discountedPrice) > 0 && parseInt(product.standardPrice) > parseInt(product.discountedPrice) ? (
          <Fragment>
            <span className="main-price discounted">${productPrice}</span>
            <span className="main-price">${discountedPrice}</span>
          </Fragment>
        ) : ( */}
        <span className="main-price">${price} </span>
        {/* )} */}
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
                  setRealChange(true)
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
                    handleFabricsChange(event.target.value)
                    setRealChange(true)
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
                            console.log(color.fabricsColorId)
                            console.log(selectedFabricsColorId)
                            setSelectedFabricsColorId(color.fabricsColorId);
                            setSelectedFabricsColor(color.fabricColorName);
                            handleChangePicture(color.fabricsColorId, color.fabricColorName)
                            setRealChange(true)
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
                  setRealChange(true)
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
                  // value={selectedLiningFabricsColor}
                  onChange={(event) => {
                    setSelectedLiningFabricsColor(event.target.value.split("/")[1]);
                    setSelectedLiningFabricsColorId(event.target.value.split("/")[0]);
                    setRealChange(true)
                  }}
                >
                  {product.lining.map((single, j) => single.fabricsId === selectedLining ? single.fabricsColor.map((color, i) => {
                    return (
                      <option key={i} selected={selectedLiningFabricsColor === color.fabricColorName} value={`${color.fabricsColorId}/${color.fabricColorName}`}>{color.fabricColorName}</option>
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
                            setRealChange(true)
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
                              onChange={handleComboFabricColorsRadioChange(comboIndex, color.fabricColorName, color.fabricsColorId, color.fabricsColorRGB)}
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
                    onChange={(event) => {
                      handleAttributeChange(event, item.styleAttrybutesName)
                      setRealChange(true)
                    }}
                  >
                    {item.styleAttrybutesValues &&
                      item.styleAttrybutesValues.map((single, j) => {
                        return (
                          <option key={j} selected={selectedAttr && selectedAttr.length > 0 && selectedAttr[i].attr === item.styleAttrybutesName && selectedAttr[i].value === single.styleAttrybutesValueName} value={single.styleAttrybutesValueName} data-attr-id={single.styleAttrybutesValueId}> {single.styleAttrybutesValueName}</option>
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
                  setSelectedSizeCategory(event.target.value.split("::")[1])
                  setSelectedSizeCategoryId(event.target.value.split("::")[0])
                  setRealChange(true)
                }}
              >
                {product.sizeCategories &&
                  product.sizeCategories.map((size, i) => {
                    return (
                      <option key={i} value={`${size.sizeCategoryId}::${size.sizeCategoryName}`}>{size.sizeCategoryName}</option>
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
                    setSelectedCategorySizeValue(event.target.value.split("::")[1]);
                    setSelectedCategorySizeValueId(event.target.value.split("::")[0]);
                    setRealChange(true)
                  }}
                >
                  {product.sizeCategories.map((single, j) => single.sizeCategoryName === selectedSizeCategory ? single.sizes.map((size, i) => {
                    return (
                      <option key={i} value={`${size.sizeId}::${size.sizeName}`}>{size.sizeName}</option>
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

      <div className="descTable">
        <div className="product-content__quantity space-mb--40">
          <div className="product-content__quantity__title">Quantity</div>
          <div className="cart-plus-minus">
            <button
              onClick={() => {
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
                setRealChange(true)
              }}
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
              onClick={() => {
                setQuantityCount(quantityCount + 1)
                setRealChange(true)
              }}
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
                  setRealChange(true)
                  handleSelectRushOption(event.target.value)
                }}
                selected={selectedRushOptionId}
              >
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
            {/* <Col lg={3}><div className="product-content__size__content">
              <span>${parseInt(product.discountedPrice).toFixed(2)}</span>
            </div></Col> */}
            <Col lg={3}><div className="product-content__size__content">
              <span>${price}</span>
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
            {/* <Col lg={3}><div className="product-content__size__content">
              <span>${(extraPrice * quantityCount).toFixed(2)}</span>
            </div></Col> */}
            <Col lg={3}><div className="product-content__size__content">
              <span>${extraCost}</span>
            </div></Col>
          </div>
          <div style={{ display: "flex" }}>
            <Col lg={3}><div className="product-content__size__title">Total: </div></Col>
            {/* <Col lg={3}><div className="product-content__size__content">
              <span>${parseInt(product.discountedPrice) * quantityCount + (extraPrice * quantityCount).toFixed(2)}</span>
            </div></Col> */}
            <Col lg={3}><div className="product-content__size__content">
              <span>${totalCost}</span>
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
                {extraDesc.length > 0 && (
                  <Tooltip
                    interactive
                    html={(
                      <div style={{ textAlign: "left" }}>
                        {extraDesc.map((item, i) => {
                          return (
                            <p style={{ margin: "5px" }}>- {item.desc}: ${item.value}</p>
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
              {/* <td style={{ paddingLeft: "10px 0px" }}>${parseInt(product.discountedPrice).toFixed(2)}</td> */}
              <td style={{ paddingLeft: "10px 0px" }}>${price}</td>
              <td style={{ paddingLeft: "10px 0px" }}>{quantityCount}</td>
              {/* <td style={{ paddingLeft: "10px 0px" }}>${(extraPrice * quantityCount).toFixed(2)}</td> */}
              <td style={{ paddingLeft: "10px 0px" }}>${extraCost}</td>
              {/* <td style={{ paddingLeft: "10px 0px" }}>${(parseInt(product.discountedPrice) * quantityCount + (extraPrice * quantityCount)).toFixed(2)}</td> */}
              <td style={{ paddingLeft: "10px 0px" }}>${totalCost}</td>

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
                extraCost,
                formatDate(wearDate),
                formatDate(shipDate),
                selectedRushOption,
                price
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
      </div>
    </div>
  );
};

export default ProductDescription;
