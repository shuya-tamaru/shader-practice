import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { Dispatch } from "react";

const lists = ["sphere", "fract", "domain"];

type Props = {
  setToy: Dispatch<React.SetStateAction<number>>;
};
const Interface = ({ setToy }: Props) => {
  const handleValue = (selectValue: number) => {
    setToy(selectValue);
  };
  return (
    <Menu>
      <MenuButton
        position={"absolute"}
        top={10}
        left={5}
        color={"#fff"}
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon boxSize={20} />}
        bg="rgba(0,0,0,0)"
        border="none"
        cursor={"pointer"}
      />
      <MenuList w="200px">
        {lists.map((val, i) => {
          return (
            <MenuItem
              key={i}
              value={i}
              sx={styles}
              _hover={hoverStyles}
              onClick={() => handleValue(i)}
            >
              {val}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default Interface;

const styles = {
  h: "35px",
  textAlign: "center",
  fontSize: "16px",
  border: "none",
};

const hoverStyles = {
  color: "#fff",
  bg: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
};
