import { Container, Typography, Box, Grid } from "@mui/material";
import Infocard from "../components/infocard";
import ReactPlayer from "react-player";
import constants from "./../constant";
import { styled } from "@mui/system";
import Footer from "../components/footer";

const image1 = "../src/static/proxy-image.png";
const image2 = "../src/static/face-mask2.png";
const image3 = "../src/static/heart.png";
const bannerImage = "../src/static/newyorktest8.jpg"
const videoUrl = "https://www.youtube.com/watch?v=FKBVwX8dVhI";

const BannerBox = styled(Box)({
  backgroundColor: "#2E6095",
  display: "flex",
  alignItems: "center",
  paddingBottom: "2rem",
  position: "relative", 
  backgroundImage: `url(${bannerImage})`,
  backgroundSize: "cover",
  // background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)), url(${bannerImage})`,

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
  borderColor: "black",
});

const GetStartedBox = styled(Box)({
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "2vh",
  border: "2px solid black",
  padding: "2rem",
  position: "relative",
  zIndex: 10, 
});

const CreamBackgroundBox = styled(Box)({
  backgroundColor: "#F7F7F2",
  height: "180vh",
  paddingBottom: "2rem"
});

const SmallerHeadingBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  mb: 4,
});

const InfoCardBox = styled(Box)({
  backgroundColor: "white",
  marginTop: "2rem",
  padding: 5,
});

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
              <ThickHeadingTypography variant="h1" component="h1">
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
        <Container
          sx={{
            maxWidth: { xs: "100%", md: "90%", lg: "70%" },
            marginTop: { xs: -2, md: -8 },
          }}
        >
          <GetStartedBox>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                margin: 2,
              }}
            >
              {constants.homePage.getting_started}
            </Typography>
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              style={{
                top: 0,
                left: 0,
              }}
            />
          </GetStartedBox>
        </Container>

        {/* Info-card Section */}
        <section>
          <InfoCardBox
          sx={{
            border: "1px",
            backgroundColor: "#F7F7F2"
          }}>
            <Container
              maxWidth={false}
              sx={{
                marginTop: 4,
                marginBottom: 4,
                width: { xs: "100%", md: "90%", lg: "80%" },
                backgroundColor: "#F7F7F2"
              }}
            >
              <SmallerHeadingBox
              sx={{
                backgroundColor: "#F7F7F2"
              }}>
                <Typography variant="h2" component="h2" sx={{
                  fontWeight: 'medium',
                  fontSize: '4rem'
                }}>
                  {constants.homePage.air_pollution_heading}
                </Typography>
                <Typography variant="body1" component="p" sx={{
                  fontSize: '2rem'
                }}>
                  {constants.homePage.air_pollution_body}
                </Typography>
              </SmallerHeadingBox>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { md: "repeat(3, 1fr)" },
                  gap: 4,
                  margin: { xs: 6 },
                  marginBottom: 2,
                  backgroundColor: "#F7F7F2"
                }}
              >
                <Infocard
                  image={image1}
                  alt="An icon of lungs with branching leaves inside the lungs"
                  heading="Life Expectancy"
                  text={constants.homePage.more_info1}
                  style={{
                    maxWidth: "11rem",
                    margin: "auto",
                    paddingTop: "1rem",
                  }}
                />
                <Infocard
                  image={image2}
                  alt="A mask icon"
                  heading="Everyday Protection"
                  text={constants.homePage.more_info2}
                  style={{
                    maxWidth: "14rem",
                    margin: "auto",
                    paddingTop: "1rem",
                  }}
                />
                <Infocard
                  image={image3}
                  alt="A heart icon"
                  heading="Exposure"
                  text={constants.homePage.more_info3}
                  style={{
                    maxWidth: "10rem",
                    margin: "auto",
                    paddingTop: "1rem",
                  }}
                />
              </Box>
            </Container>
          </InfoCardBox>
        </section>
      <Container>
    
      <Footer/>
      </Container>

    </>
  );
};

export default Home;
export { ThickHeadingTypography, CreamBackgroundBox };
