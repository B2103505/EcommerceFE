import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Col, Pagination, Row } from "antd";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { WrapperNavBar, WrapperProduct } from "./style";
import { fetchPlantsByCategory } from '../../Service/PlantService'

const CategoryPage = () => {
    const { id: categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const fetchData = async () => {
        try {
            const res = await fetchPlantsByCategory(categoryId, page, 10);
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

    return (
        <div style={{ padding: '0 120px', background: '#efefef' }}>
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
                                pageSize={10}
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
