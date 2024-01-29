import './App.css';
import Dashboard from './components/Dashboard';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import UserChats from './components/UserChats';

function App() {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>ChatApp</Navbar.Brand>
        </Container>
      </Navbar>
      <Dashboard />
      <UserChats />
      <footer>
        <p>&copy;2024 ChatApp</p>
      </footer>
    </div>
  );
}

export default App;
