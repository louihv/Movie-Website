import React from 'react';
import { Card, Col, Row } from 'antd';
const { Meta } = Card;
const Cardshow = () => (
  <Row gutter={16}>
     <Col span={8}>
  <Card
    hoverable
    style={{
      width: 240,
      left: '40px',
      borderRadius:'0',
      backgroundColor:'transparent',
      border:'none'
      
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Title" description="Description" />
    
  </Card>
  </Col>
  <Col span={8}>
  <Card
    hoverable
    style={{
      width: 240,
      left: '80px',
      borderRadius:'0',
      color:'white'
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{color:'white'}}/>}
  >
   <Meta title="Title" description="Description" />
    
  </Card>
  </Col>
  </Row>
);
export default Cardshow;