"use client";
import React, { FunctionComponent, useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Layout,DatePicker } from "antd";
import HeaderPage from "../common/Header";
import { registeruserdata } from "../redux/actions/authactions";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Registerdetails } from "../interfaces/interface";
import { ApplicationState } from "../redux";
import { useRouter } from "next/navigation";
import { Income } from "../interfaces/interface";
import { Incomeaction } from "../redux/actions/authactions";
import Link from "next/link";
import PrivateRoute from "@/src/components/common/Privateroute";
import MainLayoutPage from "@/src/components/common/MainLayout";
const {Content}=Layout
interface IProps {
    userincomedetails:(data:Income,token:any)=>void
}

const Incomedatadetails: FunctionComponent<IProps> = ({
   userincomedetails
}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (values: any) => {
    /*let registerdata: Registerdetails = {
      email: e.username,
      password: e.password,
    };*/
    //registeruserdetails(registerdata);
    let incomedetails:Income={
        id:values.id,
        email:values.email,
        amount:values.amount,
        date:values.date,
        description:values.description
    }
    let token=localStorage.getItem("accesstoken")
    form.resetFields();
    userincomedetails(incomedetails,token)
  };

  return (
    <>
            <div className="containershow">
        <Content>
        <Form form={form} onFinish={onFinish}>
            <Row>
                <Col md={6} sm={6} xl={6} lg={6}>
      <Form.Item name="amount" label="Enter your income" rules={[{ required: true, message: 'Please input the amount!' }]}>
        <Input prefix="`₹" suffix="INR" />
      </Form.Item>
      </Col>
      </Row>
        <Row>
            <Col md={6} sm={6} xl={6} lg={6}>   
      <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the date!' }]}>
        <DatePicker />
      </Form.Item>
      </Col>
      </Row>
      <Row>
      <Col md={6} sm={6} xl={6} lg={6}>
      <Form.Item name="email" label="Enter your email id" rules={[{ required: true, message: 'Please input the description!' }]}>
        <Input />
        </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={6} xl={6} lg={6}>
      <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
        <Input />
      </Form.Item>
      </Col>
      </Row>
      <Row>
        <Col md={6} sm={6} xl={6} lg={6}>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Col>
      </Row>
    </Form>
        </Content>
        </div>  
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => ({

  incomestate:state.income.isincome,
  errormessages:state.income.errors
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  userincomedetails:(data:Income,token:any)=>dispatch(Incomeaction(data,token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Incomedatadetails);
