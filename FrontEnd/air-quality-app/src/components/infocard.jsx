
import {Typography, Card, CardContent, CardMedia} from '@mui/material';
import PropTypes from 'prop-types';

const Infocard = ({image, alt, heading, text})=>{
    return (
        <>
        <Card style={{maxWidth:'30rem', textAlign: 'center'}}>
            {image && (
                <CardMedia
                component="img"
                image={image}
                alt={alt}
                style={{ maxWidth: '10rem', margin: "auto", paddingTop: "1rem"}}
                />
            )}
            <CardContent>
                <Typography variant="h3" component="h3">
                    {heading} 
                </Typography>
                <Typography variant="body2" component="p">
                    {text}
                </Typography>
            </CardContent>
        </Card>
        
        </>
        )
}

Infocard.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string,
    heading: PropTypes.string,
    text: PropTypes.string,
}

export default Infocard;

