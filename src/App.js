import logo from './logo.svg';
import Layout from './components/Layout';
import data from './components/data';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <Layout data={data} />
      </div>
    </div>
  );
}

export default App;
