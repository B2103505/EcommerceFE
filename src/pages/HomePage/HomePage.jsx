import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperBtnMore, WrapperProduct, WrapperTypeProduct } from "./Style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from '../../assets/images/slider_1.webp';
import slider2 from '../../assets/images/slider_2.webp';
import slider3 from '../../assets/images/slider_3.jpg';
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

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
            <div id="container" style={{ backgroundColor: '#efefef', padding: '0 120px', height: '1500px' }}>
                <SliderComponent arrImgSlider={[slider1, slider2, slider3]} />
                <WrapperProduct>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </WrapperProduct>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <WrapperBtnMore textBtn="Xem thêm" type="outline"
                        styleBtn={{
                            border: '1px solid rgb(11,116,229)', color: 'rgb(11,116,229)',
                            width: '240px', height: '38px', borderRadius: '4px'
                        }}
                        styleTextBtn={{ fontWeight: 500 }} />
                </div>

                <NavBarComponent></NavBarComponent>
            </div>
        </>
    )
}

export default HomePage;