import React from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavBar, WrapperProduct } from "./style";

const CategoryPage = ({ children }) => {

    const onChange = () => {

    }

    return (
        <div style={{ padding: '0 120px', background: '#efefef' }}>
            <Row style={{ flexWrap: 'nowrap', paddingTop: '20px' }}>
                <WrapperNavBar span={4}>
                    <NavBarComponent />
                </WrapperNavBar>
                <Col span={20}>
                    <WrapperProduct>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </WrapperProduct>
                    <Pagination showQuickJumper defaultCurrent={2}
                        total={100} onChange={onchange}
                        style={{ justifyContent: 'center', marginTop: '10px' }}
                    />
                </Col>
            </Row>

        </div>
    )
}

export default CategoryPage;