import  {drawerWidth} from "./userplaceholder";
import { styled } from "@mui/system";


const UserContent = styled('div') (({theme}) => ({
    background: "#ffffff",
    paddingLeft: `calc(${drawerWidth}px + 1rem)`,
}))

export default UserContent;
