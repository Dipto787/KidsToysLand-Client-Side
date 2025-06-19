import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './Route/Routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './Pages/Authentication/AuthProvider'
import { Toaster } from 'react-hot-toast'
let queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Routes}></RouterProvider>
        <Toaster></Toaster>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
