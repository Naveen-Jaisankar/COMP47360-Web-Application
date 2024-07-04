import  {drawerWidth} from "./userplaceholder";
import { styled } from "@mui/system";

// pushes content from the imagined user dashboard on the left
const UserContent = styled('div') (() => ({
    background: "#ffffff",
    paddingLeft: `calc(${drawerWidth}px + 1rem)`,
}))

export default UserContent;
