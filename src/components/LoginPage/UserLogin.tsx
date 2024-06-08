"use client";
import React, { FunctionComponent } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import HeaderPage from "../common/Header";
//import { registeruserdata } from "../redux/actions/authactions";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
//import { Registerdetails } from "../interfaces/interface";
import { ApplicationState } from "../redux";
import { LoginUser } from "../interfaces/interface";
import { loginuserdata } from "../redux/actions/authactions";
import Link from "next/link";
interface IProps {
  loginuserdetails:(user:LoginUser)=>void;
  loginstate:boolean,
  errormessages:any
}

const UserLogindetails: FunctionComponent<IProps> = ({
  loginuserdetails,
  loginstate,
  errormessages
}) => {
  const[form]=Form.useForm()
  const onFinish = (e: any) => {
    let loginuserdata: LoginUser = {
      email: e.username,
      password: e.password,
    };
    loginuserdetails(loginuserdata);
    form.resetFields();
    //window.location.reload()
  };

  return (
    <>
      <HeaderPage />
      <div className="container">
        <Form onFinish={onFinish}>
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
                <Link href="login/">login here</Link>
            </Col>
          </Row>
          {loginstate && (
            <Row>
              <Col lg={12} sm={6} md={12} xl={12}>
                <div>
                  <span style={{ color: "green", marginTop: "10px" }}>
                    Login successfully
                  </span>
                </div>
              </Col>
            </Row>
          )}
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
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  loginstate:state.login.isLogin,
  errormessages:state.login.errors

});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  loginuserdetails: (user: LoginUser) =>dispatch(loginuserdata(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogindetails);
