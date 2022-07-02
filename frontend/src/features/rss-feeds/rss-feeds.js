/**
 * RSS Feed Component - Allows url to be added and based on button click renders multiple articles using article component
 */

import React, { useState } from "react";
import { Article } from "./article";
import { getArticlesForRssFeed } from "./rss-feeds-service";

export function RssFeeds() {
  const [rssUrl, setRssUrl] = useState();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState();
  const fetchArticlesForTheFeed = async () => {
    try {
      setError();
      setArticles([]);
      setArticles(await getArticlesForRssFeed(rssUrl));
    } catch (e) {
      setError(e);
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <h1>RSS Feeds</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <form className="form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter RSS URL"
                  onInput={(event) => setRssUrl(event.target.value)}
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block  mt-4 w-100"
                  type="button"
                  value="Search"
                  onClick={fetchArticlesForTheFeed}
                  disabled={!rssUrl}
                >
                  Search
                </button>
              </div>
            </form>
            <hr />
          </div>
        </div>
        {articles.length > 0 && (
          <div className="row">
            <div className="col-xl-12 ">
              <h1>Articles</h1>
              {articles.map((article, index) => (
                <Article
                  key={index}
                  title={article.title}
                  link={article.link}
                  description={article.description}
                />
              ))}
            </div>
          </div>
        )}
        {error && <div>Error Occured - {error}</div>}
      </div>
    </React.Fragment>
  );
}
