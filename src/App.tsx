import React, { FC } from 'react';
import './App.css';
import AppRoutes from './components/AppRoutes';
import { Outlet } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout';


const App: FC = () => {
  return (
    <AppLayout>
      <AppRoutes />
      <Outlet />
    </AppLayout>
  )
}

export default App;
