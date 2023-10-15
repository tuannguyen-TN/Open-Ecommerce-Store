import Slider from 'react-slick'
import { CardMedia } from '@mui/material'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface Props {
  images: string[]
}

const ImageCarousel = ({ images }: Props) => {
  const settings = {
    arrows: true,
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: string) => (
      <ul
        style={{
          marginBottom: 4,
          height: '14%',
        }}
      >
        {dots}
      </ul>
    ),
  }

  return (
    <Slider {...settings}>
      {images.map((item: string, index: number) => (
        <CardMedia
          key={index}
          component="div"
          sx={{
            // 16:9
            pt: '56.25%',
          }}
          image={item}
        />
      ))}
    </Slider>
  )
}

export default ImageCarousel
