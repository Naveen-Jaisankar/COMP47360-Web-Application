import { Container, Typography, Box, Grid } from "@mui/material";
import Infocard from "../components/infocard";
import ReactPlayer from "react-player"

const image1 = "../src/static/proxy-image.png";
const videoUrl= "https://www.youtube.com/watch?v=FKBVwX8dVhI"
const Home = () => {
  return (
    <>

      {/* Introduction Section */}
      <section>
        <header>
          <Box
            sx={{
              backgroundColor: "#2E6095",
              height: { xs: 500, md: 700, lg: 900 },
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "4rem",
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontFamily: "Roboto flex, Roboto, sans-serif",
                  fontSize: "4rem",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                &quot; Quote that captures app spirit &quot;
              </Typography>
              <Typography
                variant="h4"
                component="p"
                sx={{
                  color: "white",
                  marginTop: 3,
                }}
              >
                Air quality is the problem of the decade, facing thousands of
                people. Get started with us
              </Typography>
            </Box>
          </Box>
        </header>
      </section>

      <Box
        sx={{
          backgroundColor: "#F7F7F2",
          height: "150vh",
        }}
      >
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
                  <Box
                    sx={{
                      display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "80vh",
                    width: { xs: "100%", md: "90%" },
                    backgroundColor: "white",
                    marginTop: { xs: -2, md: -8 },
                    borderRadius: 5,
                    border: "2px solid black",
                    padding: 2,
                    }}
                  >
                    <Typography
                      variant="h3"
                      component="h2"
                      sx={{
                        margin: 2,
                      
                      }}
                    >
                      How to Get Started
                    </Typography>
                    <ReactPlayer url={videoUrl} width="100%" height="100%" style={{
                      top: 0,
                      left: 0
                    }}/>
                      
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box>
                  <Box
                    sx={{
                      marginLeft: { xs: 4, md: -5 },
                      marginTop: 3,
                      height: "70vh",
                      width: "90%",
                      backgroundColor: "black",
                    }}
                  ></Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </section>

        {/* Info-card Section */}
        <section>
          <Box
            sx={{
              backgroundColor: "white",
              margin: 2,
              padding: 5,
            }}
          >
            <Container sx={{ marginTop: 4, marginBottom: 4, maxWidth: "lg" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  mb: 4,
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
                  gap: 4,
                  margin: { xs: 6 },
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
          </Box>
        </section>
      </Box>
    </>
  );
};

export default Home;
