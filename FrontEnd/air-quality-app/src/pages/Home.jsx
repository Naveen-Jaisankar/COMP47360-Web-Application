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
            minHeight: "400px", // Adjust as needed
        }}>
        <Container sx={{
            margin: "2rem",
            bgcolor: "blue",
            }}>
          <Typography variant="h1" component="h1" sx={{ fontSize: "4rem" }}>
            Introduction to Fair
          </Typography>
          <Typography variant="p" component="a">
            3-4 lines about our app 
          </Typography>
        </Container>
        </div>
      </section>

      {/* Info-card Section */}
      <section>
        <Container>
          <Typography variant="h2" component="h2">
            Air Pollution & You
          </Typography>
          <Typography component="p">
            What does the science say about air pollution?
          </Typography>

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
