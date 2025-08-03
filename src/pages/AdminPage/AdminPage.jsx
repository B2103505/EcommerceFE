import {
    AppstoreOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    UserOutlined,
    ShopOutlined,
    TagsOutlined,
    ShoppingCartOutlined,
    PercentageOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useState } from "react";
import AdminUserComponent from '../../components/AdminUserComponent/AdminUserComponent';
import AdminPlantComponent from '../../components/AdminPlantComponent/AdminPlantComponent';
import AdminCategoryComponent from '../../components/AdminCategoryComponent/AdminCategoryComponent';
import AdminDiscountCom from '../../components/AdminDiscountCom/AdminDiscountCom';
import AdminOrderCom from '../../components/AdminOrderCom/AdminOrderCom';

const renderPage = (key) => {
    switch (key) {
        case 'user': return (<AdminUserComponent />)
        case 'plant': return (<AdminPlantComponent />)
        case 'category': return (<AdminCategoryComponent />)
        case 'discount': return (<AdminDiscountCom />)
        case 'order': return (<AdminOrderCom />)
        default: return (<></>)
    }
}

const items = [
    { key: 'system', icon: <PieChartOutlined />, label: 'Tổng quan' },
    {
        key: 'user',
        label: 'Quản lý người dùng',
        icon: <UserOutlined />
    },
    {
        key: 'plant',
        label: 'Quản lý sản phẩm',
        icon: <ShopOutlined />,
    },
    {
        key: 'category',
        label: 'Quản lý danh mục',
        icon: <TagsOutlined />,
    },
    {
        key: 'discount',
        label: 'Quản lý giảm giá',
        icon: <PercentageOutlined />,
    },
    {
        key: 'order',
        label: 'Quản lý đơn hàng',
        icon: <ShoppingCartOutlined />,
    },
];

const AdminPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [keySelected, setKeySelected] = useState('system');

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleOnClick = ({ key }) => {
        setKeySelected(key);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: collapsed ? 80 : 256, background: '#001529', padding: 10 }}>
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    style={{ marginBottom: 16 }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <Menu
                    defaultSelectedKeys={['system']}
                    defaultOpenKeys={['user']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={handleOnClick}
                />
            </div>

            {/* Nội dung */}
            <div style={{ flex: 1, padding: 20 }}>
                <h2>Nội dung đang chọn: {keySelected}</h2>
                <div>
                    {keySelected === 'system' && <p>📊 Đây là Dashboard tổng quan</p>}
                    {renderPage(keySelected)}
                </div>
            </div>
        </div >
    );
};

export default AdminPage;
