import { StyleProps } from "./Layout.jss";

export interface MenuDrawerProps extends StyleProps {
    open: boolean;
    anchor: "bottom" | "left" | "right" | "top" | undefined;
    onClose: () => void;
    handleMenuItemClick: () => void;
}
export interface MenuDrawerListItemProps extends StyleProps {
    to: string;
    text: string;
    handleMenuItemClick: any;
}
