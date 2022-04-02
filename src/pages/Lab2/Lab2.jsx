import { Form, Input } from 'antd';
import { useRef, useState } from 'react';

import { updateLine } from './utils/threeUtils';
import { useLab2 } from './useLab2';
import * as S from './Lab2.styled';

const initialValues = {
  a: 5,
  b: 3,
  c: 12,
};

const Lab2 = () => {
  const sceneRef = useRef(null);
  const [form] = Form.useForm();
  const [values, setValues] = useState([]);

  const { point, line, calculate } = useLab2({
    sceneRef,
    lineFunction: initialValues,
  });

  const handleValuesChange = (_, data) => {
    setValues(data);
    line.geometry.attributes.position.needsUpdate = true;
    const newLineFunction = {
      a: parseFloat(data.a),
      b: parseFloat(data.b),
      c: parseFloat(data.c),
    };
    updateLine({
      line,
      lineFunction: newLineFunction,
    });
    initialValues.a = newLineFunction.a;
    initialValues.b = newLineFunction.b;
    initialValues.c = newLineFunction.c;

    calculate(
      {
        object: {
          position: {
            ...point,
          },
        },
      },
      newLineFunction,
    );
  };

  return (
    <S.Wrapper>
      <div>
        <div>Точка: </div>
        <div>X: {point?.x?.toFixed(2)}</div>
        <div>Y: {point?.y?.toFixed(2)}</div>
        <div>Z: {point?.z?.toFixed(2)}</div>

        <div>
          Площина в просторі в раціональному
          <br /> векторно-параметричному вигляді.
        </div>

        <S.Form
          labelAlign="left"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 20 }}
          initialValues={initialValues}
          form={form}
          layout="horizontal"
          onValuesChange={handleValuesChange}
        >
          <Form.Item name="a" label="nx">
            <Input type="number" placeholder="A" />
          </Form.Item>
          <Form.Item name="b" label="ny">
            <Input type="number" placeholder="A" />
          </Form.Item>
          <Form.Item name="c" label="nz">
            <Input type="number" placeholder="A" />
          </Form.Item>
          <Form.Item name="r1" label="rx">
            <Input type="number" placeholder="A" />
          </Form.Item>
          <Form.Item name="r2" label="ry">
            <Input type="number" placeholder="A" />
          </Form.Item>
          <Form.Item name="r3" label="rz">
            <Input type="number" placeholder="A" />
          </Form.Item>
        </S.Form>
        <div>Дистанція до точки: 5{point.distance?.toFixed(2)}</div>
      </div>
      <S.Scene ref={sceneRef} />
    </S.Wrapper>
  );
};

export default Lab2;
