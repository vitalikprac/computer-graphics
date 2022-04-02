import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Header from '../components/molecules/Header';

import { PAGES } from './paths';

const RoutesList = () => (
  <Router>
    <Header />
    <Routes>
      {PAGES.map(({ id, path, element }) => (
        <Route key={id} path={path} element={element} />
      ))}

      <Route path="*" element={<Navigate to={PAGES[1].path} replace />} />
    </Routes>
  </Router>
);

export default RoutesList;
