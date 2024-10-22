import React, { useState, useEffect } from 'react';
import './News.css';

function News() {
    const [error, setError] = useState("");
    const [data, setData] = useState([]);
    
    const apiKey = "03e065701faa43308146bc3b978c41fa";
    // const api = `https://newsapi.org/v2/everything?q=tesla&from=2024-09-20&sortBy=publishedAt&language=en&apiKey=${apiKey}`;//for tesla news
    //const api=`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`;
    const api=`https://newsapi.org/v2/everything?q=apple&from=2024-10-21&to=2024-10-21&sortBy=popularity&apiKey=03e065701faa43308146bc3b978c41fa`;
    



    async function fetcher() {
        try {
            const response = await fetch(api);
            if (!response.ok) {
                setError("Something went wrong");
                return;
            }
            const result = await response.json();
            setData(result.articles);
        } catch (err) {
            setError("There is a serious problem");
            console.log(err);
        }
    }

    useEffect(() => {
        fetcher();
    }, []);

    return (
        <div className="news">
            <div className="bura"><h1>Headline News</h1></div>
            {error && <div className="error">{error}</div>}
            {data.map((article) => (
                <div key={article.url} className="card">
                    {article.urlToImage && (
                        <img className="card-image" src={article.urlToImage} alt={article.title} />
                    )}
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <h2 className="card-title">{article.title}</h2>
                    </a>
                    <p className="card-text">{article.description}</p>
                </div>
            ))}
        </div>
    );
}

export default News;
