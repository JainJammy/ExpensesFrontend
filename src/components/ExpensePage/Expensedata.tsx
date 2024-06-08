"use client"
import React from "react";
import { FunctionComponent } from "react";
import {Row,Col,Layout} from "antd"
import { Form, Input, Button, DatePicker } from "antd";
import { Expense } from '../interfaces/interface'; // import the interface
import {connect} from "react-redux"
import { ApplicationState } from "../redux";
import { expenseaction } from "../redux/actions/authactions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction ,Dispatch} from "redux";
const {Content}=Layout
interface IProps{
  expensedetailsdata:(user:Expense,token:any)=>void
}
const Expensepagedata:FunctionComponent<IProps>=(
  {expensedetailsdata})=>{
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log("Expenses:", values);
        form.resetFields();
        let expensedetails:Expense={
            id:values.id,
            amount:values.amount,
            date:values.date,
            description:values.description,
            email:values.email         
        }
        let token=localStorage.getItem("accesstoken")
        expensedetailsdata(expensedetails,token)

        }        
    
    return(
        <>
        <div className="containershow">
        <Content>
        <Form form={form} onFinish={onFinish}>
            <Row>
                <Col md={6} sm={6} xl={6} lg={6}>
      <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
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
    )
}
const mapStateToProps = (state: ApplicationState) => ({
  expenstate:state.expense.isexpenseadded,
  errors:state.expense.errors
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  expensedetailsdata: (user:Expense,token:any) => dispatch(expenseaction(user,token)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Expensepagedata)