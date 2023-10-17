import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import FancyLoader from 'components/loader';
import store from 'store/store';

import App from './App';
import './i18n';

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<FancyLoader />}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
