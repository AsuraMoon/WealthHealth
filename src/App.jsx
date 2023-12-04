import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PersonProvider } from './store/PersonContext';
import Header from './components/Navbar/Navbar';
import PersonForm from './components/Form/PersonForm';
import PersonListPage from './pages/ListPage/PersonListPage';

const App = () => {
  return (
    <PersonProvider>
      <Router>
        <>
          <Header />

          <Routes>
            <Route path="/" element={<PersonForm />} />
            <Route path="/employee-list" element={<PersonListPage />} />
          </Routes>
        </>
      </Router>
    </PersonProvider>
  );
};

export default App;
