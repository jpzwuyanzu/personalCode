import { useEffect, useState } from "react";
import { Col, ColorPicker, Row, Space } from "antd";
import type { Color, ColorPickerProps } from "antd/es/color-picker";
import { switchCusColor } from "./../store/slices/colors.slice";
import { useAppDispatch } from "./../hooks/hooks";
import { setCookieItem, getCookieItem } from "./../utils/common";

const CusColor = () => {
  const dispatch = useAppDispatch();
  const [colorHex, setColorHex] = useState<Color | string>(
    getCookieItem("color") ? getCookieItem("color") : "#00B96B"
  );
  // const [formatHex, setFormatHex] = useState<ColorPickerProps["format"]>("hex");

  const changeColor = (col: any) => {
    setCookieItem("color", col);
    dispatch(switchCusColor(col));
  };
  useEffect(() => {
    if (typeof colorHex === "string") {
      changeColor(colorHex);
    } else {
      changeColor(colorHex.toHexString());
    }
  }, [colorHex]);
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Row align="middle">
        <Space>
          <Col>
            <ColorPicker
              format={'hex'}
              value={colorHex}
              onChange={setColorHex}
              // onFormatChange={setFormatHex}
            />
          </Col>
        </Space>
      </Row>
    </Space>
  );
};

export default CusColor;
