import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Col } from "react-bootstrap";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MultiSelect } from "react-multi-select-component";
// import { connect } from "react-redux";
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { Tooltip } from "react-tippy";
import { useToasts } from "react-toast-notifications";
// import {
// 	addBulkToCart
// } from "../../redux/actions/cartActions";

const BulkProduct = ({ addToCart, addBulkToCart, bulkProductProps, deleteFromCart }) => {
	console.log("BulkProductPage/bulkProductProps => ", bulkProductProps[0])
	const { addToast } = useToasts();
	let cartTotalPrice = 0;
	const [wearDate, setWearDate] = useState(new Date());
	const [shipDate, setShipDate] = useState(new Date());
	const [rushError, setRushError] = useState(true);
	const [selectedRushOptionId, setSelectedRushOptionId] = useState("999");
	const [selectedRushOption, setSelectedRushOption] = useState("");
	//custom 
	const [selectedLining, setSelectedLining] = useState("");
	const [selectedLiningFabricsColor, setSelectedLiningFabricsColor] = useState("");
	const [selectedFabrics, setSelectedFabrics] = useState("");
	const [selectedFabricsColor, setSelectedFabricsColor] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [alterationSelected, setAlterationSelected] = useState([]);
	const [styleOptionSelected, setStyleOptionSelected] = useState([]);
	const [selectedFabric, setSelectedFabric] = useState({ combo: 0, fabric: 0, color: 0 });
	const [totalItems, setTotalItems] = useState(0);
	const [selectedSizeCategory, setSelectedSizeCategory] = useState("")

	const [sizeCategory, setSizeCategory] = useState("");

	const [selectedCategorySizeValue, setSelectedCategorySizeValue] = useState("");

	const [regularSizeArray, setRegularSizeArray] = useState(JSON.stringify([]));

	const [extraPrice, setExtraPrice] = useState(0);

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
		}
	}, [bulkProductProps[0].selectedRushOption])

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
			if (bulkProductProps[0].selectedSizeCategory) {
				setSizeCategory(bulkProductProps[0].selectedSizeCategory)
				setSelectedSizeCategory(bulkProductProps[0].selectedSizeCategory)
			} else {
				setSizeCategory(bulkProductProps[0].sizeCategories && bulkProductProps[0].sizeCategories.length > 0 && bulkProductProps[0].sizeCategories[0].sizeCategoryName)
				setSelectedSizeCategory(bulkProductProps[0].sizeCategories && bulkProductProps[0].sizeCategories.length > 0 && bulkProductProps[0].sizeCategories[0].sizeCategoryName)
			}
			if (bulkProductProps[0].lining && bulkProductProps[0].lining.length > 0) {
				setSelectedLining(bulkProductProps[0].selectedLining ? bulkProductProps[0].selectedLining : bulkProductProps[0].lining[0].fabricsId)
			}
			if (bulkProductProps[0].lining && bulkProductProps[0].lining.length > 0) {
				setSelectedLiningFabricsColor(bulkProductProps[0].selectedLiningFabricsColor ? bulkProductProps[0].selectedLiningFabricsColor : bulkProductProps[0].lining[0].fabricsColor[0].fabricColorName)
			}
			if (bulkProductProps[0].fabrics && bulkProductProps[0].fabrics.length > 0) {
				setSelectedFabrics(bulkProductProps[0].selectedFabrics ? bulkProductProps[0].selectedFabrics : bulkProductProps[0].fabrics[0].fabricsId)
			}
			if (bulkProductProps[0].fabrics && bulkProductProps[0].fabrics.length > 0) {
				setSelectedFabricsColor(bulkProductProps[0].selectedFabricsColor ? bulkProductProps[0].selectedFabricsColor : bulkProductProps[0].fabrics[0].fabricsColor[0].fabricColorName)
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

			if (bulkProductProps[0].selectedAttr && bulkProductProps[0].selectedAttr.length > 0) {
				setSelectedAttr(bulkProductProps[0].selectedAttr);
			} else {
				bulkProductProps[0].styleAttributes && bulkProductProps[0].styleAttributes.map((item) => {
					setSelectedAttr((old) => [...old, { attr: item.styleAttrybutesName, value: item.styleAttrybutesValues[0].styleAttrybutesValueName }]);
				});
			}

			if (bulkProductProps[0].comboArray) {
				setComboArray(bulkProductProps[0].comboArray);
			} else {
				bulkProductProps[0].combos && bulkProductProps[0].combos.map((item) => {
					setComboArray((old) => [...old, { combo: item.combosName, fabric: { fabric_index: 0, fabric_name: item.fabric[0].fabricsName, color: { color_name: item.fabric[0].fabricsColor[0].fabricColorName, rgb: item.fabric[0].fabricsColor[0].fabricsColorRGB } } }]);
				});
			}
		}


	}, [bulkProductProps]);


	// console.log("styleOptions/styleOptions=>", JSON.parse(regularSizeArray)[0])

	//custom
	const alterationOptions = [];
	bulkProductProps[0] && bulkProductProps[0].styleAlterations && bulkProductProps[0].styleAlterations.length > 0 && bulkProductProps[0].styleAlterations.map((single, i) => {
		let array = {
			label: "",
			value: "",
			price: ""
		};
		array.label = single.styleAlterationName + ' ' + `($${single.price})`;
		array.value = single.styleAlterationId;
		array.price = single.price;
		alterationOptions.push(array)
	});

	const styleOptions = [];
	bulkProductProps[0] && bulkProductProps[0].styleOptions && bulkProductProps[0].styleOptions.length > 0 && bulkProductProps[0].styleOptions.map((single, i) => {
		let array = {
			label: "",
			value: "",
			price: ""
		};
		array.label = single.styleOptionName + ' ' + `($${single.price})`;
		array.value = single.styleOptionId;
		array.price = single.price;
		styleOptions.push(array)
	});

	const handleRegularSizeArray = (e) => {
		let result = e.target.value;
		if (result === "" || result === NaN || totalItems === NaN) {
			const index = e.target.dataset.position.split('-')
			let sizeArray = JSON.parse(regularSizeArray)
			sizeArray[index[0]].sizes[index[1]].sizeCode = 0;
			setRegularSizeArray(JSON.stringify(sizeArray))
			result = 0;
		} else {
			const index = e.target.dataset.position.split('-')
			console.log("!!!!! =>", result)
			console.log(index)
			let sizeArray = JSON.parse(regularSizeArray)
			sizeArray[index[0]].sizes[index[1]].sizeCode = ((sizeArray[index[0]].sizes[index[1]].sizeCode * 0) + result).replace(/^0+/, '');
			console.log('sizeArray', sizeArray)
			setRegularSizeArray(JSON.stringify(sizeArray))
		}
	}

	useEffect(() => {
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
		}

	}, [regularSizeArray])

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

	const handleSelectRushOption = (val) => {
		const selectedOption = bulkProductProps[0].rushOptions.filter((option, i) => option.rushId === val);
		const leadTime = selectedOption[0].leadTime;
		const today = new Date();
		const estimatedShipDate = new Date(today.getTime() + parseInt(leadTime) * 7 * 24 * 60 * 60 * 1000);
		setShipDate(estimatedShipDate);
		setSelectedRushOptionId(val);
		setSelectedRushOption(selectedOption)
	}

	const formatDate = (date) => {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2)
			month = '0' + month;
		if (day.length < 2)
			day = '0' + day;

		return [month, day, year].join('-');
	}

	const handleRushDate = (e) => {
		console.log("``````````````````````EEEEE", typeof e)
		setWearDate(e)
	}

	const disallowRush = (val) => {
		if (val) {
			addToast("Sorry, you cannot add the dress to the cart because it has different lead time than the others. Place separated order please.", { appearance: "error", autoDismiss: true });
		} else {
			addToast("Now you can add the product to your cart!", { appearance: "success", autoDismiss: true });
		}
	}



	useEffect(() => {
		if (bulkProductProps[0].wearDate) {
			console.log("111")
			if (selectedRushOptionId !== "999") {
				console.log("222")
				if (new Date(shipDate).getTime() > new Date(wearDate).getTime()) {
					disallowRush(true);
					console.log("333")
					setRushError(true)
				} else {
					console.log("444")
					disallowRush(false);
					setRushError(false)
				}
			}
		} else {
			console.log("555")
			if (selectedRushOptionId !== "999") {
				console.log("666")
				if (shipDate.getTime() > wearDate.getTime()) {
					console.log("777")
					disallowRush(true);
					setRushError(true)
				} else {
					console.log("888")
					disallowRush(false);
					setRushError(false)
				}
			}
		}
	}, [wearDate, selectedRushOptionId])

	const [productStock, setProductStock] = useState(
		bulkProductProps[0].inStock ? bulkProductProps[0].inStock : 0
	);
	const [quantityCount, setQuantityCount] = useState(bulkProductProps[0].quantity ? bulkProductProps[0].quantity : 1);

	const [comboArray, setComboArray] = useState([])

	const [editBoolean, setEditBoolean] = useState(bulkProductProps[0].selectedFabrics ? true : false)

	const handleBulkOrder = () => {
		setEditBoolean(true)
		if (!bulkProductProps[0].regularOrder) {
			addBulkToCart({
				bulkProduct: bulkProductProps[0],
				addToast,
				selectedFabrics,
				selectedFabricsColor,
				selectedLining,
				selectedLiningFabricsColor,
				comboArray,
				selectedAttr,
				selectedSizeCategory,
				regularSizeArray,
				alterationSelected,
				styleOptionSelected,
				totalItems,
				extraPrice,
				wearDate,
				shipDate,
				selectedRushOption
			})
		} else {
			addToCart(
				bulkProductProps[0],
				addToast,
				quantityCount,
				selectedFabrics,
				selectedFabricsColor,
				selectedLining,
				selectedLiningFabricsColor,
				comboArray,
				selectedAttr,
				sizeCategory,
				selectedCategorySizeValue,
				alterationSelected,
				styleOptionSelected,
				extraPrice,
				wearDate,
				shipDate,
				selectedRushOption
			)
		}
	}

	const editOrder = () => {
		setEditBoolean(false)
	}

	const removeOrder = () => {
		deleteFromCart(bulkProductProps[0], addToast)
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
		array[comboId].fabric.color.rgb = bulkProductProps[0].combos[comboId].fabric[fabricId].fabricsColor[colorId].fabricsColorRGB;

		setComboArray(array);
	}


	// testExtra += parseInt(styleOptionSelected[0].price)
	// testExtra += parseInt(alterationSelected[0].price)

	// console.log("styleOptionSelected=>", styleOptionSelected[0].price)

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



	const sumExtraPrices = (arr) => {
		return arr.reduce((a, b) => { return a + parseInt(b.price) }, 0);
	}

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
													value={selectedFabricsColor}
													disabled={editBoolean}
													onChange={(event) => {
														setSelectedFabricsColor(event.target.value);
													}}
												>
													{bulkProductProps[0].fabrics.map((single, j) => single.fabricsId === selectedFabrics ? single.fabricsColor.map((color, i) => {
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
													value={selectedLiningFabricsColor}
													disabled={editBoolean}
													onChange={(event) => {
														setSelectedLiningFabricsColor(event.target.value);
													}}
												>
													{bulkProductProps[0].lining.map((single, j) => single.fabricsId === selectedLining ? single.fabricsColor.map((color, i) => {
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
																value={selectedAttr && selectedAttr.length > 0 && selectedAttr[i].attr === item.styleAttrybutesName ? selectedAttr[i].value : ""}
																disabled={editBoolean}
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
												value={selectedSizeCategory}
												onChange={(event) => {
													setSelectedSizeCategory(event.target.value)
													handleResetSizeArrayInput(event.target.value)
												}}
											>
												{JSON.parse(regularSizeArray).length > 0 ? JSON.parse(regularSizeArray).map((category, i) => {
													return (
														<option value={category.sizeCategoryName}>{category.sizeCategoryName}</option>
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
														value={sizeCategory}
														onChange={(event) => {
															setSizeCategory(event.target.value)
														}}
													>
														{bulkProductProps[0].sizeCategories.length > 0 &&
															bulkProductProps[0].sizeCategories.map((size, i) => {
																return (
																	<option key={i} value={size.sizeCategoryName}>{size.sizeCategoryName}</option>
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
																		value={selectedCategorySizeValue}
																		onChange={(event) => {
																			setSelectedCategorySizeValue(event.target.value);
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
											</Col>
											<Col lg={2}></Col>
											<Col lg={6}>
												<div className="product-content__quantity">
													<div className="product-content__quantity__title">Quantity</div>
													<div className="cart-plus-minus">
														<button
															onClick={() =>
																setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
															}
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
															onClick={() =>
																setQuantityCount(quantityCount + 1)
															}
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
											onClick={() =>
												setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
											}
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
											onClick={() =>
												setQuantityCount(quantityCount + 1)
											}
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
										}}
										selected={selectedRushOptionId}
									>
										<option key={999} value="999">-- Select the rush option --</option>
										{bulkProductProps[0].rushOptions &&
											bulkProductProps[0].rushOptions.map((single, i) => {
												return (
													<option key={i} selected={selectedRushOptionId === single.rushId} value={single.rushId}>{single.rushName}</option>
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
							<Col lg={3}><div className="product-content__size__content">
								<span>${parseInt(bulkProductProps[0].discountedPrice).toFixed(2)}</span>
							</div></Col>
						</div>
						<div style={{ display: "flex", marginBottom: "10px" }}>
							<Col lg={3}><div className="product-content__size__title">Quantity: </div></Col>
							<Col lg={3}><div className="product-content__size__content">
								<span>{bulkProductProps[0].totalItems ? totalItems : quantityCount}</span>
							</div></Col>
						</div>
						<div style={{ display: "flex", marginBottom: "10px" }}>
							<Col lg={3}><div className="product-content__size__title">Extras: </div></Col>
							<Col lg={3}><div className="product-content__size__content">
								<span>${(extraPrice * totalItems).toFixed(2)}</span>
							</div></Col>
						</div>
						<div style={{ display: "flex", marginBottom: "10px" }}>
							<Col lg={3}><div className="product-content__size__title">Total: </div></Col>
							<Col lg={3}><div className="product-content__size__content">
								<span>${(bulkProductProps[0].totalItems ? parseInt(bulkProductProps[0].discountedPrice) * totalItems + (extraPrice * totalItems) : parseInt(bulkProductProps[0].discountedPrice) * quantityCount + (extraPrice * totalItems)).toFixed(2)}</span>
							</div></Col>
						</div>
					</div>
					<Col lg={6} style={{ padding: "0px", marginBottom: "20px" }}>
						{editBoolean ? (
							<Col lg={12} style={{ display: "flex", marginTop: "20px", justifyContent: "center", padding: "0px" }}>
								{bulkProductProps[0].selectedFabrics ? (
									<>
										<button
											className="lezada-button lezada-button--medium"
											onClick={() =>
												editOrder()
											}
										>
											Edit Order
										</button>
										<button
											style={{ marginLeft: "20px" }}
											className="lezada-button lezada-button--medium"
											onClick={() =>
												removeOrder()
											}
										>
											Remove Order
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
										Save Edited Order
									</button>
								) : (
									<button
										className="lezada-button lezada-button--medium product-content__cart space-mr--10"
										disabled={rushError}
										onClick={() =>
											handleBulkOrder()
										}
									>
										Save Order
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
									<td style={{ paddingLeft: "10px 0px" }}>${parseInt(bulkProductProps[0].discountedPrice).toFixed(2)}</td>
									<td style={{ paddingLeft: "10px 0px" }}>{bulkProductProps[0].totalItems ? totalItems : quantityCount}</td>
									<td style={{ paddingLeft: "10px 0px" }}>${(extraPrice * totalItems).toFixed(2)}</td>
									<td style={{ paddingLeft: "10px 0px" }}>${(bulkProductProps[0].totalItems ? parseInt(bulkProductProps[0].discountedPrice) * totalItems + (extraPrice * totalItems) : (bulkProductProps[0].quantity ? parseInt(bulkProductProps[0].discountedPrice) * quantityCount + (extraPrice * totalItems) : 0)).toFixed(2)}</td>
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