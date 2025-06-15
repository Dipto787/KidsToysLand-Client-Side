import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './Route/Routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
let queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Routes}></RouterProvider>
    </QueryClientProvider>
  </StrictMode>,
)
