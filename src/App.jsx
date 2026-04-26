import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Header from './components/header';



function App() {
  return (
  <UserProvider>
    <Header/>
    <Routes>
      <Route path="/" element={<p>Home placeholder</p>} />
      </Routes>
  </UserProvider>
  );
}

export default App;