import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import SidebarLayout from './layouts/SidebarLayout';
import { AnimatePresence } from 'framer-motion';
import { appRoutes } from './routes';
import { Suspense } from 'react';
import SpinnerEmpty from './components/SpinnerEmpty';
import { ThemeProvider } from './components/theme-provider';

const App = () => {
  const location = useLocation();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarLayout>
        <Suspense fallback={<SpinnerEmpty />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {appRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.component />} />
              ))}
            </Routes>
          </AnimatePresence>
        </Suspense>
      </SidebarLayout>
    </ThemeProvider>
  )
}

export default App;