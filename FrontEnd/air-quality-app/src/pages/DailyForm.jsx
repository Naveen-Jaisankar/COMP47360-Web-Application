import UserContent from "../components/usercontent"
import UserPlaceholder from "../components/userplaceholder"
import { Box, Typography, TextField } from '@mui/material';
import {SearchIcon} from '@mui/icons-material/Search'
import DailySearchbar from "../components/searchbar";


export default function DailyForm () {
    return (
        <>
        <UserPlaceholder />
        <UserContent>
            <Typography>Test!</Typography>
            <Box sx={{
            }}>
            
            <Typography></Typography>
            
            <DailySearchbar></DailySearchbar>

            </Box>
        
        </UserContent>
        </>
    )
}