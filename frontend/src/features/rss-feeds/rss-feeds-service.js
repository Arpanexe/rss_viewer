/**
 * Rss Feed Service - Fetches articles for provided rss url
 */

import { RSS2JSON_ENDPOINT } from "../../constants";

export async function getArticlesForRssFeed(rssUrl) {
  let response = await fetch(`${RSS2JSON_ENDPOINT}?rss_url=${rssUrl}`);
  response = await response.json();
  if (!response?.items) {
    throw response.message;
  }
  console.table(response.items, ["link", "title", "description"]);
  return response.items;
}
