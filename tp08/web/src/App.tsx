import { Header } from './components/Header';
import { CatalogPage } from './pages/CatalogPage';
import {Route, Routes } from 'react-router';
import { NotFoundPage } from './pages/NotFoundPage';
import { ModelPage } from './pages/ModelPage';
import { AboutPage } from './pages/AboutPage';

/**
 * The frame of every page: the header, then the page of the current URL.
 *
 * TODO step 2: the routes. For now, the catalogue, whatever the URL.
 *
 *   /              CatalogPage
 *   /models/:id    ModelPage
 *   anything else  NotFoundPage
 */
const App = () => {
  return (
    <main className="app">
      <Header />
      <Routes>
       <Route path="/" element={<CatalogPage />} />
       <Route path="/models/:id" element={<ModelPage />} />
       <Route path="*" element={<NotFoundPage />} />
       <Route path="/about" element={<AboutPage />} />
      </Routes>
    </main>
  );
};

export default App;
