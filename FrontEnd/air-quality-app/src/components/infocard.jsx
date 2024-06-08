
import {Typography, Card, CardContent, CardMedia} from '@mui/material';

const Infocard = ({image, alt, heading, text})=>{
    return (
        <>
        <Card style={{maxWidth:'20rem'}}>
            {image && (
                <CardMedia
                component="img"
                image={image}
                alt={alt}
                style={{ maxWidth: '5rem', }}
                />
            )}
            <CardContent>
                <Typography variant="h4" component="h4">
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

export default Infocard;

