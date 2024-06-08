import React,{FunctionComponent,useState,useEffect} from 'react'
import {Button,Layout,Menu} from 'antd';
import { ShoppingOutlined,BookOutlined,ShoppingCartOutlined,UserOutlined,DatabaseOutlined,WechatOutlined,LogoutOutlined,ShopOutlined} from '@ant-design/icons';
import Link from 'next/link';
import {useRouter} from 'next/navigation'
import SubMenu from 'antd/lib/menu/SubMenu';
import Item from 'antd/lib/list/Item';
import {connect} from 'react-redux'
import { DollarOutlined} from "@ant-design/icons";
import { BarChartOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import path from 'path';
const {Sider}=Layout;
const SideMenu:FunctionComponent=()=>{
    const[collapsed,setCollapsed]=useState(true);
    const [selectedKey, setSelectedKey] = useState('');
    const router=useRouter();
    const path=usePathname();

    const onCollapse=()=>{
        setCollapsed(!collapsed)
    }
      const getDefaultkey=()=>{ 
        let result='';
        if(path.startsWith('/'))
        {
            result=''   
        }
        if(path.startsWith('/expenses'))
        {
            result='expenses'
        }
        if(path.startsWith('/income'))
        {
            result='income'
        }
        if (path.startsWith("/expensesummary")){
            result="expensessummary"
        }
        if(path.startsWith("/incomesummary")){
            result="incomesummary"
        }
        return result

      }
     
    return(
        <>
        <Sider width={260} collapsible collapsed={collapsed} onCollapse={onCollapse} theme='light'>
        <Menu theme="light" mode="inline" defaultSelectedKeys={[getDefaultkey()]}>
            <Menu.Item key="/" icon={<DollarOutlined/>}>
                     <Link href="/">Expenses Page</Link>
            </Menu.Item>
            <Menu.Item key="expenses" icon={<DollarOutlined/>}> 
                <Link href="/expenses">Expenses</Link>
            </Menu.Item>
            <Menu.Item key="income" icon={<BarChartOutlined/>}> 
                <Link href="/income">Income</Link>
            </Menu.Item>
            <Menu.Item key="expensessummary" icon={<ShoppingCartOutlined/>}>
                     <Link href="/expensessummary">Expensessummary</Link>
            </Menu.Item>
            <Menu.Item key="incomesummary" icon={<ShoppingOutlined/>}>
                    <Link href="/incomesummary">IncomeSummary</Link>
            </Menu.Item>
            </Menu>
            </Sider>


    </>
    )
}  
export default SideMenu
