import React from "react";
import { Image, PageHeader, Card, Avatar } from "antd";

import { useApi } from "../../hooks/useApi";
import { fetchNews } from "../../services/requests";

const HomePage = () => {
    const [data, isLoading, error] = useApi(fetchNews);

    if (!data) return null;

    const list = data.map((item) => {
        return (
            <Card
                style={{ width: 300 }}
                cover={<Image alt="example" src={item.image} />}
            >
                <Card.Meta
                    avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={item.title}
                    description={item.text}
                />
            </Card>
        );
    });

    return (
        <div>
            <PageHeader className="site-page-header" title="News" />
            {list}
        </div>
    );
    // return <div>Home page</div>;
};

export default HomePage;
