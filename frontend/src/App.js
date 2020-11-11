import './App.css';
import PrivateRoutes from './containers/PrivateRoutes/PrivateRoutes';
import { useState } from 'react';
import LocalStorageService from './services/LocalStorageService';

function App() {
  const [role, setRole] = useState(LocalStorageService.getRole());

  return (
    <div className="App">
      <PrivateRoutes role={role} setRole={setRole} />
    </div>
  );
}

export default App;
