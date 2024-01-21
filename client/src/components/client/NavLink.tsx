import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./styles/NavLink.scss";
import { Category } from "../common/Header";
import { useState } from "react";

const NavLink = (props: Category): JSX.Element => {
  const { name, listDropDown, urlCollections }: Category = props;
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleNameClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  return (
    <li className="navlink position-relative">
      <div className="d-flex align-items-center">
        <Link to={`/collections/${urlCollections}`} onClick={handleNameClick}>
          {name}
        </Link>
        <RiArrowDropDownLine
          onClick={handleNameClick}
          className="btn-dropDown d-flex"
          fontSize={30}
        />
      </div>
      <ul className="dropDown__wrapper position-absolute">
        {listDropDown.map((category, index) => {
          return (
            <Link key={index} to="#">
              {category.name}
            </Link>
          );
        })}
      </ul>
    </li>
  );
};

export default NavLink;
