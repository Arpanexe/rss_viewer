/**
 * App Component 
 */
import "./App.css";
import { RssFeeds } from "./features/rss-feeds/rss-feeds";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <RssFeeds />
    </div>
  );
}

export default App;
