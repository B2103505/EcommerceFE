import React from "react";
import { Col, Image, InputNumber, Row } from "antd";
import ImageProduct from '../../assets/images/Trauba.jpg'
import ImageProductSmall from '../../assets/images/traubasmall.jpg'
import { WrapperAddress, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQuantityProduct, WrapperStyleNameProduct, WrapperStyleTextSell } from "./style";
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const DetailProductComponent = ({ children }) => {
    const click = () => {

    }

    return (
        <Row style={{ padding: '16px', background: '#fff' }}>
            <Col span={10} style={{
                marginRight: '10px',
                position: 'sticky',
                top: '20px',
                alignSelf: 'flex-start',
                borderRight: '1px solid #e5e5e5',
                paddingRight: '10px'
            }}>
                <Image src={ImageProduct} alt="image-product" />
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <Col span={5}>
                        <Image src={ImageProductSmall} alt="image-product-small" width={100} height={100} />
                    </Col>
                    <Col span={5}>
                        <Image src={ImageProductSmall} alt="image-product-small" width={100} height={100} />
                    </Col>
                    <Col span={5}>
                        <Image src={ImageProductSmall} alt="image-product-small" width={100} height={100} />
                    </Col>
                    <Col span={5}>
                        <Image src={ImageProductSmall} alt="image-product-small" width={100} height={100} />
                    </Col>
                </Row>
            </Col>
            <Col span={13}>
                <WrapperStyleNameProduct>Cây trầu bà dáng cao</WrapperStyleNameProduct>
                <div>
                    <span style={{ marginRight: '15px' }}>
                        <span>5.0 </span>
                        <StarFilled style={{ fontSize: '14px', color: 'rgb(253, 216, 54)' }} />
                    </span>
                    <span>|</span>
                    <WrapperStyleTextSell style={{ marginLeft: '15px' }}>Đã bán 542</WrapperStyleTextSell>
                </div>

                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>245.000đ</WrapperPriceTextProduct>
                </WrapperPriceProduct>

                <WrapperAddress>
                    <span>Giao đến </span>
                    <span className="address">Ninh Kiều, Cần Thơ</span>
                    <span className="change-address"> - Đổi địa chỉ</span>
                </WrapperAddress>

                <div style={{
                    margin: '10px', padding: '10px',
                    borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc'
                }}>
                    <div style={{ marginBottom: '10px' }}>Số lượng</div>
                    <WrapperQuantityProduct>
                        <button style={{ border: 'none', background: 'transparent' }}>
                            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>

                        <WrapperInputNumber min={1} max={10} defaultValue={1} onChange={onchange} size="small" />

                        <button style={{ border: 'none', background: 'transparent' }} onClick={click}>
                            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                    </WrapperQuantityProduct>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
                    <ButtonComponent
                        bordered={false}
                        size={40}
                        styleBtn={{
                            background: 'rgb(61, 110, 53)',
                            height: '48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                        textBtn={'Đặt hàng'}
                        styleTextBtn={{ color: '#fff' }}>
                    </ButtonComponent>

                    <ButtonComponent
                        bordered={false}
                        size={40}
                        styleBtn={{
                            background: '#fff',
                            height: '48px',
                            width: '220px',
                            border: '1px solid rgb(13, 92, 182)',
                            borderRadius: '4px'
                        }}
                        textBtn={'Thêm vào giỏ hàng'}
                        styleTextBtn={{ color: 'blue' }}>
                    </ButtonComponent>
                </div>

                <div>
                    Hồng môn có tên ghép bởi 2 chữ Hồng và Môn. Trong tiếng Trung, Hồng là từ chỉ màu đỏ – màu của may mắn và hạnh phúc. Từ Môn có nghĩa là cánh cửa – thứ rất quan trọng trong văn hóa xưa. Vì vậy cây Hồng môn có nghĩa là cánh cửa đỏ mở ra tương lai may mắn, hạnh phúc cho con người.

                    Hồng Môn tượng trưng cho tình cảm yêu đương và sự hiếu mến khách vì thế mà thường được đặt ở các quầy lễ tân, trang trí phòng khách.

                    Cây hồng môn có tác dụng thanh lọc không khí khá tốt. Không chỉ hấp thụ khí CO2 và cung cấp khí O2, cây còn hấp thụ được cả những chất độc bay hơi trong không khí như benzen, xylen,…

                    Mệnh phù hợp: mệnh Hỏa, Thổ

                    Cách chăm sóc:
                    - Tưới nước: 1-2 tuần tưới nước một lần. Để cho đất gần khô mới tưới. Tưới nhiều hơn khi ở môi trường thoáng khi và nhiều ánh sáng, tưới ít hơn khi ở trong môi trường ít ánh sáng và không khí lưu thông. Thỉnh thoảng xịt ẩm cho lá cây.
                    - Ánh sáng: Phát triển tốt trong môi trường ánh sáng gián tiếp mạnh. Có thể chịu được môi trường ánh sáng gián tiếp trung bình trong một thời gian. Tránh ánh nắng gắt chiếu trực tiếp vào buổi trưa và chiều
                    - Mỗi tuần nên đưa cây ra ngoài 1 lần khoảng 2 tiếng buổi sáng, trước 10h

                    Tất cả sản phẩm cây Lá Concept đều bao gồm Cây, đất trồng, chậu.
                    Hồng môn có tên ghép bởi 2 chữ Hồng và Môn. Trong tiếng Trung, Hồng là từ chỉ màu đỏ – màu của may mắn và hạnh phúc. Từ Môn có nghĩa là cánh cửa – thứ rất quan trọng trong văn hóa xưa. Vì vậy cây Hồng môn có nghĩa là cánh cửa đỏ mở ra tương lai may mắn, hạnh phúc cho con người.

                    Hồng Môn tượng trưng cho tình cảm yêu đương và sự hiếu mến khách vì thế mà thường được đặt ở các quầy lễ tân, trang trí phòng khách.

                    Cây hồng môn có tác dụng thanh lọc không khí khá tốt. Không chỉ hấp thụ khí CO2 và cung cấp khí O2, cây còn hấp thụ được cả những chất độc bay hơi trong không khí như benzen, xylen,…

                    Mệnh phù hợp: mệnh Hỏa, Thổ

                    Cách chăm sóc:
                    - Tưới nước: 1-2 tuần tưới nước một lần. Để cho đất gần khô mới tưới. Tưới nhiều hơn khi ở môi trường thoáng khi và nhiều ánh sáng, tưới ít hơn khi ở trong môi trường ít ánh sáng và không khí lưu thông. Thỉnh thoảng xịt ẩm cho lá cây.
                    - Ánh sáng: Phát triển tốt trong môi trường ánh sáng gián tiếp mạnh. Có thể chịu được môi trường ánh sáng gián tiếp trung bình trong một thời gian. Tránh ánh nắng gắt chiếu trực tiếp vào buổi trưa và chiều
                    - Mỗi tuần nên đưa cây ra ngoài 1 lần khoảng 2 tiếng buổi sáng, trước 10h

                    Tất cả sản phẩm cây Lá Concept đều bao gồm Cây, đất trồng, chậu.
                    Hồng môn có tên ghép bởi 2 chữ Hồng và Môn. Trong tiếng Trung, Hồng là từ chỉ màu đỏ – màu của may mắn và hạnh phúc. Từ Môn có nghĩa là cánh cửa – thứ rất quan trọng trong văn hóa xưa. Vì vậy cây Hồng môn có nghĩa là cánh cửa đỏ mở ra tương lai may mắn, hạnh phúc cho con người.

                    Hồng Môn tượng trưng cho tình cảm yêu đương và sự hiếu mến khách vì thế mà thường được đặt ở các quầy lễ tân, trang trí phòng khách.

                    Cây hồng môn có tác dụng thanh lọc không khí khá tốt. Không chỉ hấp thụ khí CO2 và cung cấp khí O2, cây còn hấp thụ được cả những chất độc bay hơi trong không khí như benzen, xylen,…

                    Mệnh phù hợp: mệnh Hỏa, Thổ

                    Cách chăm sóc:
                    - Tưới nước: 1-2 tuần tưới nước một lần. Để cho đất gần khô mới tưới. Tưới nhiều hơn khi ở môi trường thoáng khi và nhiều ánh sáng, tưới ít hơn khi ở trong môi trường ít ánh sáng và không khí lưu thông. Thỉnh thoảng xịt ẩm cho lá cây.
                    - Ánh sáng: Phát triển tốt trong môi trường ánh sáng gián tiếp mạnh. Có thể chịu được môi trường ánh sáng gián tiếp trung bình trong một thời gian. Tránh ánh nắng gắt chiếu trực tiếp vào buổi trưa và chiều
                    - Mỗi tuần nên đưa cây ra ngoài 1 lần khoảng 2 tiếng buổi sáng, trước 10h

                    Tất cả sản phẩm cây Lá Concept đều bao gồm Cây, đất trồng, chậu.
                </div>

            </Col>
        </Row>
    )
}

export default DetailProductComponent;