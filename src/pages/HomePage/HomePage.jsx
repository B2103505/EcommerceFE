import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "./Style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from '../../assets/images/slider_1.webp';
import slider2 from '../../assets/images/slider_2.webp';
import slider3 from '../../assets/images/slider_3.jpg';
import CardComponent from "../../components/CardComponent/CardComponent";

const HomePage = () => {
    const arr = ['Cây nội thất', 'Cây bonsai', 'Cây hoa cảnh', 'Cây phong thủy', 'Cây ăn quả mini', 'Chậu cây & Phụ kiện']
    return (
        <>
            <div style={{ padding: '0 120px' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>

            </div >
            <div id="container" style={{ backgroundColor: '#efefef', padding: '0 120px', height: '1000px' }}>
                <SliderComponent arrImgSlider={[slider1, slider2, slider3]} />
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <CardComponent />
                </div>

            </div>
        </>
    )
}

export default HomePage;