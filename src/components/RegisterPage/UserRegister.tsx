"use client";
import React, { FunctionComponent, useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import HeaderPage from "../common/Header";
import { registeruserdata } from "../redux/actions/authactions";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Registerdetails } from "../interfaces/interface";
import { ApplicationState } from "../redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PrivateRoute from "@/src/components/common/Privateroute";
import MainLayoutPage from "@/src/components/common/MainLayout";

interface IProps {
  registeruserdetails: (user: Registerdetails) => void;
  signupstate: boolean;
  errormessages: any;
  children:any
}

const UserRegistration: FunctionComponent<IProps> = ({
  registeruserdetails,
  signupstate,
  errormessages,
  children
}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (e: any) => {
    let registerdata: Registerdetails = {
      email: e.username,
      password: e.password,
    };
    registeruserdetails(registerdata);
    form.resetFields();
  };

  return (
    <>
      {signupstate ? (
        <PrivateRoute>
          <MainLayoutPage>
            {children}
          </MainLayoutPage>
        </PrivateRoute>
      ) : (
        <>
          <HeaderPage />
          <div className="container">
            <Form form={form} onFinish={ onFinish}>
              <Row>
                <Col lg={12} sm={6} md={12} xl={12}>
                  <Form.Item label="Username" name="username" className="user">
                    <Input placeholder="User name" required />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={12} sm={6} md={12} xl={12}>
                  <Form.Item label="Password" name="password">
                    <Input.Password placeholder="Password" required />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={12} sm={6} md={12} xl={12}>
                  <Button block type="primary" htmlType="submit">
                    Register Here
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col lg={12} sm={6} md={12} xl={12}>
                  <Link href="/login">login here</Link>
                </Col>
              </Row>
              {errormessages && (
                <Row>
                  <Col lg={12} sm={6} md={12} xl={12}>
                    <div style={{ color: "red", marginTop: "10px" }}>
                      {errormessages}
                    </div>
                  </Col>
                </Row>
              )}
            </Form>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  signupstate: state.auth.isAuthenticated,
  errormessages: state.auth.errors,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  registeruserdetails: (user: Registerdetails) => dispatch(registeruserdata(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
