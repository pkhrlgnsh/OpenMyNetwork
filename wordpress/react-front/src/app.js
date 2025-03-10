import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './components/articlelist';
import SingleArticle from './components/singlearticle';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Latest Articles</h1>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/article/:id" element={<SingleArticle />} />
          </Routes>
        </main>
        
        <footer>
          <p>© 2023 Article Hub</p>
        </footer>
      </div>
    </Router>
  );
}
