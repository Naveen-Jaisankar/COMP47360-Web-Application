import { Container, Typography, Box, Grid } from "@mui/material";
import { Helmet } from "react-helmet";
import Infocard from "../components/infocard";


const image1 =
  "../src/static/proxy-image.png";
const banner = "../src/static/01-03_City_map2v_generated.jpg";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>air-quality-app name - Manhattan air tracking application</title>
        <meta
          content="This is the Home page of air-quality-app name, here you can find information about the application, facts about air pollution and how to use the website"
        />
      </Helmet>

      {/* Introduction Section */}
      <section>
        <Box
          sx={{
            // backgroundImage: `url(${banner})`,
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            backgroundColor: '#2E6095',
            height: { xs: 400, md: 600, lg: 800},
            display: "flex",
            alignItems: "center"
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "4rem"
            }}
          >
            <Typography variant="h1" component="h1" 
            sx={{
              fontFamily:'Roboto flex, Roboto, sans-serif',
              fontSize: "4rem",
              fontWeight: 700,
              color: 'white'
              }}>
              "Some cool slogan"
            </Typography>
            <Typography variant="h4" component="p" sx={{
              color: 'white',
              marginTop: 3
            }}>
              Air quality is the problem of the decade, facing thousands of people. Get started with us 
            </Typography>
          </Box>
        </Box>
      </section>

      {/* Tutorial section */}
      <section>
        <Box>
          <Grid container spacing= {2} sx= {{
            marginLeft: 20, 
            marginRight: 20}}>
            <Grid item xs={12} sm={12} md={7}>
              <Box>
              <Typography> 1 </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
            <Box>
              <Typography> 2 </Typography>
            </Box>
            </Grid>
            
          </Grid>
        </Box>

      </section>

      {/* Info-card Section */}
      <section>
        <Container sx={{ marginTop: 4,
          marginBottom: 4,
          maxWidth: 'lg' }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 4
            }}
          >
            <Typography variant="h2" component="h2">
              Air Pollution & You
            </Typography>
            <Typography variant="body1" component="p">
              What does the science say about air pollution?
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "repeat(3, 1fr)" },
              gap: 4
            }}
          >
            <Infocard
              image={image1}
              alt="Image Alt Text"
              heading="Funky fact"
              text="More info"
            />
            <Infocard
              image={image1}
              alt="Image Alt Text"
              heading="Funky fact"
              text="More info"
            />
            <Infocard
              image={image1}
              alt="Image Alt Text"
              heading="Funky fact"
              text="More info"
            />
          </Box>
        </Container>
      </section>

      
    </>
  );
};

export default Home;