import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailProductComponent from "../../components/DetailProductComponent/DetailProductComponent";
import { Spin } from "antd";
import { getDetailPlant } from '../../Service/PlantService'

const DetailProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const data = await getDetailPlant(id);
            setProduct(data?.data);
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết cây:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProduct();
    }, [id]);

    return (
        <div style={{ padding: '0 120px', background: '#efefef', minHeight: '100vh' }}>
            {loading ? <Spin size="large" /> : product && <DetailProductComponent data={product} />}
        </div>
    );
};

export default DetailProductPage;
