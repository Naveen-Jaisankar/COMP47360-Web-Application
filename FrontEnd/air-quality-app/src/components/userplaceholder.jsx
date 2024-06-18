import {styled} from "@mui/system"
import { Drawer, Typography } from "@mui/material"

const drawerWidth= 220

const Page = styled('div') ({
    background: "#ffffff",
    width: "100%"
});

const StyledDrawer = styled(Drawer)({
    width: drawerWidth,
    zIndex: 1,
  });


function UserPlaceholder () {

    return (
        <>
        <StyledDrawer
        variant = "permanent"
        anchor = "left"
        >
            <div>
                <Typography variant="h5">
                    hello! I'm the user placeholder
                </Typography>
            </div>
        </StyledDrawer>
        </>
    )
}

export default UserPlaceholder;