import { FC, ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./AppLayout.module.css";
import {Layout,Menu,Breadcrumb} from 'antd'
const { Header, Content, Footer } = Layout;
interface LayoutProps{
    children:ReactNode
}

const AppLayout:FC<LayoutProps>=({children})=>{
    return <Layout >
        <Navbar/>
        <Content className={styles.content}>
          {children}
       </Content>
    </Layout>
}
export default AppLayout