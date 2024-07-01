import { Container, Typography, Box, Grid, } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Infocard from "../components/infocard";
import ReactPlayer from "react-player"
import constants from './../constant';
import { styled } from "@mui/system";

const image1 = "../src/static/proxy-image.png";
const videoUrl= "https://www.youtube.com/watch?v=FKBVwX8dVhI";

const BannerBox = styled(Box)({
  backgroundColor: "#2E6095",
  display: "flex",
  alignItems: "center",
});

const QuoteBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginLeft: "4rem",
});

const ThickHeadingTypography = styled(Typography)({
  fontFamily: "Roboto flex, Roboto, sans-serif",
  fontSize: "4rem",
  fontWeight: 700,
  color: "white",
})

const GetStartedBox = styled(Box)({
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "2vh",
  border: "2px solid black",
  padding: "1rem",
});

const TranscriptBox = styled(Box)({
  marginTop: "2rem",
  height: "70vh",
  width: "100%",
  backgroundColor: "black",
});

const CreamBackgroundBox = styled(Box)({
  backgroundColor: "#F7F7F2",
  height: "150vh",
});

const SmallerHeadingBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  mb: 4,
})

const InfoCardBox = styled(Box)({
  backgroundColor: "white",
  margin: 2,
  padding: 5,
})

const Home = () => {
  return (
    <>

      {/* Introduction Section */}
      <section>
        <header>
          <BannerBox
            sx={{
              height: { xs: 500, md: 700, lg: 900 },
            }}
          >
            <QuoteBox>
              <ThickHeadingTypography
                variant="h1"
                component="h1"
              >
                {constants.homePage.title1}
              </ThickHeadingTypography>
              <Typography
                variant="h4"
                component="p"
                sx={{
                  color: "white",
                  marginTop: 3,
                }}
              >
                {constants.homePage.title1_subtext}
              </Typography>
            </QuoteBox>
          </BannerBox>
        </header>
      </section>

      <CreamBackgroundBox>
        {/* Tutorial section */}
        <section>
          <Box>
            <Grid
              container
              spacing={1}
              sx={{
                paddingLeft: { xs: "0", md: 10 },
              }}
            >
              <Grid item xs={12} sm={12} md={8}>
                <Box>
                  <GetStartedBox
                    sx={{
                    width: { xs: "95%", md: "85%" },
                    marginTop: { xs: -2, md: -8 },
                    }}
                  >
                    <Typography
                      variant="h3"
                      component="h2"
                      sx={{
                        margin: 2,
                      }}
                    >
                      {constants.homePage.getting_started}
                    </Typography>
                    <ReactPlayer url={videoUrl} width="100%" height="100%" style={{
                      top: 0,
                      left: 0
                    }}/>
                      
                  </GetStartedBox>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box>
                  <TranscriptBox
                    sx={{
                      marginLeft: { xs: 5, s: 4, md: -8 },
                    }}
                  ></TranscriptBox>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </section>

        {/* Info-card Section */}
        <section>
          <InfoCardBox>
            <Container sx={{ marginTop: 4, marginBottom: 4, maxWidth: "lg" }}>
              <SmallerHeadingBox>
                <Typography variant="h2" component="h2">
                  {constants.homePage.air_pollution_heading}
                </Typography>
                <Typography variant="body1" component="p">
                {constants.homePage.air_pollution_heading}
                </Typography>
              </SmallerHeadingBox>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { md: "repeat(3, 1fr)" },
                  gap: 4,
                  margin: { xs: 6 },
                }}
              >
                <Infocard
                  image={image1}
                  alt="Image Alt Text"
                  heading="Funky fact"
                  text={constants.general.more_info}
                />
                <Infocard
                  image={image1}
                  alt="Image Alt Text"
                  heading="Funky fact"
                  text={constants.general.more_info}
                />
                <Infocard
                  image={image1}
                  alt="Image Alt Text"
                  heading="Funky fact"
                  text={constants.general.more_info}
                />
              </Box>
            </Container>
          </InfoCardBox>
        </section>
      </CreamBackgroundBox>
    </>
  );
};

export default Home;
export {ThickHeadingTypography, CreamBackgroundBox}
