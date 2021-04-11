import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
    HomeOutlined,
    StockOutlined,
    FileSearchOutlined,
} from "@ant-design/icons";

import "./index.css";
import Stocks from "../Stocks";

const { Sider, Content } = Layout;

function App() {
    const [sidebarCollapsed, setSidebarCollapse] = useState(false);

    return (
        <Router>
            <Layout style={{ minHeight: "100%" }}>
                <Sider
                    collapsible
                    collapsed={sidebarCollapsed}
                    onCollapse={setSidebarCollapse}
                >
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={["1"]}
                        mode="inline"
                        selectable
                    >
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<StockOutlined />}>
                            <Link to="/stocks">Stocks</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<FileSearchOutlined />}>
                            <Link to="/screener">Screener</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content>
                        <Switch>
                            <Route path="/stocks" component={Stocks} />
                            {/* <Route path="/screener" component={Screener} /> */}
                            <Route path="/"></Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}

export default App;

/* 


*/
