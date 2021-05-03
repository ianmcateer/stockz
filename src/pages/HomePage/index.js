import React from "react";
import { Spin } from "antd";

import { useApi } from "../../hooks/useApi";
import { fetchNews } from "../../services/requests";
import styles from "./styles.module.scss";

const HomePage = () => {
    const [data, isLoading] = useApi(fetchNews);

    const list =
        data &&
        data.map((item) => {
            return (
                <a href={item.url} target="blank" key={item.title}>
                    <div className={styles.imageContainer}>
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className={styles.articleContent}>
                        <h4>{item.title}</h4>
                        <h5>{item.publishedDate}</h5>
                        <p>{item.text}</p>
                    </div>
                </a>
            );
        });

    return (
        <div className={styles.HomePage}>
            <h1 className={styles.header}>News</h1>
            {isLoading && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "300px",
                    }}
                >
                    <Spin size="large" />
                </div>
            )}
            <div className={styles.articles}>{list}</div>
        </div>
    );
};

export default HomePage;
