import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css';
import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/profile/:id' component={ProfileScreen} /> 
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
