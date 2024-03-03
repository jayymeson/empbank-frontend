import {
  IconWrapper,
  LogoWrapper,
  LowerGroup,
  NavigationGroup,
  SidebarContainer,
} from "./sidebar-styled";
import Logo from "../../atoms/logo/logo";
import ChartPieIcon from "../../../assets/ChartPie.svg";
import ClipboardTextIcon from "../../../assets/ClipboardText.svg";
import MoneyIcon from "../../../assets/Money.svg";
import SearchIcon from "../../../assets/Search.svg";
import StorefrontIcon from "../../../assets/Storefront.svg";
import SunIcon from "../../../assets/Sun.svg";
import ToolboxIcon from "../../../assets/Toolbox.svg";
import UserCircleIcon from "../../../assets/UserCircle.svg";
import WalletIcon from "../../../assets/Wallet.svg";

export function Sidebar() {
  return (
    <SidebarContainer>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <NavigationGroup>
        <IconWrapper>
          <img src={ChartPieIcon} alt="Dashboard" />
        </IconWrapper>
        <IconWrapper>
          <img src={WalletIcon} alt="Wallet" />
        </IconWrapper>
        <IconWrapper>
          <img src={ToolboxIcon} alt="Tools" />
        </IconWrapper>
        <IconWrapper>
          <img src={StorefrontIcon} alt="Products" />
        </IconWrapper>
        <IconWrapper>
          <img src={ClipboardTextIcon} alt="Orders" />
        </IconWrapper>
        <IconWrapper>
          <img src={MoneyIcon} alt="Transactions" />
        </IconWrapper>
      </NavigationGroup>

      <LowerGroup>
        <IconWrapper>
          <img src={UserCircleIcon} alt="User Profile" />
        </IconWrapper>
        <IconWrapper>
          <img src={SunIcon} alt="Settings" />
        </IconWrapper>
        <IconWrapper>
          <img src={SearchIcon} alt="Search" />
        </IconWrapper>
      </LowerGroup>
    </SidebarContainer>
  );
}

export default Sidebar;
