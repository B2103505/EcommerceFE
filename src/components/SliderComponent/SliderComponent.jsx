import { Image } from "antd";
import React from "react";
import Slider from "react-slick";

const SliderComponent = ({ arrImgSlider }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    };

    return (
        <Slider {...settings}>
            {arrImgSlider.map((image) => {
                return (
                    <Image src={image} alt='slider' preview={false} width='100%' height='350px' />
                )
            })}
        </Slider>
    )
}

export default SliderComponent;