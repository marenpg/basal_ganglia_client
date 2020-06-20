import { StyleProps } from "./Header.jss";

export interface SimpleHeaderProps {
  classes: any & { simpleHeader: any };
  title: string;
  subtitle: string;
}

export interface StyledSimpleHeaderProps extends StyleProps {
  classes: any & { simpleHeader: any };
  title: string;
  subtitle: string;
}

export interface HeaderProps {
  // classes: any & { headerContainer: any; pageHeader: any };
  headerContainerClass: any;
  pageHeaderClass: any;
  title: string;
  subtitle: string;
  topTitle?: string;
  titleSize?:
    | "inherit"
    | "button"
    | "overline"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "srOnly";
}
