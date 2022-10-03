import Router from 'next/router';
import { useState } from "react";
import { MdClose } from "react-icons/md";

const SearchOverlay = ({ activeStatus, getActiveStatus }) => {

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
    Router.push(`/shop/left-sidebar/${colName}`);
  }

  return (
    <div className={`search-overlay ${activeStatus ? "active" : ""}`}>
      {/*=======  close icon  =======*/}
      <button
        className="search-overlay__close-icon"
        onClick={() => {
          getActiveStatus(false);
          document.querySelector("body").classList.remove("overflow-hidden");
        }}
      >
        <MdClose />
      </button>
      {/*=======  End of close icon  =======*/}
      {/*=======  search overlay content  =======*/}
      <div className="search-overlay__content">
        <div className="space-mb--20" style={{ fontSize: "67px", border: "none", borderBottom: "2px solid #333", background: "none" }}>
          <input type="search" placeholder="Search products ..." onKeyPress={handleKeyPress} onChange={handleSearchKey} style={{ border: "none" }} />
        </div>
        <div className="search-overlay__hint"># Hit enter to search</div>
      </div>
      {/*=======  End of search overlay content  =======*/}
    </div>
  );
};

export default SearchOverlay;
