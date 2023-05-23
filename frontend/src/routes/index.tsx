import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AuthLayout, DashboardLayout } from '~/layouts';
import { Overview, ProductActivities, ProductCreate, ProductDetail, Products, Profile } from '~/modules/Dashboards';
import { DiaryCreator } from '~/modules/Dashboards/ProductDiaries';
import { Home, NotFound, SignIn, SignUp, ProductLookup } from '~/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'lookup',
    children: [
      {
        path: ':id',
        element: <ProductLookup />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={'overview'} />,
      },
      {
        path: 'overview',
        element: <Overview />,
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: 'create',
            element: <ProductCreate />,
          },
          {
            path: 'edit',
            element: <ProductDetail />,
          },
          {
            path: 'diaries',
            children: [
              {
                index: true,
                element: <ProductActivities />,
              },
              {
                path: 'create',
                element: <DiaryCreator />,
              },
            ],
          },
        ],
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
