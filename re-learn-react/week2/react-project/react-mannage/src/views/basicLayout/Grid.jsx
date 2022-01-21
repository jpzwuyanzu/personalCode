import React from 'react';
import { Divider, Row, Col } from 'antd'

const grid = () => {
    return (
        <div>
            <h1>栅格布局Grid</h1>
            <Divider/>
            <Row>
                <Col style={{ height:'50px', backgroundColor: '#0092FF' }} span={ 24 }>col</Col>
            </Row>
            <br/>
            <Row>
                <Col style={{ height:'50px', backgroundColor: '#0092FFBF' }} span={ 12 }>col</Col>
                <Col style={{ height:'50px', backgroundColor: '#0092FF' }} span={ 12 }>col</Col>

            </Row>
            <br/>
            <Row>
                <Col style={{ height:'50px', backgroundColor: '#0092FFBF' }} span={ 8 }>col</Col>
                <Col style={{ height:'50px', backgroundColor: '#0092FF' }} span={ 8 }>col</Col>
                <Col style={{ height:'50px', backgroundColor: '#0092FFBF' }} span={ 8 }>col</Col>
            </Row>
            <br/>
            <Row>
                <Col style={{ height:'50px', backgroundColor: '#0092FF' }} span={ 6 }>col</Col>
                <Col style={{ height:'50px', backgroundColor: '#0092FFBF' }} span={ 6 }>col</Col>
                <Col style={{ height:'50px', backgroundColor: '#0092FF' }} span={ 6 }>col</Col>
                <Col style={{ height:'50px', backgroundColor: '#0092FFBF' }} span={ 6 }>col</Col>
            </Row>
        </div>
    );
}

export default grid;
