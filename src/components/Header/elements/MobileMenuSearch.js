import Router from 'next/router';
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const MobileMenuSearch = () => {
  const [searchKey, setSearchKey] = useState("")

  const handleSearchKey = (e) => {
    setSearchKey(e.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchProduct(searchKey)
    }
  }

  const searchProduct = async (searchKey) => {
    const colName = "All bridesmaid";
    const collectionArray = {
      searchKey: searchKey
    };
    localStorage.setItem("navCollection", JSON.stringify(collectionArray));
    localStorage.setItem('router', `/shop/left-sidebar/${colName}`)
    Router.push(`/shop/left-sidebar/${colName}`);
  }
  return (
    <div className="offcanvas-mobile-menu__search">
      <div>
        <input type="search" placeholder="Search products ..." onKeyPress={handleKeyPress} onChange={handleSearchKey} />
        <button type="button" onClick={searchProduct}>
          <IoIosSearch />
        </button>
      </div>
    </div>
  );
};

export default MobileMenuSearch;
