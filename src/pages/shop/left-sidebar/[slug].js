import Link from "next/link";
import Router from 'next/router';
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
// import { Pagination } from "../../../components/Pagination";
// import Paginator from "react-hooks-paginator";
import { connect } from "react-redux";
// import { SlideDown } from "react-slidedown";
import { useToasts } from "react-toast-notifications";
import { BreadcrumbOne } from "../../../components/Breadcrumb";
import { LayoutTwo } from "../../../components/Layout";
import { ShopHeader, ShopProducts, ShopSidebar } from "../../../components/Shop";
import { getCollections } from "../../../redux/actions/navigationActions";
import { getProductsList } from "../../../redux/actions/productListActions";

const LeftSidebar = ({ products }) => {
	const { addToast } = useToasts();

	const [pageCount, setPageCount] = useState(0);
	const [pageIndex, setPageIndex] = useState(1);

	const [apiProducts, setApiProducts] = useState([])
	const [apiFilteredProducts, setApiFilteredProducts] = useState([])
	const [collections, setCollections] = useState('')

	const [layout, setLayout] = useState("grid four-column");
	const [sortType, setSortType] = useState("");
	const [sortValue, setSortValue] = useState('all');
	const [filterSortType, setFilterSortType] = useState("");
	const [filterSortValue, setFilterSortValue] = useState("");
	const [offset, setOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentData, setCurrentData] = useState([]);
	const [sortedProducts, setSortedProducts] = useState([]);
	const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
	const [totalLength, setTotalLength] = useState(0);
	const [seasonsItems, setSeasonsItems] = useState('')

	const pageLimit = 24;

	const getLayout = (layout) => {
		setLayout(layout);
	};

	const getSortParams = async (type, value, pageIndex) => {
		console.log("######", pageIndex)
		localStorage.setItem('navCollection', null)
		setSortValue(value)
		let filtered = [];
		const falseArray = undefined

		if (value === "all") {
			const response = await getProductsList(falseArray, pageIndex);
			if (response.data.errorText === 'accessToken expired' || localStorage.getItem('accessToken') === undefined) {
				addToast("Access Token expired, please log in again!", { appearance: "error", autoDismiss: true });
				Router.push('/other/login');
			} else {
				setApiProducts(response.data.items)
				setTotalLength(response.data.totalItems);
				setPageCount(response.data.pages);
			}
		} else {
			let fabricId = "";
			console.log("AAA", pageIndex)
			if (collections) {
				collections.map((col, i) => {
					col.fabrics.map((item, i) => {
						if (item.name === value) {
							fabricId = item.id
						}
					})
				})
				const filterArray = {
					fabricId: fabricId
				}
				console.log("$%$%$%$%$5", filterArray)
				const response = await getProductsList(filterArray, pageIndex);
				if (response.data.errorText === 'accessToken expired' || localStorage.getItem('accessToken') === undefined) {
					addToast("Access Token expired, please log in again!", { appearance: "error", autoDismiss: true });
					Router.push('/other/login');
				} else {

					setApiProducts(response.data.items)
					setTotalLength(response.data.totalItems);
					setPageCount(response.data.pages);
				}
			}
		}

		setApiFilteredProducts(filtered);
	};

	const getFilterSortParams = (sortType, sortValue) => {
		setFilterSortType(sortType);
		setFilterSortValue(sortValue);
	};

	const getPageProducts = () => {
		return apiFilteredProducts.slice(offset, offset + pageLimit)
	}

	useEffect(async () => {
		console.log("STATRT")
		const collectionArray = JSON.parse(localStorage.getItem("navCollection"))
		const response = await getProductsList(collectionArray, pageIndex);
		if (response.data.errorText === 'accessToken expired' || localStorage.getItem('accessToken') === undefined) {
			addToast("Access Token expired, please log in again!", { appearance: "error", autoDismiss: true });
			Router.push('/other/login');
		} else {

			setApiProducts(response.data.items)
			setTotalLength(response.data.totalItems);
			setPageCount(response.data.pages);
		}
	}, [localStorage.getItem('navCollection')])

	useEffect(async () => {
		const response = await getCollections();
		if (response.data.season) {
			const navArray = response.data.collections;
			let seasonArray = {
				seasons: response.data.season
			}
			navArray.push(seasonArray)

			let seasonsTotal = 0;
			response.data.season.map(item => {
				seasonsTotal += parseInt(item.itemsCount)
			})
			setSeasonsItems(seasonsTotal)
			setCollections(navArray)
		} else {
			setCollections(response.data.collections)
		}
	}, [])

	const searchProduct = async (searchKey) => {
		const collectionArray = {
			searchKey: searchKey
		};
		localStorage.setItem("navCollection", JSON.stringify(collectionArray));

		const response = await getProductsList(collectionArray, 1);
		if (response.data.errorText === 'accessToken expired' || localStorage.getItem('accessToken') === undefined) {
			addToast("Access Token expired, please log in again!", { appearance: "error", autoDismiss: true });
			Router.push('/other/login');
		} else {

			setApiProducts(response.data.items)
			setTotalLength(response.data.totalItems);
			setPageCount(response.data.pages);
		}
	}

	const handlePageClick = async (event) => {

		setPageIndex(event.selected + 1)
		if (localStorage.getItem('navCollection') === "null") {
			console.log(`User requested page number ${event.selected}`, sortValue);
			getSortParams("category", sortValue, event.selected + 1)
		} else {
			const collectionArray = JSON.parse(localStorage.getItem("navCollection"))
			const response = await getProductsList(collectionArray, event.selected + 1);
			if (response.data.errorText === 'accessToken expired' || localStorage.getItem('accessToken') === undefined) {
				addToast("Access Token expired, please log in again!", { appearance: "error", autoDismiss: true });
				Router.push('/other/login');
			} else {

				setApiProducts(response.data.items)
				setTotalLength(response.data.totalItems);
				setPageCount(response.data.pages);
			}
		}

	};

	return (
		<LayoutTwo>
			{/* breadcrumb */}
			<BreadcrumbOne
				pageTitle="Shop Left Sidebar"
				backgroundImage="/assets/images/esme-images/products_banner.png"
			>
				<ul className="breadcrumb__list">
					<li>
						<Link href="/" as={process.env.PUBLIC_URL + "/"}>
							<a>Home</a>
						</Link>
					</li>

					<li>Shop Left Sidebar</li>
				</ul>
			</BreadcrumbOne>
			<div className="shop-page-content">
				{/* shop page header */}
				<ShopHeader
					getLayout={getLayout}
					getFilterSortParams={getFilterSortParams}
					productCount={totalLength}
					sortedProductCount={apiProducts.length}
					shopTopFilterStatus={shopTopFilterStatus}
					setShopTopFilterStatus={setShopTopFilterStatus}
				/>

				{/* shop header filter */}
				{/* <SlideDown closed={shopTopFilterStatus ? false : true}>
					<ShopFilter products={products} getSortParams={getSortParams} />
				</SlideDown> */}

				{/* shop page body */}
				<div className="shop-page-content__body space-mt--r130 space-mb--r130">
					<Container>
						<Row>
							<Col
								lg={3}
								className="order-2 order-lg-1 space-mt-mobile-only--50"
							>
								{/* shop sidebar */}
								<ShopSidebar
									products={apiProducts}
									getSortParams={getSortParams}
									collections={collections}
									searchProduct={searchProduct}
									seasonsItems={seasonsItems}
								/>
							</Col>

							<Col lg={9} className="order-1 order-lg-2">
								{/* shop products */}
								<ShopProducts layout={layout} products={apiProducts} />

								{/* shop product pagination */}
								<div className="pro-pagination-style">
									{/* <Paginator
										totalRecords={totalLength}
										pageLimit={pageLimit}
										pageNeighbours={2}
										setOffset={setOffset}
										currentPage={currentPage}
										setCurrentPage={setCurrentPage}
										pageContainerClass="mb-0 mt-0"
										pagePrevText="«"
										pageNextText="»"
									/> */}
									{/* <Pagination
										data={apiProducts}
										RenderComponent={Post}
										title="Posts"
										buttonConst={3}
										contentPerPage={5}
										siblingCount={1}
									/> */}
									{pageCount > 1 && (
										<ReactPaginate
											breakLabel="..."
											nextLabel=""
											onPageChange={handlePageClick}
											pageRangeDisplayed={3}
											pageCount={pageCount}
											previousLabel=""
											renderOnZeroPageCount={null}
											pageLinkClassName="page-link"
											previousClassName="page-item"
											previousLinkClassName="page-link"
											nextClassName="page-item"
											nextLinkClassName="page-link"
											breakClassName="page-item"
											breakLinkClassName="page-link"
											marginPagesDisplayed={2}
											pageClassName="page-item"
											activeClassName="active"
											selectedPageRel="canonical"
										/>
									)}
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		</LayoutTwo>
	);
};

const mapStateToProps = (state) => {
	return {
		products: state.productData
	};
};

export default connect(mapStateToProps)(LeftSidebar);
