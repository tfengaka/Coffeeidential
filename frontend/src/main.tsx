import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from '~/redux';
import router from '~/routes';

import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </PersistGate>
  </ReduxProvider>
);
