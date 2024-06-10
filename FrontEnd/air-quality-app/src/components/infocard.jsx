
import {Typography, Card, CardContent, CardMedia} from '@mui/material';

const Infocard = ({image, alt, heading, text})=>{
    return (
        <>
        <Card style={{maxWidth:'100rem', textAlign: 'center'}}>
            {image && (
                <CardMedia
                component="img"
                image={image}
                alt={alt}
                style={{ maxWidth: '50rem', margin: "auto", paddingTop: "1rem"}}
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

export default Infocard;

