import { StyleProps } from "./SearchField.jss";

export interface SearchFieldProps extends StyleProps {
    id: string;
    label:string;
    searchValue: string;
    handleSearch: (event:any) => void;
}