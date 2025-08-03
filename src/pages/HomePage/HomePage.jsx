import React, { useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { CategoryItemStyled, WrapperBtnMore, WrapperProduct, WrapperTypeProduct } from "./Style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from '../../assets/images/slider_1.webp';
import slider2 from '../../assets/images/slider_2.webp';
import slider3 from '../../assets/images/slider_3.jpg';
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import { useQuery } from "@tanstack/react-query";
import * as PlantService from '../../Service/PlantService'
import { getAllCategory } from '../../Service/CategoryService';
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [allPlants, setAllPlants] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchAllCategories = async () => {
        const res = await getAllCategory();
        if (res?.status === 'OK') {
            return res.data;
        }
        return [];
    }

    const fetchPlants = async (page) => {
        const res = await PlantService.getAllPlant(page, 8);
        if (res?.data?.length === 0 || res?.data?.length < 8) {
            setHasMore(false); // Hết dữ liệu
        }
        setAllPlants(prev => [...prev, ...res.data]);
    };

    const { data: categories } = useQuery({
        queryKey: ['Categories'],
        queryFn: fetchAllCategories
    });

    React.useEffect(() => {
        fetchPlants({ page, limit: 8 });
        ;
    }, [page]);

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <>
            <div style={{ padding: '0 120px' }}>
                <WrapperTypeProduct>
                    {categories?.map((item) => (
                        <CategoryItemStyled
                            key={item._id}
                            onClick={() => navigate(`/cate/${item._id}`)}
                        >
                            {item.Category_Name}
                        </CategoryItemStyled>
                    ))}
                </WrapperTypeProduct>

            </div >
            <div id="container" style={{ backgroundColor: '#efefef', padding: '0 120px', height: '100%' }}>
                <SliderComponent arrImgSlider={[slider1, slider2, slider3]} />
                <WrapperProduct>
                    {allPlants?.map((plant, index) => (
                        <CardComponent
                            key={plant._id}
                            data={plant}
                        />
                    ))}
                </WrapperProduct>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <WrapperBtnMore textBtn="Xem thêm" type="outline"
                        onClick={handleLoadMore}
                        styleBtn={{
                            border: '1px solid rgb(11,116,229)', color: 'rgb(11,116,229)',
                            width: '240px', height: '38px', borderRadius: '4px'
                        }}
                        styleTextBtn={{ fontWeight: 500 }} />
                </div>
            </div>
            <div style={{ height: '50px' }}>

            </div>
        </>
    )
}

export default HomePage;