import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Table, Spin } from "antd";
import {
    getSummary,
    getRevenueSeries,
    getOrderStatus,
    getPaymentMethods,
    getTopPlants,
    getLowStock
} from "../../Service/StatsService";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell, ResponsiveContainer,
    Bar,
    BarChart
} from "recharts";
import RevenueChart from "../RevenueChartCom/RevenueChartCom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#E91E63"];

const AdminDashboardComponent = () => {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalPlants: 0,
        totalSold: 0
    });
    const [revenueSeries, setRevenueSeries] = useState([]);
    const [orderStatus, setOrderStatus] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [topPlants, setTopPlants] = useState([]);
    const [lowStock, setLowStock] = useState([]);
    const getDefaultFromTo = () => {
        const today = new Date();
        const to = today.toISOString().split("T")[0]; // yyyy-mm-dd
        const past = new Date();
        past.setDate(today.getDate() - 7);
        const from = past.toISOString().split("T")[0];
        return { from, to };
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Tổng quan
                const resSummary = await getSummary();
                setSummary({
                    totalRevenue: resSummary.totalRevenue || 0,
                    totalOrders: resSummary.totalOrders || 0,
                    totalUsers: resSummary.totalUsers || 0,
                    totalPlants: resSummary.totalPlants || 0,
                    totalSold: resSummary.totalSold || 0
                });

                // 2. Doanh thu theo thời gian
                const { from, to } = getDefaultFromTo();
                const resRevenue = await getRevenueSeries(from, to);
                const revenueData = Array.isArray(resRevenue?.data) ? resRevenue.data : [];
                setRevenueSeries(revenueData);
                console.log('resRevenue', resRevenue);

                // 3. Trạng thái đơn hàng
                const resOrderStatus = await getOrderStatus();
                const orderStatusRaw = Array.isArray(resOrderStatus) ? resOrderStatus : [];
                const mappedOrderStatus = orderStatusRaw.map(item => ({
                    name: item.statusName,
                    value: Number(item.count)
                }));
                setOrderStatus(mappedOrderStatus);


                // 4. Phương thức thanh toán
                const resPayment = await getPaymentMethods();
                const paymentRaw = Array.isArray(resPayment) ? resPayment : [];
                const mappedPayment = paymentRaw.map(item => ({
                    name: item.methodName,
                    value: Number(item.count)
                }));
                setPaymentMethods(mappedPayment);

                // 5. Top sản phẩm bán chạy
                const resTopPlants = await getTopPlants();
                const topPlantsData = Array.isArray(resTopPlants) ? resTopPlants : [];
                setTopPlants(topPlantsData.map((item, idx) => ({ ...item, key: idx })));

                // 6. Sản phẩm sắp hết hàng
                const resLowStock = await getLowStock();
                const lowStockData = Array.isArray(resLowStock) ? resLowStock : [];
                setLowStock(lowStockData.map((item, idx) => ({ ...item, key: idx })));

            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: 50 }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: 20 }}>
            {/* 1. Tổng quan */}
            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <Statistic title="Tổng doanh thu" value={summary.totalRevenue} suffix="₫" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Tổng đơn hàng" value={summary.totalOrders} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Khách hàng" value={summary.totalUsers} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Sản phẩm" value={summary.totalPlants} />
                    </Card>
                </Col>
            </Row>

            {/* 2. Doanh thu theo thời gian */}
            {/* {revenueSeries.length > 0 && (
                <Card title="Doanh thu theo thời gian" style={{ marginTop: 20 }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueSeries} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Doanh thu" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            )} */}
            <RevenueChart />

            {/* 3. Trạng thái đơn hàng */}
            {orderStatus.length > 0 && (
                <Card title="Phân bổ trạng thái đơn hàng" style={{ marginTop: 20, marginBottom: 30, height: 350 }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={orderStatus}      // <-- state đã map: {name, value}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {orderStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            )}

            {/* 4. Phương thức thanh toán */}
            {paymentMethods.length > 0 && (
                <Card title="Phương thức thanh toán" style={{ marginTop: 20, marginBottom: 30, height: 350 }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={paymentMethods}    // <-- state đã map: {name, value}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {paymentMethods.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            )}


            {/* 5. Top sản phẩm bán chạy */}
            {topPlants.length > 0 && (
                <Card title="Top sản phẩm bán chạy" style={{ marginTop: 20 }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topPlants} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Plant_Name" />
                            <YAxis yAxisId="left" /> {/* trục Y trái cho totalSold */}
                            <YAxis yAxisId="right" orientation="right" /> {/* trục Y phải cho totalRevenue */}
                            <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
                            <Legend />
                            <Bar yAxisId="left" dataKey="totalSold" fill="#8884d8" name="Số lượng bán" />
                            <Bar yAxisId="right" dataKey="totalRevenue" fill="#82ca9d" name="Doanh thu" />
                        </BarChart>
                    </ResponsiveContainer>

                </Card>
            )}

            {/* 6. Sản phẩm sắp hết hàng */}
            {lowStock.length > 0 && (
                <Card title="Sản phẩm sắp hết hàng" style={{ marginTop: 20 }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            layout="vertical"
                            data={lowStock}
                            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="Plant_Name" />
                            <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
                            <Bar dataKey="Plant_Quantity" fill="#FF8042" name="Tồn kho" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            )}
        </div>
    );
};

export default AdminDashboardComponent;
