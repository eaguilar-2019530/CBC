import { EmpleadoPage } from './pages/EmpleadoPage';
import { UbicacionPage } from './pages/UbicacionPage';
import { CategoriaPage } from './pages/CategoriaPage';
import { HerramientaPage } from './pages/HerramientaPage';
import { PrestamoPage } from './pages/PrestamoPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthPage } from './pages/AuthPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SimpleBarChartDouble from './components/SimpleBarChartDouble';
import Navbar from './components/navbar/NavBar.jsx';

function App() {
  const location = useLocation(); 

  return (
    <div>

      {location.pathname !== '/login' && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path='/login' element={<AuthPage />} />
        <Route path='/unauthorized' element={<UnauthorizedPage />} />

        <Route path='/empleado' element={
          <ProtectedRoute>
            <EmpleadoPage />
          </ProtectedRoute>
        } />
        <Route path='/ubicacion' element={
          <ProtectedRoute>
            <UbicacionPage />
          </ProtectedRoute>
        } />
        <Route path='/categoria' element={
          <ProtectedRoute>
            <CategoriaPage />
          </ProtectedRoute>
        } />
        <Route path='/herramienta' element={
          <ProtectedRoute>
            <HerramientaPage />
          </ProtectedRoute>
        } />
        <Route path='/prestamo' element={
          <ProtectedRoute>
            <PrestamoPage />
          </ProtectedRoute>
        } />

        <Route path='/register' element={
          <ProtectedRoute>
            <RegisterPage />
          </ProtectedRoute>
        } />

        <Route path='/homePage' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />

        <Route path='/estadisticas' element={
          <ProtectedRoute>
            <h2>Estadísticas de las Herramientas</h2>
            <SimpleBarChartDouble />
          </ProtectedRoute>
        } />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>

      <Toaster position='bottom-right' reverseOrder={false} />
    </div>
  );
}

export default App;
