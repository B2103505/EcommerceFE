import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";
import axios from "axios";

const GhnAddressCom = ({ onSelect, initialValue = {} }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    const token = process.env.REACT_APP_GHN_TOKEN;

    // Load province list
    useEffect(() => {
        axios.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/province", {
            headers: { token },
        }).then(res => {
            setProvinces(res.data.data);
        });
    }, []);

    // Nếu có initialValue thì set tự động
    useEffect(() => {
        const { Province_Id, Province_Name, District_Id, District_Name, WardCode, WardName } = initialValue || {};

        if (Province_Id && Province_Name) {
            setSelectedProvince({ Province_Id, Province_Name });

            // Gọi API để lấy quận/huyện
            axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${Province_Id}`, {
                headers: { token },
            }).then(res => {
                setDistricts(res.data.data);

                if (District_Id && District_Name) {
                    setSelectedDistrict({ District_Id, District_Name });

                    // Gọi API để lấy phường/xã
                    axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${District_Id}`, {
                        headers: { token },
                    }).then(res => {
                        setWards(res.data.data);

                        if (WardCode && WardName) {
                            const ward = { WardCode, WardName };
                            setSelectedWard(ward);

                            // Trả dữ liệu về
                            if (onSelect) {
                                onSelect({
                                    Province_Id,
                                    Province_Name,
                                    District_Id,
                                    District_Name,
                                    WardCode,
                                    WardName
                                });
                            }
                        }
                    });
                }
            });
        }
    }, [initialValue]);

    const handleProvinceChange = (value) => {
        const [Province_Id, Province_Name] = value.split("|");
        setSelectedProvince({ Province_Id, Province_Name });
        setDistricts([]);
        setWards([]);
        setSelectedDistrict(null);
        setSelectedWard(null);

        axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${Province_Id}`, {
            headers: { token },
        }).then(res => {
            setDistricts(res.data.data);
        });
    };

    const handleDistrictChange = (value) => {
        const [District_Id, District_Name] = value.split("|");
        setSelectedDistrict({ District_Id, District_Name });
        setWards([]);
        setSelectedWard(null);

        axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${District_Id}`, {
            headers: { token },
        }).then(res => {
            setWards(res.data.data);
        });
    };

    const handleWardChange = (value) => {
        const [WardCode, WardName] = value.split("|");
        const ward = { WardCode, WardName };
        setSelectedWard(ward);

        if (onSelect && selectedProvince && selectedDistrict && ward) {
            onSelect({
                ...selectedProvince,
                ...selectedDistrict,
                ...ward,
            });
        }
    };

    return (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Select
                placeholder="Chọn tỉnh/thành"
                style={{ width: 200 }}
                onChange={handleProvinceChange}
                value={selectedProvince ? `${selectedProvince.Province_Id}|${selectedProvince.Province_Name}` : undefined}
                options={provinces.map(p => ({
                    label: p.ProvinceName,
                    value: `${p.ProvinceID}|${p.ProvinceName}`
                }))}
            />
            <Select
                placeholder="Chọn quận/huyện"
                style={{ width: 200 }}
                disabled={!districts.length}
                onChange={handleDistrictChange}
                value={selectedDistrict ? `${selectedDistrict.District_Id}|${selectedDistrict.District_Name}` : undefined}
                options={districts.map(d => ({
                    label: d.DistrictName,
                    value: `${d.DistrictID}|${d.DistrictName}`
                }))}
            />
            <Select
                placeholder="Chọn phường/xã"
                style={{ width: 200 }}
                disabled={!wards.length}
                onChange={handleWardChange}
                value={selectedWard ? `${selectedWard.WardCode}|${selectedWard.WardName}` : undefined}
                options={wards.map(w => ({
                    label: w.WardName,
                    value: `${w.WardCode}|${w.WardName}`
                }))}
            />
        </div>
    );
};

export default GhnAddressCom;
