import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './layout';
import { AnimatePresence } from 'framer-motion';
import { appRoutes } from './routes';
import { Suspense } from 'react';
import SpinnerEmpty from './components/SpinnerEmpty';

const App = () => {
  const location = useLocation();

  return (
    <Layout>
      {/* <Navbar /> */}
      <Suspense fallback={<SpinnerEmpty />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {appRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}

export default App;