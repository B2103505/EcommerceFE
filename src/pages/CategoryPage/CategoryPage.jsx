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
        <div style={{ maxWidth: 1200, margin: '0 auto', background: '#efefef' }}>
            <WrapperTypeProduct>
                {categories?.map(item => (
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

            {/* <WrapperProduct>
                <Row
                    gutter={[16, 16]}
                    justify={products.length < 4 ? "center" : "start"} // center nếu ít
                >
                    {products.length > 0 ? (
                        products.map(product => (
                            <Col
                                key={product._id}
                                xs={24} sm={12} md={12} lg={products.length < 4 ? Math.floor(24 / products.length) : 6}
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <CardComponent data={product} style={{ width: '100%' }} />
                            </Col>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', width: '100%', marginTop: 50 }}>
                            Không có sản phẩm nào trong danh mục này
                        </p>
                    )}
                </Row>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    {total > 8 && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Pagination
                                showQuickJumper
                                current={page}
                                total={total}
                                pageSize={8}
                                onChange={handleChangePage}
                            />
                        </div>
                    )}
                </div>
            </WrapperProduct> */}

            <WrapperProduct>
                <Row
                    gutter={[16, 16]}
                    justify={products.length < 4 ? "center" : "start"}
                >
                    {products.length > 0 ? (
                        products.map(product => (
                            <Col
                                key={product._id}
                                xs={24} sm={12} md={12} lg={products.length < 4 ? Math.floor(24 / products.length) : 6}
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <CardComponent data={product} style={{ width: '100%' }} />
                            </Col>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', width: '100%', marginTop: 50 }}>
                            Không có sản phẩm nào trong danh mục này
                        </p>
                    )}
                </Row>

                {/* Pagination tách riêng, không nằm trong Row */}
                {total > 8 && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', width: '100%' }}>
                        <Pagination
                            showQuickJumper
                            current={page}
                            total={total}
                            pageSize={8}
                            onChange={handleChangePage}
                        />
                    </div>
                )}
            </WrapperProduct>

        </div>

    );
};

export default CategoryPage;
