import { Box, Container } from "@mui/system"
import { Typography } from "@mui/material"
import MainContent from "../components/maincontent"

export default function Privacy () {
    return (
        <>
        <Box sx={{
            backgroundColor: "#f7f7f2",
            minHeight: "100vh",
            minWidth: "100vw"
        }}>
        <MainContent sx={{
                backgroundColor: "#f7f7f2"}} >
            <Container sx={{
                padding: 0,
                backgroundColor: "#f7f7f2"
            }}>
                {/* Header section */}
                <Box sx= {{
                    marginBottom: "3rem",
                }}>
                <Typography variant="h2" component='h1'>Privacy</Typography>
                <Typography variant='body1' component='p' sx={{
                    fontSize: "2rem",
                }}>
                    Our privacy policy explains how we collect your personal data, how we use your personal data, and how it is stored.
                </Typography>
                </Box>

                {/* Information section */}
                <Box>
                <Typography variant="h3" component='h2' sx={{
                    fontSize: "3rem",
                    fontWeight:  "medium"
                }}>What personal data do you collect from me?</Typography>
                <Typography variant='body1' component='p' sx={{
                    fontSize: "2rem"
                }}>We collect etc.</Typography>

                <Typography variant="h3" component='h2' sx={{
                    fontSize: "3rem",
                    fontWeight: "medium"
                }}>How do you use my personal data?</Typography>
                <Typography variant='body1' component='p' sx={{
                    fontSize: "2rem"
                }}>We collect etc.</Typography>

                <Typography variant="h3" component='h2'sx={{
                    fontSize: "3rem",
                    fontWeight:  "medium"
                }}>How is my personal data stored?</Typography>
                <Typography variant='body1' component='p' sx={{
                    fontSize: "2rem"
                }}>We collect etc.</Typography>
                </Box>
            </Container>
        
        </MainContent>
        </Box>
        </>
    )
}