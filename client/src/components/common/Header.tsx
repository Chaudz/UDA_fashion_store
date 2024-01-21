import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "../client/NavLink";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchForm from "../client/SearchForm";
import Cart from "../client/Cart";
import { screenUrl } from "../../constants/screenUrls";
import "./Header.scss";

export type DropDownItem = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  listDropDown: DropDownItem[];
  urlCollections: string;
};

export type Data = Category[];

const data: Data = [
  {
    id: "11",
    name: "Áo khoác",
    urlCollections: "ao-khoac",
    listDropDown: [
      {
        id: "22",
        name: "Áo khoác nỉ",
      },
      {
        id: "23",
        name: "Áo khoác dù",
      },
      {
        id: "24",
        name: "Áo khoác kaki",
      },
      {
        id: "25",
        name: "Áo khoác blazer nam",
      },
    ],
  },
  {
    id: "11",
    name: "Áo Thun",
    urlCollections: "ao-thun",
    listDropDown: [
      {
        id: "22",
        name: "Áo khoác nỉ",
      },
      {
        id: "23",
        name: "Áo khoác dù",
      },
      {
        id: "24",
        name: "Áo khoác kaki",
      },
      {
        id: "25",
        name: "Áo khoác blazer nam",
      },
    ],
  },
  {
    id: "11",
    name: "Sơ mi",
    urlCollections: "so-mi",
    listDropDown: [
      {
        id: "22",
        name: "Áo khoác nỉ",
      },
      {
        id: "23",
        name: "Áo khoác dù",
      },
      {
        id: "24",
        name: "Áo khoác kaki",
      },
      {
        id: "25",
        name: "Áo khoác blazer nam",
      },
    ],
  },
  {
    id: "11",
    name: "Quần dài",
    urlCollections: "quan-dai",
    listDropDown: [
      {
        id: "22",
        name: "Áo khoác nỉ",
      },
      {
        id: "23",
        name: "Áo khoác dù",
      },
      {
        id: "24",
        name: "Áo khoác kaki",
      },
      {
        id: "25",
        name: "Áo khoác blazer nam",
      },
    ],
  },
  {
    id: "11",
    name: "Quần short",
    urlCollections: "quan-short",
    listDropDown: [
      {
        id: "22",
        name: "Áo khoác nỉ",
      },
      {
        id: "23",
        name: "Áo khoác dù",
      },
      {
        id: "24",
        name: "Áo khoác kaki",
      },
      {
        id: "25",
        name: "Áo khoác blazer nam",
      },
    ],
  },
  {
    id: "11",
    name: "Áo khoác",
    urlCollections: "ao-khoac",
    listDropDown: [
      {
        id: "22",
        name: "Áo khoác nỉ",
      },
      {
        id: "23",
        name: "Áo khoác dù",
      },
      {
        id: "24",
        name: "Áo khoác kaki",
      },
      {
        id: "25",
        name: "Áo khoác blazer nam",
      },
    ],
  },
];

const Overlay = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="overlay position-fixed top-0 bottom-0 start-0 end-0"
      onClick={onClick}
    ></div>
  );
};

const Header = (): JSX.Element => {
  const [isSearchFormVisible, setIsSearchFormVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeAll = () => {
    setIsSearchFormVisible(false);
    setIsCartVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`header ${isScrolled ? "active" : ""}`}>
      <div
        className={`d-flex justify-content-between d-lg-flex d-sm-flex justify-content-sm-between  ${
          isScrolled
            ? "flex-lg-row align-items-center"
            : "flex-lg-wrap align-items-center"
        } `}
      >
        <div className={`header-underline ${isScrolled ? "d-none" : ""}`}></div>
        <div
          className={`header-logo d-flex justify-content-lg-center justify-content-sm-start ${
            isScrolled ? "" : "no-scroll"
          }`}
        >
          <Link to="/">
            <img
              src="https://file.hstatic.net/1000096703/file/logo_website__191___70_px__979fdef210f7474d8a09b42724033b5c.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div
          style={isScrolled ? { order: "3" } : {}}
          className={`d-flex gap-3 header-icons justify-content-end ${
            isScrolled ? "" : "no-scroll"
          }`}
        >
          <Link to={screenUrl.LOGIN}>
            <FaUserCircle
              className="d-none d-lg-block"
              fontSize={30}
              cursor={"pointer"}
            />
          </Link>
          <FiSearch
            fontSize={30}
            cursor={"pointer"}
            onClick={() => {
              setIsSearchFormVisible(true);
            }}
          />
          <IoCartOutline
            fontSize={30}
            cursor={"pointer"}
            onClick={() => {
              setIsCartVisible(true);
            }}
          />
          <GiHamburgerMenu
            className="d-lg-none d-sm-block"
            fontSize={30}
            cursor={"pointer"}
          />
        </div>
        <nav
          className={`d-none d-sm-none d-lg-flex justify-content-center gap-2 w-100 ${
            isScrolled ? "mt-0" : ""
          }`}
        >
          {data.map((el, index) => {
            return (
              <NavLink
                key={index}
                id={el.id}
                name={el.name}
                listDropDown={el.listDropDown}
                urlCollections={el.urlCollections}
              />
            );
          })}
        </nav>
      </div>
      {isCartVisible && <Cart onSetIsCartVisible={setIsCartVisible} />}
      {isSearchFormVisible && (
        <SearchForm onSetIsSearchFormVisible={setIsSearchFormVisible} />
      )}
      {isCartVisible && <Overlay onClick={closeAll} />}
      {isSearchFormVisible && <Overlay onClick={closeAll} />}
    </div>
  );
};

export default Header;
