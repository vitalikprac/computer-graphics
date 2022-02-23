import { Form, Input } from 'antd';
import { useRef } from 'react';

import { updateLine } from './utils/threeUtils';
import { useLab1 } from './useLab1';
import * as S from './Lab1.styled';

const initialValues = {
  a: 5,
  b: 3,
  c: 12,
};

const Lab1 = () => {
  const sceneRef = useRef(null);
  const [form] = Form.useForm();

  const { point, line, calculate } = useLab1({
    sceneRef,
    lineFunction: initialValues,
  });

  const handleValuesChange = (_, data) => {
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

        <div>Пряма в просторі за неявним визначенням </div>
        <div>Ax+By+C=0</div>

        <div>Дистанція до точки: {point.distance?.toFixed(2)}</div>

        <S.Form
          labelAlign="left"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 20 }}
          initialValues={initialValues}
          form={form}
          layout="horizontal"
          onValuesChange={handleValuesChange}
        >
          <Form.Item name="a" label="A">
            <Input type="number" placeholder="A" />
          </Form.Item>
          <Form.Item name="b" label="B">
            <Input type="number" placeholder="A" />
          </Form.Item>
          <Form.Item name="c" label="C">
            <Input type="number" placeholder="A" />
          </Form.Item>
        </S.Form>
      </div>
      <S.Scene ref={sceneRef} />
    </S.Wrapper>
  );
};

export default Lab1;
