import { FC } from 'react'
import { Layout, Row } from 'antd'
import { IoEnterOutline } from 'react-icons/io5'
import styles from './Navbar.module.css'
import { IoLogoHackernews } from "react-icons/io5";
import { Link } from 'react-router-dom';
const Navbar: FC = () => {
    return (
        <Layout.Header>
            <Row justify={'space-between'} align={'middle'}>
                <Link to={'/'}>
                    <div className={styles.logoContainer}>
                        <IoLogoHackernews color={'#69b1ff'} /> <span>Hacker News</span>
                    </div>
                </Link>
                <IoEnterOutline color='white' size={20} className={styles.loginIcon} />
            </Row>
        </Layout.Header>
    )

}
export default Navbar