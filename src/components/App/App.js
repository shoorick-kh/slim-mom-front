import { Routes, Route } from "react-router-dom";
import { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { PrivateRoute } from '../../redux/routes/PrivateRoute';
import { PublicRoute } from '../../redux/routes/RestrictedRoute';
import { Layout } from "components/Layout";
import { useAuth } from '../../hooks/hooks';
import { refreshUser } from "redux/auth/authOperations";

const MainPage = lazy(() => import('../../pages/MainPage'));
const DairyPage = lazy(() => import('../../pages/DairyPage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

 

  return  isRefreshing ? (
    <b>Refreshing user...</b>
    ) : (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<MainPage />} />
        <Route path="/registration" element={
          <PublicRoute redirectTo="/diary" component={<RegisterPage />} />
        }
        />
        <Route path="/singin" element={
          <PublicRoute redirectTo="/diary" component={<LoginPage />} />
        }
        />
        <Route path="/dairy" element={
          <PrivateRoute redirectTo="/login" component={<DairyPage />} />
        }
        />
      </Route>
    </Routes>
  );
};

export default App;