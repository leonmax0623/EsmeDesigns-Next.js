import Link from "next/link";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
// import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
// import {
// 	addBulkToCart
// } from "../../redux/actions/cartActions";

const BulkProduct = ({ addToCart, addBulkToCart, bulkProductProps, deleteFromCart }) => {
	console.log("BulkProductPage/bulkProductProps => ", bulkProductProps[0])
	const { addToast } = useToasts();
	let cartTotalPrice = 0;
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
	const [selectedSizeCategory, setSelectedSizeCategory] = useState("Regular Size")

	const [sizeCategory, setSizeCategory] = useState(
		bulkProductProps[0].selectedSizeCategory ? bulkProductProps[0].selectedSizeCategory : bulkProductProps[0].sizeCategories[0].sizeCategoryName
	);

	const [selectedCategorySizeValue, setSelectedCategorySizeValue] = useState(
		bulkProductProps[0].selectedSize ? bulkProductProps[0].selectedSize : bulkProductProps[0].sizeCategories[0].sizes[0].sizeName
	);

	const [regularSizeArray, setRegularSizeArray] = useState(JSON.stringify([]));

	useEffect(() => {
		if (bulkProductProps[0]) {
			if (bulkProductProps[0].lining) {
				setSelectedLining(bulkProductProps[0].selectedLining ? bulkProductProps[0].selectedLining : bulkProductProps[0].lining[0].fabricsId)
			}
			if (bulkProductProps[0].lining) {
				setSelectedLiningFabricsColor(bulkProductProps[0].selectedLiningFabricsColor ? bulkProductProps[0].selectedLiningFabricsColor : bulkProductProps[0].lining[0].fabricsColors[0].fabricsColorName)
			}
			if (bulkProductProps[0].fabrics) {
				setSelectedFabrics(bulkProductProps[0].selectedFabrics ? bulkProductProps[0].selectedFabrics : bulkProductProps[0].fabrics[0].fabricsId)
			}
			if (bulkProductProps[0].fabrics) {
				setSelectedFabricsColor(bulkProductProps[0].selectedFabricsColor ? bulkProductProps[0].selectedFabricsColor : bulkProductProps[0].fabrics[0].fabricsColors[0].fabricsColorName)
			}
			if (bulkProductProps[0].sizeCategories) {
				setSelectedSize(bulkProductProps[0].sizeCategories[0].sizes[0].sizeName)
			}

			if (bulkProductProps[0].regularSizeArray) {
				console.log("True!!!!!", JSON.stringify(bulkProductProps[0].regularSizeArray))
				setRegularSizeArray(JSON.stringify(bulkProductProps[0].regularSizeArray))
			} else {
				console.log("False!!!!!")
				setRegularSizeArray(JSON.stringify(bulkProductProps[0] && bulkProductProps[0].sizeCategories.map((each) => {

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

			if (bulkProductProps[0].selectedAttr && bulkProductProps[0].selectedAttr.length > 1) {
				setSelectedAttr(bulkProductProps[0].selectedAttr);
			} else {
				bulkProductProps[0].styleAttributes.map((item) => {
					setSelectedAttr((old) => [...old, { attr: item.styleAttrybutesName, value: item.styleAttrybutesValues[0].styleAttrybutesValueName }]);
				});
			}

			if (bulkProductProps[0].comboArray) {
				setComboArray(bulkProductProps[0].comboArray);
			} else {
				bulkProductProps[0].combos.map((item) => {
					setComboArray((old) => [...old, { combo: item.combosName, fabric: { fabric_index: 0, fabric_name: item.fabric[0].fabricsName, color: { color_name: item.fabric[0].fabricsColors[0].fabricsColorName, rgb: item.fabric[0].fabricsColors[0].fabricsColorRGB } } }]);
				});
			}
		}
	}, [bulkProductProps]);

	//custom
	const alterationOptions = [];
	bulkProductProps[0] && bulkProductProps[0].styleAlterations.map((single, i) => {
		let array = {
			label: "",
			value: ""
		};
		array.label = single.styleAlterationName;
		array.value = single.price;
		alterationOptions.push(array)
	});

	const styleOptions = [];
	bulkProductProps[0] && bulkProductProps[0].styleOptions.map((single, i) => {
		let array = {
			label: "",
			value: ""
		};
		array.label = single.styleOptionName;
		array.value = single.price;
		styleOptions.push(array)
	});

	const setRegualrSizeArray = (e) => {

		let result = e.target.value;
		if (result === "") {
			result = 0;
		} else {
			const index = e.target.dataset.position.split('-')
			let sizeArray = JSON.parse(regularSizeArray)
			sizeArray[index[0]].sizes[index[1]].sizeCode = result.replace(/[^\d]/g, '');
			setRegularSizeArray(JSON.stringify(sizeArray))
		}
	}

	useEffect(() => {
		let sum = 0;
		JSON.parse(regularSizeArray).map((item) => {
			if (selectedSizeCategory === item.sizeCategoryName) {
				item.sizes.map((size) => {
					sum = sum + parseInt(size.sizeCode)
				})
				setTotalItems(sum)
			}
		})
	}, [regularSizeArray, selectedSizeCategory])

	// useEffect(() => {
	// 	setTotalItems(0)
	// 	// setRegularSizeArray(JSON.stringify(bulkProductProps[0] && bulkProductProps[0].sizeCategories.map((each) => {

	// 	// 	const sizes = each.sizes.map((eachSize) => {
	// 	// 		return {
	// 	// 			sizeCode: 0,
	// 	// 			sizeName: eachSize.sizeName
	// 	// 		}
	// 	// 	})
	// 	// 	each.sizes = sizes
	// 	// 	return each
	// 	// })))
	// }, [selectedSizeCategory])

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

	const [productStock, setProductStock] = useState(
		bulkProductProps[0].inStock ? bulkProductProps[0].inStock : 0
	);
	const [quantityCount, setQuantityCount] = useState(bulkProductProps[0].quantity ? bulkProductProps[0].quantity : 1);

	const [comboArray, setComboArray] = useState([])

	const [editBoolean, setEditBoolean] = useState(bulkProductProps[0].selectedFabrics ? true : false)

	const handleBulkOrder = () => {
		setEditBoolean(true)
		if (!bulkProductProps[0].regularOrder) {
			addBulkToCart(
				bulkProductProps[0],
				addToast,
				selectedFabrics,
				selectedFabricsColor,
				selectedLining,
				selectedLiningFabricsColor,
				comboArray,
				selectedAttr,
				regularSizeArray,
				alterationSelected,
				styleOptionSelected,
				totalItems
			)
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
				styleOptionSelected
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
		array[comboId].fabric.color.rgb = bulkProductProps[0].combos[comboId].fabric[fabricId].fabricsColors[colorId].fabricsColorRGB;

		setComboArray(array);
	}
	console.log("#####", bulkProductProps[0].regularSizeArray)

	return (
		<div style={{ display: "flex", padding: "20px", borderBottom: "1px solid rgb(237, 237, 237)" }}>
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Link
					href={`/shop/product-basic/[slug]?slug=${bulkProductProps[0].productName}`}
					as={
						process.env.PUBLIC_URL + "/shop/product-basic/" + bulkProductProps[0].productName
					}
				>
					<a>
						<img
							style={{ width: "115px" }}
							src={
								process.env.PUBLIC_URL +
								bulkProductProps[0].pictures[0].url
							}
							className="img-fluid"
							alt=""
						/>
					</a>
				</Link>
				<Link
					className="product-name"
					href={`/shop/product-basic/[slug]?slug=${bulkProductProps[0].productName}`}
					as={
						process.env.PUBLIC_URL + "/shop/product-basic/" + bulkProductProps[0].productName
					}
				>
					<a style={{ marginTop: "10px" }}>{bulkProductProps[0].productName}</a>
				</Link>
			</div>

			<div style={{ width: "100%", display: "flex", flexWrap: "wrap", padding: "0px 20px" }}>
				<Col lg={12} style={{ padding: "0px", display: "flex" }}>
					<Col lg={3}>
						<div style={{ display: "flex", flexDirection: "column" }}>
							{bulkProductProps[0].fabrics ? (
								<div className="product-content__size-color">
									<div>
										<div style={{ marginBottom: "10px" }} className="product-content__size__title">Fabrics</div>
										<div className="product-content__size__content">
											<select
												style={{ width: "100%", height: "37px", cursor: "pointer" }}
												value={selectedFabrics}
												disabled={editBoolean}
												onChange={(event) => {
													setSelectedFabrics(event.target.value)
													setSelectedFabricsColor(bulkProductProps[0].fabrics.find(x => x.fabricsId === event.target.value).fabricsColors[0].fabricsColorName)
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
									<div>
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
													{bulkProductProps[0].fabrics.map((single, j) => single.fabricsId === selectedFabrics ? single.fabricsColors.map((color, i) => {
														return (
															<option key={i} value={color.fabricsColorName}>{color.fabricsColorName}</option>
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
						<div style={{ display: "flex", flexDirection: "column" }}>
							{bulkProductProps[0].lining ? (
								<div className="product-content__size-color">
									<div>
										<div style={{ marginBottom: "10px" }} className="product-content__size__title">Lining</div>
										<div className="product-content__size__content">
											<select
												style={{ width: "100%", height: "37px", cursor: "pointer" }}
												value={selectedLining}
												disabled={editBoolean}
												onChange={(event) => {
													setSelectedLining(event.target.value)
													setSelectedLiningFabricsColor(bulkProductProps[0].lining.find(x => x.fabricsId === event.target.value).fabricsColors[0].fabricsColorName)
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
									<div>
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
													{bulkProductProps[0].lining.map((single, j) => single.fabricsId === selectedLining ? single.fabricsColors.map((color, i) => {
														return (
															<option key={i} value={color.fabricsColorName}>{color.fabricsColorName}</option>
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
					{bulkProductProps[0].combos ?
						bulkProductProps[0].combos.map((combo, comboIndex) => {
							return (
								<Col lg={3}>
									<div className="product-content__size-color">
										<div>
											<div style={{ marginBottom: "10px" }} className="product-content__size__title">{combo.combosName}</div>
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
										<div>
											<div className="product-content__size__title"></div>
											<div className="product-content__size__content">
												<div className="product-content__color__content">
													<select
														style={{ width: "100%", height: "37px", cursor: "pointer" }}
														value={comboArray[comboIndex]?.fabric.color.color_name ?? ''}
														onChange={handleComboFabricColorsChange}
														disabled={editBoolean}
													>
														{combo.fabric[comboArray[comboIndex]?.fabric.fabric_index ?? 0].fabricsColors.map((color, i) => {
															return (
																<option data-combo-index={comboIndex} data-fabric-index={comboArray[comboIndex]?.fabric.fabric_index ?? 0} data-color-index={i} value={color.fabricsColorName}>{color.fabricsColorName}</option>
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
				<Col lg={12} style={{ display: "flex", marginTop: "30px", padding: "0px" }}>
					{bulkProductProps[0].styleAttributes ? (
						<Col lg={6} style={{ padding: "0px" }}>
							<div style={{ alignItems: "baseline" }}>
								<div style={{ display: "flex" }}>
									{bulkProductProps[0].styleAttributes.map((item, i) => {
										return (
											<Col lg={4}>
												<div className="product-content__size-color">
													<div>
														<div style={{ marginBottom: "10px" }} className="product-content__size__title">{item.styleAttrybutesName}</div>
														<div className="product-content__size__content">
															<select
																style={{ width: "100%", height: "37px", cursor: "pointer" }}
																value={selectedAttr && selectedAttr.length > 1 && selectedAttr[i].attr === item.styleAttrybutesName ? selectedAttr[i].value : ""}
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
									})}
								</div>
							</div>
						</Col>
					) : (
						""
					)}
					<Col lg={6} style={{ display: "flex", padding: "0px" }}>
						{bulkProductProps[0].styleAlterations ? (
							<Col lg={7}>
								<div className="product-content__size-color">
									<div>
										<div style={{ marginBottom: "10px" }} className="product-content__size__title">Alteration</div>
										<div className="product-content__size__content">
											<MultiSelect
												options={alterationOptions}
												value={alterationSelected}
												disabled={editBoolean ? true : false}
												onChange={setAlterationSelected}
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

						{bulkProductProps[0].styleOptions ? (
							<Col lg={5}>
								<div className="product-content__size-color">
									<div>
										<div style={{ marginBottom: "10px" }} className="product-content__size__title">Options</div>
										<div className="product-content__size__content">
											<MultiSelect
												options={styleOptions}
												value={styleOptionSelected}
												onChange={setStyleOptionSelected}
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
				<Col lg={12} style={{ marginTop: "20px", marginLeft: "15px", padding: "0px" }}>
					{!bulkProductProps[0].regularOrder ? (
						<div className="product-content__size-color">
							<div style={{ alignItems: "baseline" }}>
								<div className="product-content__size__content" style={{ display: "flex", alignItems: "end" }}>
									<Col lg={2} style={{ padding: "10px", padding: "0px" }}>
										<select
											style={{ width: "100%", height: "30px", cursor: "pointer" }}
											disabled={editBoolean}
											onChange={(event) => {
												setSelectedSizeCategory(event.target.value)
											}}
										>
											{JSON.parse(regularSizeArray).length > 1 ? JSON.parse(regularSizeArray).map((category, i) => {
												return (
													<option value={category.sizeCategoryName}>{category.sizeCategoryName}</option>
												)
											}) : ""}
										</select>
									</Col>
									<Col lg={10}>
										<div style={{ display: "flex" }}>
											{selectedSizeCategory === "Regular Size" && JSON.parse(regularSizeArray).length > 1 && JSON.parse(regularSizeArray)[0].sizes.map((size, j) => {
												return <div style={{ display: "flex", flexDirection: "column" }}>
													<span style={{ fontSize: "14px", textAlign: "center", color: "#333", marginBottom: "10px" }}>{size.sizeName}</span>
													<input style={{ width: "50px", textAlign: "center", margin: "0px 10px" }} disabled={editBoolean} type="number" id={`size-${size.sizeName}`} value={size.sizeCode} data-position={`0-${j}`} name="amount" max="999" onChange={(e) => setRegualrSizeArray(e)} />
												</div>
											})}
											{selectedSizeCategory === "Specific Size" && JSON.parse(regularSizeArray).length > 1 && JSON.parse(regularSizeArray)[1].sizes.map((size, j) => {
												return (
													<>
														<div style={{ display: "flex", flexDirection: "column" }}>
															<span style={{ fontSize: "14px", textAlign: "center", color: "#333", marginBottom: "10px" }}>{size.sizeName}</span>
															<input disabled={editBoolean} style={{ width: "50px", textAlign: "center", margin: "0px 10px" }} type="number" id={`size-${size.sizeName}`} value={size.sizeCode} data-position={`1-${j}`} name="amount" max="999" min="0" onChange={(e) => setRegualrSizeArray(e)} />
														</div>
													</>
												)
											})}
											<div style={{ display: "flex", flexDirection: "column" }}>
												<span style={{ fontSize: "14px", textAlign: "center", color: "#333", marginBottom: "10px" }}>Total</span>
												<input disabled style={{ width: "50px", textAlign: "center", margin: "0px 10px" }} value={bulkProductProps[0].totalItems ? bulkProductProps[0].totalItems : totalItems} />
											</div>

										</div>
									</Col>
								</div>
							</div>
						</div>
					) : (
						<div className="product-content__size-color" style={{ marginBottom: "20px" }}>
							<div style={{ alignItems: "center" }}>
								<div className="product-content__size__content" style={{ display: "flex", alignItems: "end" }}>
									<Col lg={2} style={{ padding: "10px", padding: "0px" }}>
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
					)}
				</Col>
				<Col lg={12} style={{ marginTop: "10px", display: "flex", alignItems: "center", padding: "0px" }}>
					<Col lg={6} style={{ padding: "0px" }}>
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
										className="lezada-button lezada-button--medium"
										onClick={() =>
											handleBulkOrder()
										}
									>
										Save Edited Order
									</button>
								) : (
									<button
										className="lezada-button lezada-button--medium"
										onClick={() =>
											handleBulkOrder()
										}
									>
										Save Bulk Order
									</button>
								)}
							</Col>
						)}
					</Col>
					<Col lg={6}>
						<table className="cart-table">
							<thead>
								<tr>
									<th className="product-name" style={{ fontSize: "14px", textAlign: "center" }}>
										Price
									</th>
									<th className="product-price" style={{ fontSize: "14px", textAlign: "center" }}>Discounted</th>
									<th className="product-quantity" style={{ fontSize: "14px", textAlign: "center" }}>Extras</th>
									<th className="product-subtotal" style={{ fontSize: "14px", textAlign: "center" }}>Total</th>
								</tr>
							</thead>
							<tbody>
								<tr style={{ textAlign: "center" }}>
									<td style={{ paddingLeft: "0px" }}>${bulkProductProps[0].standardPrice}</td>
									<td style={{ paddingLeft: "0px" }}>${bulkProductProps[0].discountedPrice}</td>
									<td style={{ paddingLeft: "0px" }}>$0.00</td>
									<td style={{ paddingLeft: "0px" }}>${bulkProductProps[0].totalItems ? bulkProductProps[0].discountedPrice * bulkProductProps[0].totalItems : bulkProductProps[0].discountedPrice * quantityCount}</td>
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