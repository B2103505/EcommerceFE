import {
    AppstoreOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useState } from "react";
import AdminUserComponent from '../../components/AdminUserComponent/AdminUserComponent';
import AdminPlantComponent from '../../components/AdminPlantComponent/AdminPlantComponent';

const renderPage = (key) => {
    switch (key) {
        case 'user': return (<AdminUserComponent />)
        case 'plant': return (<AdminPlantComponent />)
        default: return (<></>)
    }
}



const items = [
    { key: '1', icon: <PieChartOutlined />, label: 'Tổng quan' },
    {
        key: 'user',
        label: 'Quản lý người dùng',
        icon: <UserOutlined />
    },
    {
        key: 'plant',
        label: 'Quản lý sản phẩm',
        icon: <AppstoreOutlined />,
    },
];

const AdminPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [keySelected, setKeySelected] = useState('1');

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleOnClick = ({ key }) => {
        setKeySelected(key); // ✅ cập nhật state
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <div style={{ width: collapsed ? 80 : 256, background: '#001529', padding: 10 }}>
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    style={{ marginBottom: 16 }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
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
                    {keySelected === '1' && <p>📊 Đây là Dashboard tổng quan</p>}
                    {renderPage(keySelected)}
                </div>
            </div>
        </div >
    );
};

export default AdminPage;
