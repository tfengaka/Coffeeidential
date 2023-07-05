import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from '~/redux';
import router from '~/routes';

import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import { Loading } from './components';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReduxProvider store={store}>
    <PersistGate
      loading={
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      }
      persistor={persistor}
    >
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={false}
        theme="colored"
      />
    </PersistGate>
  </ReduxProvider>
);
