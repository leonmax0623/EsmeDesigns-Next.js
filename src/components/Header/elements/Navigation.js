import Link from "next/link";
import Router from 'next/router';
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { getCollections } from "../../../redux/actions/navigationActions";
const Navigation = () => {
  const [collections, setCollections] = useState('')
  const [seasonsItems, setSeasonsItems] = useState('')

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

  const navigate = (colId, colName, fabricId, fabricName) => {
    const collectionArray = {
      collectionId: colId,
      collectionName: colName,
      fabricId: fabricId,
      fabricName: fabricName
    }
    localStorage.setItem('navCollection', JSON.stringify(collectionArray))
    if (fabricId === undefined && fabricName === undefined) {
      Router.push(`/shop/left-sidebar/${colName}`);
    } else {
      Router.push(`/shop/left-sidebar/${fabricName}`);
    }
  }

  const navigateSeason = (seasonId, seasonName) => {
    const collectionArray = {
      seasonId: seasonId,
      seasonName: seasonName
    }
    localStorage.setItem('navCollection', JSON.stringify(collectionArray))
    Router.push(`/shop/left-sidebar/${seasonName}`);
  }

  return (
    <nav className="header-content__navigation space-pr--15 space-pl--15 d-none d-lg-block">
      <ul>
        {collections && collections.map((col, i) => {
          return (
            <li key={i} className="position-relative">
              <a onClick={() => navigate(col.id, col.name)}>{col.name ? col.name : "Seasons"} ({col.itemsCount ? col.itemsCount : seasonsItems})</a>
              <IoIosArrowDown />
              <ul className="sub-menu sub-menu--one-column">
                {col && col.fabrics && col.fabrics.map((item, j) => {
                  return (
                    <li key={j}>
                      {/* <Link
                        href={`/shop/left-sidebar/${item.name}`}
                        as={`/shop/left-sidebar/${item.name}`}
                      > */}
                      <a onClick={() => navigate(col.id, col.name, item.id, item.name)}>{item.name} ({item.itemsCount})</a>
                      {/* </Link> */}
                    </li>
                  )
                })}
                {col && !col.fabrics && col.seasons.map((item, z) => {
                  return (
                    <li key={z}>
                      <a onClick={() => navigateSeason(item.id, item.name)}>{item.name} ({item.itemsCount})</a>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
        <li className="position-relative">
          <Link href="/other/about" as={"/other/about"}>
            <a>About</a>
          </Link>
          <IoIosArrowDown />
          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link
                href="/other/about"
                as={"/other/about"}
              >
                <a>About Us</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/terms"
                as={"/other/terms"}
              >
                <a>Terms and conditions</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/privacy"
                as={"/other/privacy"}
              >
                <a>Privacy policy</a>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                as={"/"}
              >
                <a>Shipping</a>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                as={"/"}
              >
                <a>Returns</a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
