import React, { useEffect, useState } from "react";
import { Card, Select, Spin } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getRevenueSeries } from "../../Service/StatsService";

const { Option } = Select;

const RevenueChart = () => {
    const [loading, setLoading] = useState(true);
    const [revenueSeries, setRevenueSeries] = useState([]);
    const [rangeOption, setRangeOption] = useState("7days"); // mặc định 7 ngày

    // Hàm lấy ngày dựa theo option
    const getFromToByOption = (option) => {
        const today = new Date();
        let from, to;

        if (option === "7days") {
            to = today.toISOString().split("T")[0];
            const past = new Date();
            past.setDate(today.getDate() - 7);
            from = past.toISOString().split("T")[0];
        } else if (option === "month") {
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            from = firstDay.toISOString().split("T")[0];
            to = lastDay.toISOString().split("T")[0];
        } else if (option === "total") {
            from = "2000-01-01"; // hoặc ngày đầu tiên có dữ liệu
            to = today.toISOString().split("T")[0];
        }

        return { from, to };
    };

    const fetchRevenue = async (option) => {
        setLoading(true);
        try {
            const { from, to } = getFromToByOption(option);
            const resRevenue = await getRevenueSeries(from, to);
            const revenueData = Array.isArray(resRevenue) ? resRevenue : [];
            setRevenueSeries(revenueData);
        } catch (err) {
            console.error("Error fetching revenue:", err);
        } finally {
            setLoading(false);
        }
    };

    // Lần đầu load mặc định 7 ngày
    useEffect(() => {
        fetchRevenue(rangeOption);
    }, [rangeOption]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: 50 }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Card
            title="Doanh thu theo thời gian"
            extra={
                <Select value={rangeOption} onChange={(value) => setRangeOption(value)} style={{ width: 150 }}>
                    <Option value="7days">7 ngày gần nhất</Option>
                    <Option value="month">Tháng hiện tại</Option>
                    <Option value="total">Tổng</Option>
                </Select>
            }
            style={{ marginTop: 20 }}
        >
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueSeries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Doanh thu" />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default RevenueChart;
