
import { style } from "./Header.jss";
import { Header as HeaderComp } from "./Header";
import { SimpleHeader as SimpleHeaderComp } from "./SimpleHeader";

export const Header = HeaderComp;
export const SimpleHeader = SimpleHeaderComp;
export const StyledSimpleHeader = style(SimpleHeaderComp);