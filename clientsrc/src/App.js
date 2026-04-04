import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppRoutes from './routes/AppRoutes';
import { SearchProvider } from "./context/SearchContext";
function App() {
  return (
    <>
    <SearchProvider>
       <AppRoutes />
    </SearchProvider>
    </>
  );
}

export default App;
