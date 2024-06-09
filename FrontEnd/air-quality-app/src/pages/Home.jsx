import { Container, Typography, Box } from "@mui/material";
import { Helmet } from "react-helmet";
import Infocard from "../components/infocard";

const image1 =
"https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fd5%2Fbb%2F51%2Fd5bb51f166808467c89b63aedcc86c41.png&sp=1717854747Tc2dbc12b7ed3ccdd2ece853c9c01241f12f787840bb869b9241379113de8c1a0";
const banner = "../src/static/01-03_City_map2v_generated.jpg"

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          air-quality-app name - Manhattan air tracking application
        </title>
        <meta content="This is the Home page of air-quality-app name, here you can find information about the application, facts about air pollution and how to use the website" />
      </Helmet>

      {/* Introduction Section */}
      <section>
        <div style= {{
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "40vh",
            display: "flex",
            alignItems: "center"
        }}>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "2rem"

            }}>
          <Typography variant="h1" component="h1" sx={{ fontSize: "4rem" }}>
            Introduction to Fair
          </Typography>
          <Typography variant="body1" component="p">
            3-4 lines about our app 
          </Typography>
        </Box>
        </div>
        
      </section>

      {/* Info-card Section */}
      <section>
        <Container>
        <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 4,
              mt: 4
            }}
          >
          
          <Typography variant="h2" component="h2">
            Air Pollution & You
          </Typography>
          <Typography variant="body1" component="p">
            What does the science say about air pollution?
          </Typography>
          </Box>

          <div className="grid md:grid-cols-3 m-4">
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
          </div>
        </Container>
      </section>

      {/* Tutorial section */}
      <section></section>
    </>
  );
};

export default Home;
