import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { CategoryItemStyled, WrapperBtnMore, WrapperProduct, WrapperTypeProduct } from "./Style";
import FooterComponent from "../../components/FooterCom/FooterCom";

import slider1 from '../../assets/images/slider_1.webp';
import slider2 from '../../assets/images/slider_2.webp';
import slider3 from '../../assets/images/slider_3.jpg';

import * as PlantService from '../../Service/PlantService';
import { getAllCategory } from '../../Service/CategoryService';
import { getTopPlantDetail } from '../../Service/StatsService';

const HomePage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [allPlants, setAllPlants] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [topPlants, setTopPlants] = useState([]);

    // Lấy danh mục
    const fetchAllCategories = async () => {
        const res = await getAllCategory();
        return res?.status === 'OK' ? res.data : [];
    };

    // Lấy sản phẩm
    const fetchPlants = async (page) => {
        const res = await PlantService.getAllPlant({ page, limit: 8 });
        if (!res?.data?.length || res.data.length < 8) setHasMore(false);

        setAllPlants(prev => {
            const newData = res.data.filter(p => !prev.some(old => old._id === p._id));
            return [...prev, ...newData];
        });
    };

    // Lấy top sản phẩm
    useEffect(() => {
        const fetchData = async () => {
            await fetchPlants(page);

            try {
                const resTopPlants = await getTopPlantDetail();
                setTopPlants(Array.isArray(resTopPlants) ? resTopPlants : []);
            } catch (err) {
                console.error("Error fetching top plants:", err);
            }
        };
        fetchData();
    }, [page]);

    const { data: categories } = useQuery({
        queryKey: ['Categories'],
        queryFn: fetchAllCategories
    });

    const handleLoadMore = () => setPage(prev => prev + 1);

    return (
        <>
            <div style={{
                maxWidth: 1200,
                margin: '0 auto',
                padding: '0 10px',  // padding nhỏ hơn cho mobile
            }}>
                <WrapperTypeProduct>
                    {categories?.map(item => (
                        <CategoryItemStyled
                            key={item._id}
                            onClick={() => navigate(`/cate/${item._id}`)}
                        >
                            {item.Category_Name}
                        </CategoryItemStyled>
                    ))}
                </WrapperTypeProduct>
            </div>

            <div style={{
                backgroundColor: '#f9f9f9', maxWidth: 1200,
                margin: '0 auto', padding: '0 10px', minHeight: '100%'
            }}>
                <SliderComponent arrImgSlider={[slider1, slider2, slider3]} />

                {topPlants.length > 0 && (
                    <section style={{ marginTop: 40, padding: 20, borderRadius: 8, backgroundColor: '#f0f8ff' }}>
                        <h2>Top sản phẩm bán chạy</h2>
                        <WrapperProduct>
                            {topPlants.map((plant, idx) => (
                                <CardComponent key={`${plant._id}-${idx}`} data={plant} />
                            ))}
                        </WrapperProduct>
                    </section>
                )}

                <section style={{ marginTop: 30, padding: 20, borderRadius: 8, backgroundColor: '#f0f8ff' }}>
                    <h2>Danh sách sản phẩm</h2>
                    <WrapperProduct>
                        {allPlants.map((plant, idx) => (
                            <CardComponent key={`${plant._id}-${idx}`} data={plant} />
                        ))}
                    </WrapperProduct>
                </section>

                {hasMore && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <WrapperBtnMore
                            textBtn="Xem thêm"
                            type="outline"
                            onClick={handleLoadMore}
                            styleBtn={{
                                border: '1px solid #0b74e5',
                                color: '#0b74e5',
                                width: 240,
                                height: 38,
                                borderRadius: 6,
                                fontWeight: 500
                            }}
                        />
                    </div>
                )}
            </div >
            <FooterComponent />
        </>
    );
};

export default HomePage;
