import Link from "next/link";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
// import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
// import {
// 	addBulkToCart
// } from "../../redux/actions/cartActions";

const BulkProduct = ({ addBulkToCart, bulkProductProps, deleteFromCart }) => {

	console.log("bulkProductProps_________________", bulkProductProps)

	const { addToast } = useToasts();
	let cartTotalPrice = 0;
	//custom 
	const [selectedLining, setSelectedLining] = useState("");
	const [selectedLiningFabricsColor, setSelectedLiningFabricsColor] = useState("");
	const [selectedFabrics, setSelectedFabrics] = useState("");
	const [selectedFabricsColor, setSelectedFabricsColor] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [alterationSelected, setAlterationSelected] = useState(bulkProductProps[0].selectedAlteration ? bulkProductProps[0].selectedAlteration : []);
	const [styleOptionSelected, setStyleOptionSelected] = useState(bulkProductProps[0].selectedStyleOption ? bulkProductProps[0].selectedStyleOption : []);
	const [selectedFabric, setSelectedFabric] = useState({ combo: 0, fabric: 0, color: 0 });
	const [totalItems, setTotalItems] = useState(0);
	const [selectedSizeCategory, setSelectedSizeCategory] = useState("Regular Size")

	const [selectedComboFabric, setSelectedComboFabric] = useState(
		bulkProductProps[0] && bulkProductProps[0].combos.map((combo, i) => {
			return { combo: i, fabric: 0, color: 0 }
		})
	);
	const [regularSizeArray, setRegularSizeArray] = useState(
		bulkProductProps[0].regularSizeArray ? JSON.stringify(bulkProductProps[0].regularSizeArray) :
			JSON.stringify(bulkProductProps[0] && bulkProductProps[0].sizeCategories.map((each) => {

				const sizes = each.sizes.map((eachSize) => {
					return {
						sizeCode: 0,
						sizeName: eachSize.sizeName
					}
				})
				each.sizes = sizes
				return each
			}))
	);

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
			item.sizes.map((size) => {
				sum = sum + parseInt(size.sizeCode)
			})
		})

		setTotalItems(sum)
	}, [regularSizeArray])

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

	useEffect(() => {
		setSelectedAttr([]);
		if (bulkProductProps[0].selectedAttr && bulkProductProps[0].selectedAttr.length > 1) {
			setSelectedAttr(bulkProductProps[0].selectedAttr);
		} else {
			bulkProductProps[0].styleAttributes.map((item) => {
				setSelectedAttr((old) => [...old, { attr: item.styleAttrybutesName, value: item.styleAttrybutesValues[0].styleAttrybutesValueName }]);
			});
		}

	}, [bulkProductProps[0].styleAttributes]);

	const [comboArray, setComboArray] = useState([])

	const [editBoolean, setEditBoolean] = useState(bulkProductProps[0].selectedFabrics ? true : false)

	const handleBulkOrder = () => {
		setEditBoolean(true)
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
	}

	const editOrder = () => {
		setEditBoolean(false)
	}

	const removeOrder = () => {
		console.log("#@###################")
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

	useEffect(() => {
		setComboArray([]);
		if (bulkProductProps[0].comboArray) {
			setComboArray(bulkProductProps[0].comboArray);
		} else {
			bulkProductProps[0].combos.map((item) => {
				setComboArray((old) => [...old, { combo: item.combosName, fabric: { fabric_index: 0, fabric_name: item.fabric[0].fabricsName, color: { color_name: item.fabric[0].fabricsColors[0].fabricsColorName, rgb: item.fabric[0].fabricsColors[0].fabricsColorRGB } } }]);
			});
		}
	}, [bulkProductProps[0].combos]);

	return (
		<div style={{ display: "flex", padding: "10px", paddingTop: "20px" }}>
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

			<div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
				<Col lg={12} style={{ padding: "0px", display: "flex" }}>
					<Col lg={3}>
						<div style={{ display: "flex", flexDirection: "column" }}>
							{bulkProductProps[0].fabrics ? (
								<div className="product-content__size-color">
									<div className="product-content__size space-mb--20">
										<div style={{ marginRight: "10px" }} className="product-content__size__title">Fabrics</div>
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
								<div className="product-content__size-color">
									<div className="product-content__size space-mb--20">
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
									<div className="product-content__size space-mb--20">
										<div style={{ marginRight: "10px" }} className="product-content__size__title">Lining</div>
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
								<div className="product-content__size-color">
									<div className="product-content__size space-mb--20">
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
										<div className="product-content__size space-mb--20">
											<div style={{ marginRight: "10px" }} className="product-content__size__title">{combo.combosName}</div>
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
									<div className="product-content__size-color">
										<div className="product-content__size space-mb--20">
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
				<Col lg={12} style={{ display: "flex" }}>
					{bulkProductProps[0].styleAttributes ? (
						<Col lg={6}>
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
					<Col lg={6} style={{ display: "flex" }}>
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
				<Col lg={12} style={{ marginTop: "20px", marginLeft: "15px" }}>
					{regularSizeArray ? (
						<div className="product-content__size-color">
							<div style={{ alignItems: "baseline" }}>
								<div className="product-content__size__content" style={{ display: "flex", alignItems: "center" }}>
									<Col lg={2}>
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
													<span style={{ fontSize: "14px", textAlign: "center", color: "#333" }}>{size.sizeName}</span>
													<input style={{ width: "50px", textAlign: "center", margin: "10px" }} disabled={editBoolean} type="number" id={`size-${size.sizeName}`} value={size.sizeCode} data-position={`0-${j}`} name="amount" max="999" onChange={(e) => setRegualrSizeArray(e)} />
												</div>
											})}
											{selectedSizeCategory === "Specific Size" && JSON.parse(regularSizeArray).length > 1 && JSON.parse(regularSizeArray)[1].sizes.map((size, j) => {
												return (
													<>
														<div style={{ display: "flex", flexDirection: "column" }}>
															<span style={{ fontSize: "14px", textAlign: "center", color: "#333" }}>{size.sizeName}</span>
															<input disabled={editBoolean} style={{ width: "50px", textAlign: "center", margin: "10px" }} type="number" id={`size-${size.sizeName}`} value={size.sizeCode} data-position={`1-${j}`} name="amount" max="999" min="0" onChange={(e) => setRegualrSizeArray(e)} />
														</div>
													</>
												)
											})}
										</div>
									</Col>
								</div>
							</div>
						</div>
					) : (
						""
					)}
				</Col>
				<Col lg={12} style={{ display: "flex" }}>
					<Col lg={9}>{''}</Col>
					<Col lg={3} style={{ textAlign: "center" }}>
						<div className="product-content__size__title">Total Items:
							<input style={{ width: "50px", textAlign: "center", margin: "10px" }} value={bulkProductProps[0].totalItems ? bulkProductProps[0].totalItems : totalItems} disabled />
						</div>
					</Col>
				</Col>
				<Col lg={12} style={{ marginTop: "10px", display: "flex" }}>
					<Col lg={6}>{''}</Col>
					<Col lg={6}>
						<table className="cart-table">
							<thead>
								<tr>
									<th className="product-name" style={{ fontSize: "14px" }}>
										Unit Price
									</th>
									<th className="product-price" style={{ fontSize: "14px" }}>Discounted Price</th>
									<th className="product-quantity" style={{ fontSize: "14px" }}>Extras</th>
									<th className="product-subtotal" style={{ fontSize: "14px" }}>Total</th>
								</tr>
							</thead>
							<tbody>
								<tr style={{ textAlign: "center" }}>
									<td style={{ paddingLeft: "0px" }}>${bulkProductProps[0].standardPrice}</td>
									<td style={{ paddingLeft: "0px" }}>${bulkProductProps[0].discountedPrice}</td>
									<td style={{ paddingLeft: "0px" }}>$0.00</td>
									<td style={{ paddingLeft: "0px" }}>${bulkProductProps[0].totalItems ? bulkProductProps[0].discountedPrice * bulkProductProps[0].totalItems : bulkProductProps[0].discountedPrice * totalItems}</td>
								</tr>
							</tbody>
						</table>
					</Col>
				</Col>
				{editBoolean ? (
					<Col lg={12} style={{ display: "flex", marginTop: "20px" }}>
						<Col lg={6}>{''}</Col>
						<Col lg={6} style={{ textAlign: "center" }}>
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
					</Col>
				) : (
					<Col lg={12} style={{ display: "flex", marginTop: "20px" }}>
						<Col lg={6}>{''}</Col>
						<Col lg={6} style={{ textAlign: "center" }}>
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
					</Col>
				)}
			</div>
		</div >
	)

};

export default BulkProduct;