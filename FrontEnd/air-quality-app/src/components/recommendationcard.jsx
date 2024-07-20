import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const RecommendationCard = ({ image, title, description }) => {
  return (
    <Card className="w-full md:w-1/3">
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

RecommendationCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default RecommendationCard;