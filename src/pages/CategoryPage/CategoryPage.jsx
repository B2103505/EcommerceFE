import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Pagination, Row } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchPlantsByCategory } from '../../Service/PlantService';
import { getAllCategory } from '../../Service/CategoryService';
import CardComponent from "../../components/CardComponent/CardComponent";
import { WrapperNavBar, WrapperProduct } from "./style";
import { CategoryItemStyled, WrapperTypeProduct } from "../HomePage/Style";

const CategoryPage = () => {
    const { id: categoryId } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const fetchData = async () => {
        try {
            const res = await fetchPlantsByCategory(categoryId, page, 8);
            setProducts(res.data.plants);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [categoryId, page]);

    const handleChangePage = (pageNumber) => {
        setPage(pageNumber);
    };

    const fetchAllCategories = async () => {
        const res = await getAllCategory();
        if (res?.status === 'OK') {
            return res.data;
        }
        return [];
    };

    const { data: categories } = useQuery({
        queryKey: ['Categories'],
        queryFn: fetchAllCategories
    });

    return (
        <div style={{ padding: '0 120px', background: '#efefef' }}>
            {/* --- Danh sách category ở trên cùng --- */}
            <WrapperTypeProduct>
                {categories?.map((item) => (
                    <CategoryItemStyled
                        key={item._id}
                        onClick={() => navigate(`/cate/${item._id}`)}
                        style={{
                            backgroundColor: item._id === categoryId ? '#1890ff' : undefined,
                            color: item._id === categoryId ? '#fff' : undefined,
                        }}
                    >
                        {item.Category_Name}
                    </CategoryItemStyled>
                ))}
            </WrapperTypeProduct>

            <Row style={{ flexWrap: 'nowrap', paddingTop: '20px' }}>
                <Col span={20}>
                    <WrapperProduct>
                        <Row gutter={[16, 16]}>
                            {products.map((product) => (
                                <Col span={6} key={product._id}>
                                    <CardComponent data={product} />
                                </Col>
                            ))}
                        </Row>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Pagination
                                showQuickJumper
                                current={page}
                                total={total}
                                pageSize={8}
                                onChange={handleChangePage}
                            />
                        </div>
                    </WrapperProduct>
                </Col>
            </Row>
        </div>
    );
};

export default CategoryPage;
