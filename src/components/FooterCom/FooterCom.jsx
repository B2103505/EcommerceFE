import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterComponent = () => {
    return (
        <Footer style={{ textAlign: "center", backgroundColor: "#f0f2f5", padding: "10px 30px" }}>
            <p>© 2025 IndoorPlant Plants. All rights reserved.</p>
            <p>
                Contact: info@indoorplant.com | Hotline: 0123 456 789
            </p>
            <p>
                Follow us:
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 8px" }}>Facebook</a>|
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 8px" }}>Instagram</a>|
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 8px" }}>Twitter</a>
            </p>
        </Footer>
    );
};

export default FooterComponent;
