import { Image } from "antd";
import React from "react";
import Slider from "react-slick";
import { WrapperSliderStyle } from "./style";

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
        <WrapperSliderStyle {...settings}>
            {arrImgSlider.map((image) => {
                return (
                    <Image key={image} src={image} alt='slider' preview={false} width='100%' height='350px' />
                )
            })}
        </WrapperSliderStyle>
    )
}

export default SliderComponent;