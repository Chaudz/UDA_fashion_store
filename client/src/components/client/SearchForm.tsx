import { IoCloseSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import "./styles/SearchForm.scss";

type Props = {
  onSetIsSearchFormVisible: (value: boolean) => void;
};

const SearchForm = (props: Props): JSX.Element => {
  const { onSetIsSearchFormVisible } = props;
  return (
    <div className="search-form position-fixed end-0 top-0 bottom-0">
      <h1 className="title text-uppercase">Tìm kiếm</h1>
      <div className="d-flex">
        <input type="text" placeholder="Tìm kiếm sản phẩm" />
        <button className="btn btn-search">
          <FiSearch fontSize={30} />
        </button>
      </div>
      <div>Đang phát triển....</div>
      <IoCloseSharp
        className="position-absolute icon-close"
        fontSize={30}
        cursor="pointer"
        onClick={() => {
          onSetIsSearchFormVisible(false);
        }}
      />
    </div>
  );
};

export default SearchForm;
