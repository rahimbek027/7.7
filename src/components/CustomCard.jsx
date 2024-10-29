import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IMG_URL } from '../hooks/useEnv';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function CustomCard({ item }) {
  const navigate = useNavigate();
  const [changeImg, setChangeImg] = React.useState(false);

  function handleImgMouseEnter() {
    setChangeImg(true);
  }

  function handleImgMouseLeave() {
    setChangeImg(false);
  }

  return (
    <Card 
      className="cursor-pointer" 
      sx={{ 
        maxWidth: 345, 
        boxShadow: 3, 
        borderRadius: 2, 
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        }
      }}
    >
      <div 
        onClick={() => navigate(`/movie/${item.id}`)} 
        className="w-full h-[300px] relative"
      >
        <CardMedia 
          onMouseEnter={handleImgMouseEnter} 
          onMouseLeave={handleImgMouseLeave} 
          className={`absolute duration-300  w-full ${changeImg ? "left-[-100%]" : "left-0"}`} 
          component="img" 
          alt={item.original_title} 
          sx={{ height: 300, objectFit: 'cover' }} 
          image={`${IMG_URL}${item.poster_path}`}
        />
        <CardMedia 
          onMouseEnter={handleImgMouseEnter} 
          onMouseLeave={handleImgMouseLeave} 
          className={`absolute duration-300  w-full ${changeImg ? "right-0" : "right-[-100%]"}`} 
          component="img" 
          alt={item.original_title} 
          sx={{ height: 300, objectFit: 'cover' }} 
          image={`${IMG_URL}${item.backdrop_path}`}
        />
      </div>
      <CardContent sx={{ padding: 2 }}>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="div" 
          sx={{ 
            fontWeight: 'bold', 
            fontSize: '1.25rem', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap' 
          }}
        >
          {item.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            lineHeight: 1.6, 
            marginBottom: 1.5, 
            display: '-webkit-box', 
            WebkitLineClamp: 3, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden' 
          }}
        >
          {item.overview}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 'medium', 
            color: 'primary.main' 
          }}
        >
          Release Date: {item.release_date}
        </Typography>
      </CardContent>
      <CardActions 
        sx={{ 
          padding: 1.5, 
          justifyContent: 'space-between', 
          backgroundColor: '#f5f5f5' 
        }}
      >
<Button
  size="large"
  sx={{
    color: 'red',
    '&:hover': {
      backgroundColor: 'rgba(63, 81, 181, 0.1)',
    },
  }}
>
  <FavoriteBorderIcon />
</Button>
<Button
  size="large"
  sx={{
    color: 'blue',
    '&:hover': {
      backgroundColor: 'rgba(245, 0, 87, 0.1)',
    },
  }}
>
  <SaveAltIcon />
</Button>
<Button
  onClick={() => navigate(`/movie/${item.id}`)}
  size="large"
  sx={{
    color: 'info.main',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  }}
>
  <MoreHorizIcon />
</Button>

      </CardActions>
    </Card>
  );
}
