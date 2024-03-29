import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import store from './store/Store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
