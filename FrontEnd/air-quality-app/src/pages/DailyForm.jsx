import UserContent from "../components/usercontent"
import UserPlaceholder from "../components/userplaceholder"
import { Box, Typography, TextField } from '@mui/material';
import {SearchIcon} from '@mui/icons-material/Search'

export default function DailyForm () {
    return (
        <>
        <UserPlaceholder />
        <UserContent>
            <Typography>Test!</Typography>
            <Box sx={{
                backgroundColor: "black",
            }}>
            <Typography>Test!</Typography>
            </Box>
        
        </UserContent>
        </>
    )
}