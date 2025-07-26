import React, { useEffect, useState } from "react";
import { Input, Select, Button, Pagination, Row, Col, Card, Typography, Tag } from "antd";
import { getAllPlant } from "../../Service/PlantService";
import { getAllCategory } from "../../Service/CategoryService";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useLocation } from 'react-router-dom';

const { Option } = Select;
const { Title } = Typography;

const SearchPage = () => {
    const [filterKey, setfilterKey] = useState("Plant_Name");
    const [filterValue, setfilterValue] = useState("");
    const [plantList, setPlantList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [pageCurr, setPageCurr] = useState(1);
    const [categories, setCategories] = useState([]);
    const limit = 9;
    const location = useLocation();
    const keyword = location.state?.keyword || '';
    const [products, setProducts] = useState([]);

    const leafShapes = ["Lá kim", "Lá tròn", "Lá dài", "Lá xoăn", "Lá trái tim", "Lá dẻ quạt", "Lá mác", "Lá bầu dục", "Lá hình thoi", "Lá chẻ", "Lá hình chân vịt"];
    const leafColors = ["Xanh đậm", "Xanh nhạt", "Xanh sọc", "Xanh vàng", "Xanh lục", "Xanh ánh bạc", "Xanh tím", "Xanh pha đỏ", "Xanh ánh đồng", "Xanh rêu"];
    const growthForms = ["Thẳng đứng", "Rủ xuống", "Dạng bụi", "Leo", "Tán rộng", "Dạng rosette (hoa thị)", "Thân bò", "Thân đứng", "Tán ô", "Dạng thân thảo"];

    const fetchCategories = async () => {
        const res = await getAllCategory();
        if (res?.status === "OK") setCategories(res.data);
    };

    const fetchPlants = async () => {
        const res = await getAllPlant({
            limit,
            page: pageCurr,
            filterKey,
            filterValue,
        });
        if (res?.status === "OK") {
            setPlantList(res.data);
            setTotalPage(res.totalPage);
        }
    };

    useEffect(() => {
        fetchCategories();

        // Nếu có keyword từ state, thì tự động set và tìm kiếm
        if (keyword) {
            setfilterKey("Plant_Name");
            setfilterValue(keyword);
            setPageCurr(1);
            handleSearch();
            fetchPlants();
        } else {
            fetchPlants();
        }
    }, []);

    useEffect(() => {
        fetchPlants();
    }, [pageCurr]);

    const handleSearch = () => {
        setPageCurr(1);
        fetchPlants();
    };

    return (
        <Card title="Tìm kiếm cây cảnh" style={{ background: "#f9f9f9" }}>
            <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={6}>
                    <Select value={filterKey} onChange={(value) => setfilterKey(value)} style={{ width: "100%" }}>
                        <Option value="Plant_Name">Tên cây</Option>
                        <Option value="Plant_Status">Trạng thái</Option>
                        <Option value="Category_Ids">Danh mục</Option>
                        <Option value="Plant_Scientific_Name">Tên khoa học</Option>
                        <Option value="Plant_Leaf_Shape">Dạng lá</Option>
                        <Option value="Plant_Leaf_Color">Màu sắc lá</Option>
                        <Option value="Plant_Growth_Form">Dáng phát triển</Option>
                        <Option value="Plant_Context">Không gian trưng bày</Option>
                        <Option value="Plant_Light">Ánh sáng</Option>
                    </Select>
                </Col>

                <Col span={12}>
                    {filterKey === "Category_Ids" ? (
                        <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Chọn danh mục"
                            value={filterValue}
                            onChange={(value) => setfilterValue(value)}
                            optionFilterProp="children"
                        >
                            {categories.map((cate) => (
                                <Option key={cate._id} value={cate.Category_Name}>
                                    {cate.Category_Name}
                                </Option>
                            ))}
                        </Select>
                    ) : filterKey === "Plant_Leaf_Shape" ? (
                        <Select value={filterValue} style={{ width: "100%" }} onChange={setfilterValue}>
                            {leafShapes.map(shape => <Option key={shape}>{shape}</Option>)}
                        </Select>
                    ) : filterKey === "Plant_Leaf_Color" ? (
                        <Select value={filterValue} style={{ width: "100%" }} onChange={setfilterValue}>
                            {leafColors.map(color => <Option key={color}>{color}</Option>)}
                        </Select>
                    ) : filterKey === "Plant_Growth_Form" ? (
                        <Select value={filterValue} style={{ width: "100%" }} onChange={setfilterValue}>
                            {growthForms.map(form => <Option key={form}>{form}</Option>)}
                        </Select>
                    ) : (
                        <Input
                            value={filterValue}
                            onChange={(e) => setfilterValue(e.target.value)}
                            placeholder="Nhập từ khóa"
                        />
                    )}
                </Col>

                <Col span={4}>
                    <Button type="primary" onClick={handleSearch} block>
                        Tìm kiếm
                    </Button>
                </Col>
            </Row>

            {/* Render kết quả dạng Card */}
            <Row gutter={[16, 16]}>
                {plantList.map((plant) => (
                    <Col key={plant._id} xs={24} sm={12} md={8} lg={6} xl={4}>
                        <CardComponent data={plant} />
                    </Col>
                ))}
            </Row>

            <Pagination
                style={{ marginTop: 24, textAlign: "center" }}
                current={pageCurr}
                total={totalPage * limit}
                pageSize={limit}
                onChange={(page) => setPageCurr(page)}
            />
        </Card>
    );
};

export default SearchPage;
