import Link from "next/link";
import Router from 'next/router';
import { useEffect, useMemo, useState } from "react";
import { Col } from "react-bootstrap";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MultiSelect } from "react-multi-select-component";
// import { connect } from "react-redux";
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { Tooltip } from "react-tippy";
import API from '../../api';
import { getCheckoutOptions } from "../../redux/actions/checkoutOptions";
// import {
// 	addBulkToCart
// } from "../../redux/actions/cartActions";

const BulkProduct = ({ addToCart, addToast, addBulkToCart, bulkProductProps, deleteFromCart, disallowRush, cloneOrder, cartItems }) => {

	let cartTotalPrice = 0;
	let tempWearDate = localStorage.getItem("previous_wearDate")
	// const [wearDate, setWearDate] = useState(tempWearDate && tempWearDate !== "" ? new Date(tempWearDate) : new Date());
	const [rushError, setRushError] = useState(true);
	const [selectedRushOptionId, setSelectedRushOptionId] = useState("");
	const [selectedRushOption, setSelectedRushOption] = useState(bulkProductProps[0].rushOptions ? [bulkProductProps[0].rushOptions[0]] : "");
	//custom 
	const [selectedLining, setSelectedLining] = useState("");
	const [selectedLiningFabricsColor, setSelectedLiningFabricsColor] = useState("");
	const [selectedLiningFabricsColorId, setSelectedLiningFabricsColorId] = useState("");
	const [selectedFabrics, setSelectedFabrics] = useState("");
	const [selectedFabricsColor, setSelectedFabricsColor] = useState("");
	const [selectedFabricsColorId, setSelectedFabricsColorId] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [alterationSelected, setAlterationSelected] = useState([]);
	const [styleOptionSelected, setStyleOptionSelected] = useState([]);
	const [selectedFabric, setSelectedFabric] = useState({ combo: 0, fabric: 0, color: 0 });
	const [totalItems, setTotalItems] = useState(0);
	const [selectedSizeCategory, setSelectedSizeCategory] = useState("")
	const [selectedSizeCategoryId, setSelectedSizeCategoryId] = useState("");

	const [sizeCategory, setSizeCategory] = useState("");

	const [selectedCategorySizeValue, setSelectedCategorySizeValue] = useState("");
	const [selectedCategorySizeValueId, setSelectedCategorySizeValueId] = useState("");

	const [regularSizeArray, setRegularSizeArray] = useState(JSON.stringify([]));

	const [extraPrice, setExtraPrice] = useState(0);
	const [productStock, setProductStock] = useState(
		bulkProductProps[0].inStock ? bulkProductProps[0].inStock : 0
	);
	const [quantityCount, setQuantityCount] = useState(bulkProductProps[0].quantity ? bulkProductProps[0].quantity : 0);

	const [comboArray, setComboArray] = useState([])

	const [editedProductItemId, setEditedProductItemId] = useState("");

	const [editBoolean, setEditBoolean] = useState(bulkProductProps[0].selectedFabrics ? true : false)

	const [selectedAttr, setSelectedAttr] = useState([]);

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

	const [totalCost, setTotalCost] = useState(
		bulkProductProps[0].mainPrice && bulkProductProps[0].totalItems ? (parseInt(bulkProductProps[0].mainPrice) * bulkProductProps[0].totalItems + parseInt(bulkProductProps[0].extraPrice)).toFixed(2) : "0.00"
	)
	const [extraCost, setExtraCost] = useState(bulkProductProps[0].mainPrice ? bulkProductProps[0].extraPrice : "0.00")
	const [price, setPrice] = useState("0.00")
	const [extraDesc, setExtraDesc] = useState([])


	const [shipDate, setShipDate] = useState(new Date(new Date().getTime() + parseInt(selectedRushOption[0].leadTime) * 7 * 24 * 60 * 60 * 1000));
	const [wearDate, setWearDate] = useState(tempWearDate && tempWearDate !== "" ? new Date(tempWearDate) : "");

	const [myTestValue, setMyTestValue] = useState(false);

	useMemo(() => {
		if (bulkProductProps[0].wearDate) {
			setWearDate(new Date(bulkProductProps[0].wearDate))
		}
	}, [bulkProductProps[0].wearDate])

	useMemo(() => {
		if (bulkProductProps[0].shipDate) {
			setShipDate(new Date(bulkProductProps[0].shipDate))
		}
	}, [bulkProductProps[0].shipDate])

	useMemo(() => {
		if (bulkProductProps[0].selectedRushOption) {
			setSelectedRushOptionId(bulkProductProps[0].selectedRushOption[0].rushId)
		} else {

			setSelectedRushOptionId(bulkProductProps[0].rushOptions[0].rushId)
			// setSelectedRushOption([bulkProductProps[0].rushOptions[0]])
		}

	}, [bulkProductProps[0].rushOptions])



	useEffect(() => {
		if (bulkProductProps[0]) {
			if (bulkProductProps[0].totalItems) {
				setTotalItems(bulkProductProps[0].totalItems)
			}
			if (bulkProductProps[0].selectedSize) {
				setSelectedCategorySizeValue(bulkProductProps[0].selectedSize)
			} else {
				setSelectedCategorySizeValue(bulkProductProps[0].sizeCategories && bulkProductProps[0].sizeCategories.length > 0 && bulkProductProps[0].sizeCategories[0].sizes[0].sizeName)
			}
			if (bulkProductProps[0].selectedSizeId) {
				setSelectedCategorySizeValueId(bulkProductProps[0].selectedSizeId)
			} else {
				setSelectedCategorySizeValueId(bulkProductProps[0].sizeCategories && bulkProductProps[0].sizeCategories.length > 0 && bulkProductProps[0].sizeCategories[0].sizes[0].sizeId)
			}
			if (bulkProductProps[0].selectedSizeCategory) {
				setSizeCategory(bulkProductProps[0].selectedSizeCategory)
				setSelectedSizeCategory(bulkProductProps[0].selectedSizeCategory)
			} else {
				setSizeCategory(bulkProductProps[0].sizeCategories && bulkProductProps[0].sizeCategories.length > 0 && bulkProductProps[0].sizeCategories[0].sizeCategoryName)
				setSelectedSizeCategory(bulkProductProps[0].sizeCategories && bulkProductProps[0].sizeCategories.length > 0 && bulkProductProps[0].sizeCategories[0].sizeCategoryName)
			}
			if (bulkProductProps[0].selectedSizeCategoryId) {
				setSelectedSizeCategoryId(bulkProductProps[0].selectedSizeCategoryId)
			} else {
				setSelectedSizeCategoryId(bulkProductProps[0].sizeCategories && bulkProductProps[0].sizeCategories.length > 0 && bulkProductProps[0].sizeCategories[0].sizeCategoryId)
			}

			if (bulkProductProps[0].sizeCategories && bulkProductProps[0].sizeCategories.length > 0) {
				setSelectedSize(bulkProductProps[0].sizeCategories[0].sizes[0].sizeName)
			}

			if (bulkProductProps[0].regularSizeArray && bulkProductProps[0].regularSizeArray.length > 0) {
				// console.log("True!!!!!", JSON.stringify(bulkProductProps[0].regularSizeArray))
				setRegularSizeArray(JSON.stringify(bulkProductProps[0].regularSizeArray))
			} else {
				// console.log("False!!!!!", bulkProductProps[0].sizeCategories)
				setRegularSizeArray(JSON.stringify(bulkProductProps[0] && bulkProductProps[0].sizeCategories && bulkProductProps[0].sizeCategories.length > 0 && bulkProductProps[0].sizeCategories.map((each) => {

					const sizes = each.sizes.map((eachSize) => {
						return {
							sizeId: eachSize.sizeId,
							price: eachSize.price,
							sizeCode: 0,
							sizeName: eachSize.sizeName
						}
					})
					each.sizes = sizes
					return each
				})))
			}

			if (bulkProductProps[0].selectedAlteration) {
				setAlterationSelected(bulkProductProps[0].selectedAlteration)
			}

			if (bulkProductProps[0].selectedStyleOption) {
				setStyleOptionSelected(bulkProductProps[0].selectedStyleOption)
			}

			if (bulkProductProps[0].selectedStyleOption && bulkProductProps[0].selectedAlteration) {
				setExtraPrice(sumExtraPrices(bulkProductProps[0].selectedStyleOption) + sumExtraPrices(bulkProductProps[0].selectedAlteration))
			} else if (bulkProductProps[0].selectedStyleOption && bulkProductProps[0].selectedAlteration.length === 0) {
				setExtraPrice(sumExtraPrices(bulkProductProps[0].selectedStyleOption))
			} else if (bulkProductProps[0].selectedAlteration && bulkProductProps[0].selectedStyleOption.length === 0) {
				setExtraPrice(sumExtraPrices(bulkProductProps[0].selectedAlteration))
			}
		}

	}, [bulkProductProps]);

	useMemo(() => {
		if (bulkProductProps[0].lining && bulkProductProps[0].lining.length > 0) {
			setSelectedLining(bulkProductProps[0].selectedLining ? bulkProductProps[0].selectedLining : bulkProductProps[0].lining[0].fabricsId)
			setSelectedLiningFabricsColor(bulkProductProps[0].selectedLiningFabricsColor ? bulkProductProps[0].selectedLiningFabricsColor : bulkProductProps[0].lining[0].fabricsColor[0].fabricColorName)
			setSelectedLiningFabricsColorId(bulkProductProps[0].selectedLiningFabricsColors ? bulkProductProps[0].selectedLiningFabricsColor : bulkProductProps[0].lining[0].fabricsColor[0].fabricsColorId)
		}

	}, [bulkProductProps[0].lining])

	useMemo(() => {
		if (bulkProductProps[0].fabrics && bulkProductProps[0].fabrics.length > 0) {
			setSelectedFabrics(bulkProductProps[0].selectedFabrics ? bulkProductProps[0].selectedFabrics : bulkProductProps[0].fabrics[0].fabricsId)
			setSelectedFabricsColor(bulkProductProps[0].selectedFabricsColor ? bulkProductProps[0].selectedFabricsColor : bulkProductProps[0].fabrics[0].fabricsColor[0].fabricColorName)
			setSelectedFabricsColorId(bulkProductProps[0].selectedFabricsColorId ? bulkProductProps[0].selectedFabricsColorId : bulkProductProps[0].fabrics[0].fabricsColor[0].fabricsColorId)

		}

	}, [bulkProductProps[0].fabrics])

	useMemo(() => {
		if (bulkProductProps[0].comboArray) {
			setComboArray(bulkProductProps[0].comboArray);
		} else {
			let comboTempArray = []
			bulkProductProps[0].combos && bulkProductProps[0].combos.map((item) => {
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
	}, [bulkProductProps[0].comboArray])

	useMemo(() => {
		if (bulkProductProps[0].selectedAttr && bulkProductProps[0].selectedAttr.length > 0) {
			setSelectedAttr(bulkProductProps[0].selectedAttr);
		} else {
			let selectedAttrArray = []
			bulkProductProps[0].styleAttributes.length > 0 && bulkProductProps[0].styleAttributes.map((item) => {
				if (item.styleAttrybutesValues && item.styleAttrybutesValues.length > 0) {
					selectedAttrArray[selectedAttrArray.length] = { attr: item.styleAttrybutesName, attrId: item.styleAttrybutesId, value: item.styleAttrybutesValues[0].styleAttrybutesValueName, valueId: item.styleAttrybutesValues[0].styleAttrybutesValueId }
				}
			});
			setSelectedAttr(selectedAttrArray);
		}
	}, [bulkProductProps[0].styleAttributes])

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


	//custom
	const alterationOptions = [];
	bulkProductProps[0] && bulkProductProps[0].styleAlterations && bulkProductProps[0].styleAlterations.length > 0 && bulkProductProps[0].styleAlterations.map((single, i) => {
		let array = {
			label: "",
			value: "",
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
	bulkProductProps[0] && bulkProductProps[0].styleOptions && bulkProductProps[0].styleOptions.length > 0 && bulkProductProps[0].styleOptions.map((single, i) => {
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




	const handleRegularSizeArray = (e) => {
		console.log("=========EmptryCheck=======", e.target.value)
		let result = e.target.value;
		if (result === "" || result === 0 || result === "0" || result === "000" || result === "00" || result === NaN || totalItems === NaN) {
			const index = e.target.dataset.position.split('-')
			let sizeArray = JSON.parse(regularSizeArray)
			sizeArray[index[0]].sizes[index[1]].sizeCode = 0;
			setRegularSizeArray(JSON.stringify(sizeArray))
			result = 0;
		} else {
			const index = e.target.dataset.position.split('-')
			let sizeArray = JSON.parse(regularSizeArray)
			sizeArray[index[0]].sizes[index[1]].sizeCode = ((sizeArray[index[0]].sizes[index[1]].sizeCode * 0) + result).replace(/^0+/, '');
			setRegularSizeArray(JSON.stringify(sizeArray))
		}
	}



	const handleResetSizeArrayInput = (value) => {
		const sizeArray = JSON.parse(regularSizeArray).map(item => {
			let tempItem = item
			// if (value !== item.sizeCategoryName) {
			const sizes = item.sizes.map(each => {
				return { ...each, sizeCode: 0 }
			})
			tempItem.sizes = sizes
			// }
			return tempItem
		})
		setTotalItems(0)
		setRegularSizeArray(JSON.stringify(sizeArray))
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
		getPriceAPI()

	}

	const handleSelectRushOption = (val) => {
		const selectedOption = bulkProductProps[0].rushOptions.filter((option, i) => option.rushId === val);
		const leadTime = selectedOption[0].leadTime;
		const today = new Date();
		const estimatedShipDate = new Date(today.getTime() + parseInt(leadTime) * 7 * 24 * 60 * 60 * 1000);
		setShipDate(estimatedShipDate);
		setSelectedRushOptionId(val);
		setSelectedRushOption(selectedOption)
	}

	const handleRushDate = (e) => {
		setWearDate(e)
	}

	useEffect(() => {
		if (!selectedRushOptionId || editBoolean) return;
		if (bulkProductProps[0].wearDate) {
			if (wearDate !== "") {
				if (new Date(shipDate).getTime() > new Date(wearDate).getTime()) {
					disallowRush(true);
					setRushError(true)
				} else {
					disallowRush(false);
					setRushError(false)
				}
			}
		} else {
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
	}, [selectedRushOptionId, wearDate])

	useMemo(async () => {

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

	}, [])

	let itemsArray = [];
	let cloneArray = [];

	let comboArr = [];
	let attrArr = [];
	let sizeArr = [];

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



	if (bulkProductProps[0].regularOrder) {
		sizeArr = [{
			"sizeId": selectedCategorySizeValueId,
			"amount": quantityCount
		}]
	} else {
		JSON.parse(regularSizeArray).map((size, i) => {
			if (size.sizeCategoryId === selectedSizeCategoryId) {
				size.sizes.map((item, i) => {
					if (item.sizeCode !== 0) {
						let temp = {};
						temp.sizeId = item.sizeId;
						temp.amount = item.sizeCode;

						sizeArr = [...sizeArr, temp]
					}
				})
			}

			return sizeArr
		})
	}

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
		"itemsId": bulkProductProps[0].itemsId ? bulkProductProps[0].itemsId : "",
		"productTypeId": bulkProductProps[0].productTypeId,
		"productId": bulkProductProps[0].productId,
		"selfFabricsId": selectedFabrics,
		"selfFabricsColorId": selectedFabricsColorId,
		"liningFabricsId": selectedLining,
		"liningFabricsColorId": selectedLiningFabricsColorId,
		"combos": comboArr,
		"sizeCategoryId": selectedSizeCategoryId,
		"sizes": sizeArr,
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
	if (sizeArr.length === 0) {
		delete itemsArray['sizes'];
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

	const handleBulkOrder = () => {

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


		const tokenInStorage = localStorage.getItem('accessToken')

		const formData = {
			"feaMethod": "upsertOrder",
			"accessToken": tokenInStorage,
			"parameters": JSON.stringify(parameters)
		}

		itemsArray = {
			"itemsId": bulkProductProps[0].itemsId ? bulkProductProps[0].itemsId : "",
			"productTypeId": bulkProductProps[0].productTypeId,
			"productId": bulkProductProps[0].productId,
			"selfFabricsId": selectedFabrics,
			"selfFabricsColorId": selectedFabricsColorId,
			"liningFabricsId": selectedLining,
			"liningFabricsColorId": selectedLiningFabricsColorId,
			"combos": comboArr,
			"sizeCategoryId": selectedSizeCategoryId,
			"sizes": sizeArr,
			"styleAlterations": alterationOptionsArray,
			"styleAttributes": attrArr,
			"styleOptions": styleOptionsArray,
			"rushId": selectedRushOptionId,
			"wearDate": formatDate(wearDate),
			"estimatedShipDate": formatDate(shipDate)
		};

		const formDataPrice = {
			"feaMethod": "getPrice",
			"accessToken": tokenInStorage,
			"parameters": JSON.stringify(itemsArray)
		}

		API.post('/', new URLSearchParams(formDataPrice))
			.then(response => {
				console.log("~~~~~~~~~~~~", response)
			})


		API.post('/', new URLSearchParams(formData))
			.then(response => {
				console.log("============BulkResponse===========", response)
				if (response.data.errorCode === "0") {
					addToast("Order was successfully saved!", { appearance: "success", autoDismiss: true });
					let tempOrdersId = "";
					let tempItemsId = "";
					let allCartItemsIds = [];
					let responseItemsIds = [];


					if (bulkProductProps[0].itemsId && bulkProductProps[0].itemsId !== "") {
						tempItemsId = bulkProductProps[0].itemsId;
					} else {
						cartItems.map((item, i) => {
							allCartItemsIds.push(item.itemsId)
						})
						response.data.items.map((item, i) => {
							responseItemsIds.push(item.itemsId)
						})

						if (cartItems.length === 0) {
							tempItemsId = response.data.items[0].itemsId;
						} else {
							tempItemsId = responseItemsIds.filter(element => allCartItemsIds.indexOf(element) === -1)[0]
						}

						console.log("LLLLLLLLLLL", tempItemsId)
					}

					if (localStorage.getItem("OrderId")) {
						tempOrdersId = localStorage.getItem("OrderId")
					} else {
						localStorage.setItem("OrderId", response.data.ordersId)
						tempOrdersId = response.data.ordersId;
					}

					let tempNull = null;

					setEditBoolean(true)
					if (!bulkProductProps[0].regularOrder) {
						addBulkToCart({
							bulkProduct: bulkProductProps[0],
							tempNull,
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
							regularSizeArray,
							alterationSelected,
							styleOptionSelected,
							totalItems,
							extraCost,
							wearDate,
							shipDate,
							selectedRushOption,
							tempItemsId,
							tempOrdersId,
							price
						})
					} else {
						addToCart(
							bulkProductProps[0],
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
					}

					localStorage.setItem("previous_wearDate", wearDate)

					// Router.push('/other/cart');
				} else {
					addToast(response.data.errorMessage, { appearance: "error", autoDismiss: true });
				}
			})
			.catch(error => {
				console.log('error', error);
			});



	}

	const editOrder = () => {
		console.log("MMMMMM===", wearDate)
		console.log("MMMMMM===", shipDate)
		if (new Date(shipDate).getTime() + parseInt(selectedRushOption[0].leadTime) * 7 * 24 * 60 * 60 * 1000 < new Date(wearDate).getTime()) {
			setRushError(false);
		}
		setEditBoolean(false)
	}

	const handleCloneOrder = () => {
		cloneArray = {
			"itemsId": "",
			"productTypeId": bulkProductProps[0].productTypeId,
			"productId": bulkProductProps[0].productId,
			"selfFabricsId": selectedFabrics,
			"selfFabricsColorId": selectedFabricsColorId,
			"liningFabricsId": selectedLining,
			"liningFabricsColorId": selectedLiningFabricsColorId,
			"combos": comboArr,
			"sizeCategoryId": selectedSizeCategoryId,
			"sizes": sizeArr,
			"styleAlterations": alterationOptionsArray,
			"styleAttributes": attrArr,
			"styleOptions": styleOptionsArray,
			"rushId": selectedRushOptionId,
			"wearDate": formatDate(wearDate),
			"estimatedShipDate": formatDate(shipDate)
		};

		if (selectedFabrics === "") {
			delete cloneArray['selfFabricsId'];
		}
		if (selectedFabricsColorId === "") {
			delete cloneArray['selfFabricsColorId'];
		}
		if (selectedLining === "") {
			delete cloneArray['liningFabricsId'];
		}
		if (selectedLiningFabricsColorId === "") {
			delete cloneArray['liningFabricsColorId'];
		}
		if (comboArr.length === 0) {
			delete cloneArray['combos'];
		}
		if (sizeArr.length === 0) {
			delete cloneArray['sizes'];
		}
		if (alterationOptionsArray.length === 0) {
			delete cloneArray['styleAlterations'];
		}
		if (attrArr.length === 0) {
			delete cloneArray['styleAttributes'];
		}
		if (styleOptionsArray.length === 0) {
			delete cloneArray['styleOptions'];
		}
		if (selectedRushOptionId === "") {
			delete cloneArray['rushId'];
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
			"items": [cloneArray]
		}


		const tokenInStorage = localStorage.getItem('accessToken')

		const formData = {
			"feaMethod": "upsertOrder",
			"accessToken": tokenInStorage,
			"parameters": JSON.stringify(parameters)
		}

		API.post('/', new URLSearchParams(formData))
			.then(response => {
				console.log("============BulkResponse===========", response)
				if (response.data.errorCode === "0") {
					addToast("Order was successfully saved!", { appearance: "success", autoDismiss: true });
					let tempOrdersId = "";
					let tempItemsId = "";
					let allCartItemsIds = [];
					let responseItemsIds = [];

					cartItems.map((item, i) => {
						allCartItemsIds.push(item.itemsId)
					})
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

					setEditBoolean(true)

					let cloneData = {
						cloningItemsId: bulkProductProps[0].itemsId,
						selfItemsId: tempItemsId
					}

					cloneOrder(cloneData)

					localStorage.setItem("previous_wearDate", wearDate)

					// Router.push('/other/cart');
				} else {
					addToast(response.data.errorMessage, { appearance: "error", autoDismiss: true });
				}
			})
			.catch(error => {
				console.log('error', error);
			});

	}

	const removeOrder = () => {
		let parameters = {
			"ordersId": bulkProductProps[0].ordersId,
			"itemsIds": [
				{
					"itemsId": bulkProductProps[0].itemsId
				}
			]
		}


		const tokenInStorage = localStorage.getItem('accessToken')

		const formData = {
			"feaMethod": "deleteOrdersItems",
			"accessToken": tokenInStorage,
			"parameters": JSON.stringify(parameters)
		}

		API.post('/', new URLSearchParams(formData))
			.then(response => {
				if (response.data.errorCode === "0") {
					addToast("Order was successfully removed!", { appearance: "success", autoDismiss: true });
					// Router.push('/other/cart');
					deleteFromCart(bulkProductProps[0], null)
				} else {
					addToast(response.data.errorMessage, { appearance: "error", autoDismiss: true });
				}
			})
			.catch(error => {
				console.log('error', error);
			});

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
		getPriceAPI()
	}

	const handleComboFabricColorsChange = (e) => {
		let array = [...comboArray];
		var index = e.target.selectedIndex;
		var optionElement = e.target.childNodes[index];
		var comboId = optionElement.getAttribute('data-combo-index');
		var fabricId = optionElement.getAttribute('data-fabric-index');
		var colorId = optionElement.getAttribute('data-color-index');

		array[comboId].fabric.color.color_name = e.target.value;
		array[comboId].fabric.color.color_id = bulkProductProps[0].combos[comboId].fabric[fabricId].fabricsColor[colorId].fabricsColorId;
		array[comboId].fabric.color.rgb = bulkProductProps[0].combos[comboId].fabric[fabricId].fabricsColor[colorId].fabricsColorRGB;
		console.log("========>>", bulkProductProps[0].combos[comboId].fabric[fabricId].fabricsColor[colorId].fabricsColorRGB)

		setComboArray(array);
		getPriceAPI()
	}



	const handleStyleOption = (options) => {
		let testExtra = 0;
		setStyleOptionSelected(options)
		const sum = sumExtraPrices(options);
		let alterationSum = 0;
		if (alterationSelected.length > 0) alterationSum = sumExtraPrices(alterationSelected);
		setExtraPrice(sum + alterationSum);
		getPriceAPI()
	}

	const handleAlterationOption = (options) => {
		let testExtra = 0;
		setAlterationSelected(options)
		const sum = sumExtraPrices(options);
		let styleOptionSum = 0;
		if (styleOptionSelected.length > 0) styleOptionSum = sumExtraPrices(styleOptionSelected);
		setExtraPrice(sum + styleOptionSum);
		getPriceAPI()
	}


	const sumExtraPrices = (arr) => {
		return arr.reduce((a, b) => { return a + parseInt(b.price) }, 0);
	}

	const getPriceAPI = () => {
		console.log("===>CHAGNIE<===", selectedFabrics)
		const tokenInStorage = localStorage.getItem('accessToken')

		const priceJson = {
			"productTypeId": bulkProductProps[0].productTypeId,
			"productId": bulkProductProps[0].productId,
			"selfFabricsId": selectedFabrics,
			"selfFabricsColorId": selectedFabricsColorId,
			"liningFabricsId": selectedLining,
			"liningFabricsColorId": selectedLiningFabricsColorId,
			"combos": comboArr,
			"sizeCategoryId": selectedSizeCategoryId,
			"sizes": sizeArr,
			"styleAlterations": alterationOptionsArray,
			"styleAttributes": attrArr,
			"styleOptions": styleOptionsArray,
			"estimatedShipDate": formatDate(shipDate)
		}

		const formData = {
			"feaMethod": "getPrice",
			"accessToken": tokenInStorage,
			"parameters": JSON.stringify(priceJson)
		}

		API.post('/', new URLSearchParams(formData))
			.then(response => {
				console.log('====DescriptionResponse====', response);
				if (response.data.errorCode === "0") {
					setTotalCost(response.data.total)
					setExtraCost(response.data.extra)
					setPrice(response.data.price)
					setExtraDesc(response.data.extraDescription)
				}
			})
			.catch(error => {
				console.log('error', error);
			});

	}

	// useMemo(() => {
	// 	getPriceAPI()
	// }, [bulkProductProps[0]])

	useMemo(() => {
		let sum = 0;
		// console.log("YOU're here!", regularSizeArray)
		if (regularSizeArray && JSON.parse(regularSizeArray).length > 0) {

			JSON.parse(regularSizeArray).map((item) => {
				if (selectedSizeCategory === item.sizeCategoryName) {
					item.sizes.map((size) => {
						sum = sum + parseInt(size.sizeCode)
					})
					setTotalItems(sum)
				}
			})
			getPriceAPI()
			console.log("111111111111111111111111111111111111111111")
		}

	}, [regularSizeArray])

	return (
		<div className="bulk-container">
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Link
					href={`/shop/product-basic/[slug]?slug=${bulkProductProps[0].productName}`}
					as={
						"/shop/product-basic/" + bulkProductProps[0].productName
					}
				>
					<a>
						<img
							style={{ width: "115px" }}
							src={
								bulkProductProps[0].picture.length > 0 && bulkProductProps[0].picture[0].url
							}
							className="img-fluid image"
							alt=""
						/>
					</a>
				</Link>
				<Link
					className="product-name"
					href={`/shop/product-basic/[slug]?slug=${bulkProductProps[0].productName}`}
					as={
						"/shop/product-basic/" + bulkProductProps[0].productName
					}
				>
					<a style={{ marginTop: "10px", fontWeight: "400", fontSize: "16px" }}>{bulkProductProps[0].productCode}</a>
				</Link>
				<Link
					className="product-name"
					href={`/shop/product-basic/[slug]?slug=${bulkProductProps[0].productName}`}
					as={
						"/shop/product-basic/" + bulkProductProps[0].productName
					}
				>
					<a style={{ marginTop: "10px", fontWeight: "bold", fontSize: "20px" }}>{bulkProductProps[0].productName}</a>
				</Link>
			</div>

			<div className="bulk-container__settings">
				<Col lg={12} className="bulk-container__settings__fabrics" style={{ marginBottom: "20px" }}>
					<Col lg={3}>
						<div className="bulk-container__settings__fabrics__container">
							{bulkProductProps[0].fabrics && bulkProductProps[0].fabrics.length > 0 ? (
								<div className="product-content__size-color">
									<div className="bulk-container__settings__fabrics__container__title">
										<div className="product-content__size__title bulk-container__settings__fabrics__container__title__header">Fabrics</div>
										<div className="product-content__size__content">
											<select
												style={{ width: "100%", height: "37px", cursor: "pointer" }}
												value={selectedFabrics}
												disabled={editBoolean}
												onChange={(event) => {
													setSelectedFabrics(event.target.value)
													setSelectedFabricsColor(bulkProductProps[0].fabrics.find(x => x.fabricsId === event.target.value).fabricsColor[0].fabricColorName)
													getPriceAPI()
												}}
											>
												{bulkProductProps[0].fabrics &&
													bulkProductProps[0].fabrics.map((single, i) => {
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
								<div style={{ marginTop: "10px" }} className="product-content__size-color">
									<div className="bulk-container__settings__fabrics__container__title">
										<div className="product-content__size__title"></div>
										<div className="product-content__size__content">
											<div className="product-content__color__content">
												<select
													style={{ width: "100%", height: "37px", cursor: "pointer" }}
													disabled={editBoolean}
													onChange={(event) => {
														// console.log("!!!!!!!!!", event.target.value.split("/")[1])
														setSelectedFabricsColor(event.target.value.split("/")[1]);
														setSelectedFabricsColorId(event.target.value.split("/")[0]);
														getPriceAPI()
													}}
												>
													{bulkProductProps[0].fabrics.map((single, j) => single.fabricsId === selectedFabrics ? single.fabricsColor.map((color, i) => {
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
						</div>
					</Col>
					<Col lg={3}>
						<div className="bulk-container__settings__fabrics__container">
							{bulkProductProps[0].lining && bulkProductProps[0].lining.length > 0 ? (
								<div className="product-content__size-color">
									<div className="bulk-container__settings__fabrics__container__title">
										<div className="product-content__size__title bulk-container__settings__fabrics__container__title__header">Lining</div>
										<div className="product-content__size__content">
											<select
												style={{ width: "100%", height: "37px", cursor: "pointer" }}
												value={selectedLining}
												disabled={editBoolean}
												onChange={(event) => {
													setSelectedLining(event.target.value)
													setSelectedLiningFabricsColor(bulkProductProps[0].lining.find(x => x.fabricsId === event.target.value).fabricsColor[0].fabricColorName)
													getPriceAPI()
												}}
											>
												{bulkProductProps[0].lining &&
													bulkProductProps[0].lining.map((single, i) => {
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
								<div className="product-content__size-color" style={{ marginTop: "10px" }}>
									<div className="bulk-container__settings__fabrics__container__title">
										<div className="product-content__size__title"></div>
										<div className="product-content__size__content">
											<div className="product-content__color__content">
												<select
													style={{ width: "100%", height: "37px", cursor: "pointer" }}
													// value={selectedLiningFabricsColor}
													disabled={editBoolean}
													onChange={(event) => {
														setSelectedLiningFabricsColor(event.target.value.split("/")[1]);
														setSelectedLiningFabricsColorId(event.target.value.split("/")[0])
														getPriceAPI()
													}}
												>
													{bulkProductProps[0].lining.map((single, j) => single.fabricsId === selectedLining ? single.fabricsColor.map((color, i) => {
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
						</div>
					</Col>
					{bulkProductProps[0].combos && bulkProductProps[0].combos.length > 0 ?
						bulkProductProps[0].combos.map((combo, comboIndex) => {
							return (
								<Col lg={3} className="bulk-container__settings__fabrics__container">
									<div className="product-content__size-color">
										<div className="bulk-container__settings__fabrics__container__title">
											<div className="product-content__size__title bulk-container__settings__fabrics__container__title__header">{combo.combosName}</div>
											<div className="product-content__size__content">
												<select
													style={{ width: "100%", height: "37px", cursor: "pointer" }}
													value={bulkProductProps[0].comboArray ? bulkProductProps[0].comboArray[comboIndex].fabric.fabric_name : comboArray[comboIndex]?.fabric.fabric_name ?? ''}
													disabled={editBoolean}
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
									<div style={{ marginTop: "10px" }} className="product-content__size-color">
										<div className="bulk-container__settings__fabrics__container__title">
											<div className="product-content__size__title"></div>
											<div className="product-content__size__content">
												<div className="product-content__color__content">
													<select
														style={{ width: "100%", height: "37px", cursor: "pointer" }}
														value={comboArray[comboIndex]?.fabric.color.color_name ?? ''}
														onChange={handleComboFabricColorsChange}
														disabled={editBoolean}
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
								</Col>
							);
						}) : (
							""
						)}
				</Col>
				<Col lg={12} className="bulk-container__settings__fabrics" style={{ marginBottom: "20px" }}>
					{bulkProductProps[0].styleAttributes && bulkProductProps[0].styleAttributes.length > 0 ? (
						<Col lg={6} style={{ padding: "0px" }}>
							<div style={{ alignItems: "baseline" }}>
								<div className="header">
									{bulkProductProps[0].styleAttributes.map((item, i) => item.styleAttrybutesValues && item.styleAttrybutesValues.length > 0 &&
										(
											<Col lg={4} style={{ marginBottom: "10px" }}>
												<div className="product-content__size-color">
													<div className="bulk-container__settings__fabrics__container__title">
														<div className="product-content__size__title bulk-container__settings__fabrics__container__title__header">{item.styleAttrybutesName}</div>
														<div className="product-content__size__content">
															<select
																style={{ width: "100%", height: "37px", cursor: "pointer" }}
																disabled={editBoolean}
																onChange={(event) => {
																	handleAttributeChange(event, item.styleAttrybutesName)
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
												</div>
											</Col>
										)
									)}
								</div>
							</div>
						</Col>
					) : (
						""
					)}
					<Col lg={6} className="bulk-container__settings__fabrics">
						{bulkProductProps[0].styleAlterations && bulkProductProps[0].styleAlterations.length > 0 ? (
							<Col lg={7} style={{ marginBottom: "10px" }}>
								<div className="product-content__size-color">
									<div className="bulk-container__settings__fabrics__container__title">
										<div className="product-content__size__title bulk-container__settings__fabrics__container__title__header">Alteration</div>
										<div className="product-content__size__content">
											<MultiSelect
												options={alterationOptions}
												value={alterationSelected}
												disabled={editBoolean ? true : false}
												onChange={handleAlterationOption}
												labelledBy="Select Alteration"
												hasSelectAll={false}
											/>
										</div>
									</div>
								</div>
							</Col>
						) : (
							""
						)}

						{bulkProductProps[0].styleOptions && bulkProductProps[0].styleOptions.length > 0 ? (
							<Col lg={5}>
								<div className="product-content__size-color">
									<div className="bulk-container__settings__fabrics__container__title">
										<div
											className="bulk-container__settings__fabrics__container__title__header product-content__size__title">Options</div>
										<div className="product-content__size__content">
											<MultiSelect
												options={styleOptions}
												value={styleOptionSelected}
												onChange={handleStyleOption}
												disabled={editBoolean}
												labelledBy="Select"
												hasSelectAll={false}
											/>
										</div>
									</div>
								</div>
							</Col>
						) : (
							""
						)}
					</Col>
				</Col>
				<Col lg={12} className="bulk-container__settings__size-main">
					{!bulkProductProps[0].regularOrder ? (
						<div className="product-content__size-color">
							<div style={{ alignItems: "baseline" }}>
								<div className="product-content__size__content bulk-container__settings__fabrics" style={{ display: "flex", alignItems: "center" }}>
									<Col lg={2} className="size-main__title">
										<div className="product-content__size__title bulk-container__settings__fabrics__container__title__header__title-header">Size</div>
										<div className="product-content__size__content">
											<select
												style={{ width: "100%", height: "37px", cursor: "pointer" }}
												disabled={editBoolean}
												value={`${selectedSizeCategoryId}/${selectedSizeCategory}`}
												onChange={(event) => {
													setSelectedSizeCategory(event.target.value.split("/")[1])
													handleResetSizeArrayInput(event.target.value.split("/")[1])
													setSelectedSizeCategoryId(event.target.value.split("/")[0])
													getPriceAPI()
												}}
											>
												{JSON.parse(regularSizeArray).length > 0 ? JSON.parse(regularSizeArray).map((category, i) => {
													return (
														<option value={`${category.sizeCategoryId}/${category.sizeCategoryName}`}>{category.sizeCategoryName}</option>
													)
												}) : ""}
											</select>
										</div>
									</Col>
									<Col lg={10}>
										<div className="inputs">
											{JSON.parse(regularSizeArray).length > 0 && JSON.parse(regularSizeArray).map((item, i) => {
												if (item.sizeCategoryName === selectedSizeCategory) {
													return item.sizes.map((size, j) => {
														return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
															<span style={{ fontSize: "14px", textAlign: "center", color: "#333", margin: "10px 0px" }}>{size.sizeName}</span>
															<input style={{ width: "50px", textAlign: "center", margin: "0px 10px" }} disabled={editBoolean} type="number" id={`size-${size.sizeName}`} value={size.sizeCode} data-position={`${i}-${j}`} name="amount" max="999" min="0" onChange={(e) => handleRegularSizeArray(e)} />
														</div>
													})
												}
											})}
											<div style={{ display: "flex", flexDirection: "column" }}>
												<span style={{ fontSize: "14px", textAlign: "center", color: "#333", margin: "10px 0px" }}>Total</span>
												<input disabled style={{ width: "50px", textAlign: "center", margin: "0px 10px" }} value={totalItems} />
											</div>
										</div>
									</Col>
								</div>
							</div>
						</div>
					) : (
						<>
							<div className="bulk-container__settings__size-main__regular-desktop">
								<div className="product-content__size-color" style={{ marginBottom: "20px" }}>
									<div style={{ alignItems: "center" }}>
										<div className="product-content__size__content" style={{ display: "flex", alignItems: "end" }}>
											<Col lg={2} style={{ padding: "10px", padding: "0px" }}>
												{bulkProductProps[0].sizeCategories && bulkProductProps[0].sizeCategories.length > 0 && (
													<select
														style={{ width: "100%", height: "37px", cursor: "pointer" }}
														disabled={editBoolean}
														onChange={(event) => {
															setSelectedSizeCategory(event.target.value.split("::")[1])
															setSelectedSizeCategoryId(event.target.value.split("::")[0])
															getPriceAPI()
														}}
														value={`${selectedSizeCategoryId}::${selectedSizeCategory}`}
													>
														{bulkProductProps[0].sizeCategories &&
															bulkProductProps[0].sizeCategories.map((size, i) => {
																return (
																	<option key={i} value={`${size.sizeCategoryId}::${size.sizeCategoryName}`}>{size.sizeCategoryName}</option>
																);
															})
														}
													</select>
												)}
											</Col>
											<Col lg={2}>
												{sizeCategory && (
													<div className="product-content__size-color">
														<div>
															<div className="product-content__size__title"></div>
															<div className="product-content__size__content">
																<div className="product-content__color__content">
																	<select
																		style={{ width: "100%", height: "37px", cursor: "pointer" }}
																		disabled={editBoolean}
																		onChange={(event) => {
																			setSelectedCategorySizeValue(event.target.value.split("::")[1]);
																			setSelectedCategorySizeValueId(event.target.value.split("::")[0]);
																			getPriceAPI()
																		}}
																		value={`${selectedCategorySizeValueId}::${selectedCategorySizeValue}`}
																	>
																		{bulkProductProps[0].sizeCategories.map((single, j) => single.sizeCategoryName === selectedSizeCategory ? single.sizes.map((size, i) => {
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
											</Col>
											<Col lg={2}></Col>
											<Col lg={6}>
												<div className="product-content__quantity">
													<div className="product-content__quantity__title">Quantity</div>
													<div className="cart-plus-minus">
														<button
															onClick={() => {
																setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
																getPriceAPI()
															}}
															disabled={editBoolean}
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
																getPriceAPI()
															}}
															disabled={editBoolean}
															className="qtybutton"
														>
															+
														</button>
													</div>
												</div>
											</Col>
										</div>
									</div>
								</div>
							</div>

							<div className="bulk-container__settings__size-main__regular-mobile">
								<div className="bulk-container__settings__fabrics__container">
									{bulkProductProps[0].sizeCategories ? (
										<div className="product-content__size-color">
											<div className="bulk-container__settings__fabrics__container__title">
												<div className="product-content__size__title bulk-container__settings__fabrics__container__title__header">Size</div>
												<div className="product-content__size__content">
													<select
														style={{ width: "100%", height: "37px", cursor: "pointer" }}
														disabled={editBoolean}
														value={sizeCategory}
														onChange={(event) => {
															setSizeCategory(event.target.value)
															getPriceAPI()
														}}
													>
														{bulkProductProps[0].sizeCategories &&
															bulkProductProps[0].sizeCategories.map((size, i) => {
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
									{sizeCategory && (
										<div style={{ marginTop: "10px" }} className="product-content__size-color">
											<div className="bulk-container__settings__fabrics__container__title">
												<div className="product-content__size__title"></div>
												<div className="product-content__size__content">
													<div className="product-content__color__content">
														<select
															style={{ width: "100%", height: "37px", cursor: "pointer" }}
															disabled={editBoolean}
															value={selectedCategorySizeValue}
															onChange={(event) => {
																setSelectedCategorySizeValue(event.target.value);
																getPriceAPI()
															}}
														>
															{bulkProductProps[0].sizeCategories.map((single, j) => single.sizeCategoryName === sizeCategory ? single.sizes.map((size, i) => {
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
								</div>
								<div className="product-content__quantity">
									<div className="product-content__quantity__title">Quantity</div>
									<div className="cart-plus-minus">
										<button
											onClick={() => {
												setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
												getPriceAPI()
											}}
											disabled={editBoolean}
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
												getPriceAPI()
											}}
											disabled={editBoolean}
											className="qtybutton"
										>
											+
										</button>
									</div>
								</div>
							</div>
						</>
					)}
				</Col>

				<Col lg={12} className="bulk-container__settings__fabrics" style={{ marginTop: "20px", alignItems: "center" }}>
					<Col lg={4} style={{ marginBottom: "10px" }}>
						<div className="product-content__size-color">
							<div className="bulk-container__settings__fabrics__container__title">
								<div className="product-content__size__title bulk-container__settings__fabrics__container__title__header">Wear Date</div>
								<div className="product-content__size__content">
									<DatePicker onChange={setWearDate} disabled={editBoolean} value={wearDate} style={{ height: "37px", width: "100%" }} />
								</div>
							</div>
						</div>
					</Col>
					<Col lg={4} style={{ marginBottom: "10px" }}>
						<div className="product-content__size-color">
							<div className="bulk-container__settings__fabrics__container__title">
								<div className="product-content__size__title bulk-container__settings__fabrics__container__title__header">Lead Time</div>
								<div className="product-content__size__content">
									<select
										disabled={editBoolean}
										style={{ width: "100%", height: "37px", cursor: "pointer" }}
										onChange={(event) => {
											handleSelectRushOption(event.target.value)
											getPriceAPI()
										}}
										value={selectedRushOptionId}
									>
										{/* <option key={999} value="999">-- Select the rush option --</option> */}
										{bulkProductProps[0].rushOptions &&
											bulkProductProps[0].rushOptions.map((single, i) => {
												return (
													<option key={i} value={single.rushId}>{single.rushName}</option>
												);
											})
										}
									</select>
								</div>
							</div>
						</div>
					</Col>
					<Col lg={4} style={{ marginBottom: "10px" }}>
						<div className="product-content__size-color">
							<div className="bulk-container__settings__fabrics__container__title">
								<div className="product-content__size__title bulk-container__settings__fabrics__container__title__header">Ship Date</div>
								<div className="product-content__size__content">
									<DatePicker disabled value={shipDate} style={{ height: "37px", width: "100%" }} />
								</div>
							</div>
						</div>
					</Col>
				</Col>

				<Col lg={12} className="bulk-container__settings__fabrics__footer">
					<div className="price-table" style={{ padding: "10px 0px", border: "1px solid", marginTop: "20px" }}>
						<div style={{ display: "flex", marginBottom: "10px" }}>
							<Col lg={3}><div className="product-content__size__title">Price: </div></Col>
							{/* <Col lg={3}><div className="product-content__size__content">
								<span>${parseInt(bulkProductProps[0].discountedPrice).toFixed(2)}</span>
							</div></Col> */}
							<Col lg={3}><div className="product-content__size__content">
								<span>${price}</span>
							</div></Col>
						</div>
						<div style={{ display: "flex", marginBottom: "10px" }}>
							<Col lg={3}><div className="product-content__size__title">Quantity: </div></Col>
							<Col lg={3}><div className="product-content__size__content">
								<span>{!bulkProductProps[0].regularOrder && bulkProductProps[0].totalItems || !bulkProductProps[0].regularOrder && !bulkProductProps[0].totalItems ? totalItems : quantityCount}</span>
							</div></Col>
						</div>
						<div style={{ display: "flex", marginBottom: "10px" }}>
							<Col lg={3}><div className="product-content__size__title">Extras: </div></Col>
							{/* <Col lg={3}><div className="product-content__size__content">
								<span>${(extraPrice * (!bulkProductProps[0].regularOrder && bulkProductProps[0].totalItems || !bulkProductProps[0].regularOrder && !bulkProductProps[0].totalItems ? totalItems : quantityCount)).toFixed(2)}</span>
							</div></Col> */}
							<Col lg={3}><div className="product-content__size__content">
								<span>${extraCost}</span>
							</div></Col>
						</div>
						<div style={{ display: "flex", marginBottom: "10px" }}>
							<Col lg={3}><div className="product-content__size__title">Total: </div></Col>
							{/* <Col lg={3}><div className="product-content__size__content">
								<span>${(!bulkProductProps[0].regularOrder && bulkProductProps[0].totalItems || !bulkProductProps[0].regularOrder && !bulkProductProps[0].totalItems ? parseInt(bulkProductProps[0].discountedPrice) * totalItems + (extraPrice * totalItems) : parseInt(bulkProductProps[0].discountedPrice) * quantityCount + (extraPrice * quantityCount)).toFixed(2)}</span>
							</div></Col> */}
							<Col lg={3}><div className="product-content__size__content">
								<span>${totalCost}</span>
							</div></Col>
						</div>
					</div>
					<Col lg={6} style={{ padding: "0px", marginBottom: "20px" }}>
						{editBoolean ? (
							<Col lg={12} className="buttonsGroup" style={{ display: "flex", marginTop: "20px", justifyContent: "center", padding: "0px", gap: "10px" }}>
								{bulkProductProps[0].selectedFabrics ? (
									<>
										<button
											className="lezada-button lezada-button--medium"
											onClick={() =>
												handleCloneOrder()
											}
										>
											Clone Item
										</button>
										<button
											className="lezada-button lezada-button--medium"
											onClick={() =>
												editOrder()
											}
										>
											Edit Item
										</button>
										<button
											className="lezada-button lezada-button--medium"
											onClick={() =>
												removeOrder()
											}
										>
											Remove Item
										</button>
									</>
								) : (
									<button
										className="lezada-button lezada-button--medium"
										disabled={editBoolean ? true : false}
										onClick={() =>
											handleBulkOrder()
										}
									>
										Not setted
									</button>
								)}
							</Col>
						) : (
							<Col lg={12} style={{ display: "flex", marginTop: "20px", justifyContent: "center", padding: "0px" }}>
								{bulkProductProps[0].selectedFabrics ? (
									<button
										className="lezada-button lezada-button--medium product-content__cart space-mr--10"
										disabled={rushError}
										onClick={() =>
											handleBulkOrder()
										}
									>
										Save Edited Item
									</button>
								) : (
									<button
										className="lezada-button lezada-button--medium product-content__cart space-mr--10"
										disabled={rushError}
										onClick={() =>
											handleBulkOrder()
										}
									>
										Save Item
									</button>
								)}
							</Col>
						)}
					</Col>
					<Col lg={6}>
						<table className="cart-table">
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
									{/* <td style={{ paddingLeft: "10px 0px" }}>${parseInt(bulkProductProps[0].discountedPrice).toFixed(2)}</td> */}
									<td style={{ paddingLeft: "10px 0px" }}>${price}</td>
									<td style={{ paddingLeft: "10px 0px" }}>{!bulkProductProps[0].regularOrder && bulkProductProps[0].totalItems || !bulkProductProps[0].regularOrder && !bulkProductProps[0].totalItems ? totalItems : quantityCount}</td>
									{/* <td style={{ paddingLeft: "10px 0px" }}>${(extraPrice * (!bulkProductProps[0].regularOrder && bulkProductProps[0].totalItems || !bulkProductProps[0].regularOrder && !bulkProductProps[0].totalItems ? totalItems : quantityCount)).toFixed(2)}</td> */}
									<td style={{ paddingLeft: "10px 0px" }}>${extraCost}</td>
									{/* <td style={{ paddingLeft: "10px 0px" }}>${(!bulkProductProps[0].regularOrder && bulkProductProps[0].totalItems || !bulkProductProps[0].regularOrder && !bulkProductProps[0].totalItems ? parseInt(bulkProductProps[0].discountedPrice) * totalItems + (extraPrice * totalItems) : parseInt(bulkProductProps[0].discountedPrice) * quantityCount + (extraPrice * quantityCount)).toFixed(2)}</td> */}
									<td style={{ paddingLeft: "10px 0px" }}>${totalCost}</td>
								</tr>
							</tbody>
						</table>
					</Col>
				</Col>
			</div>
		</div >
	)

};

export default BulkProduct;