import {Container, Typography} from "@mui/material";
import {Helmet} from 'react-helmet';

const Home = () =>{
    return(
       <>
       <Helmet>

       </Helmet>

       {/* Introduction Section */}
       <section>
       <Container className="hero-component">
        <Typography variant="h1" component='h1' sx={{fontSize: '4rem'}}>Introduction to Fair</Typography>
        <Typography variant="p" component='a'>3-4 lines about our app</Typography>
       </Container>
       </section>
    
        {/* Info-card Section */}
       <section></section>

       {/* Tutorial section */}
       <section></section>


       </>
    )
}

export default Home;