import { Avatar, Badge } from "antd";

import {
  AiFillHeart,
  AiFillShopping,
  AiOutlineUser,
} from "react-icons/ai";
import ProductSearch from "../../components/ProductSearch";

const NavBar = () => {
  return (
    <nav className="w-full flex justify-between">
      <div className="w-2/3 flex justify-between py-3 px-5">
        Logo
        <ProductSearch />
      </div>
      <div className="flex items-center justify-evenly md:w-1/2 lg:w-1/4">
        <Badge count={5}>
          <Avatar icon={<AiFillShopping />} size="medium" />
        </Badge>
        <Badge count={5}>
          <Avatar icon={<AiFillHeart />} size="medium" />
        </Badge>
        <Badge count={5}>
          <Avatar icon={<AiOutlineUser />} size="medium" />
        </Badge>
      </div>
    </nav>
  );
};

export default NavBar;
