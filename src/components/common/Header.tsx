import React from "react"
import {Row,Col} from "antd"
const HeaderPage=()=>{
    return(
        <>
        <div>
          <Row>
               <Col lg={6} md={6} xl={6} sm={6}>
                 <span className="header-text">Expense Application</span>
               </Col>
          </Row>
          </div>
        </>
    )
}
export default HeaderPage