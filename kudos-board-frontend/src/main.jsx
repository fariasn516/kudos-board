import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BoardPage from './pages/BoardPage.jsx'
import NotFound from './pages/NotFound.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />
  },
  {
    path: '/board/:id',
    element: <BoardPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  </StrictMode>,
)
