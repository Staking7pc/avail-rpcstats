import './App.css';
import Header from "./components/Header";
import Cards from "./components/Cards";
import RpcStatus from "./components/RpcStatus";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Cards />
      <Footer />
    </div>
  );
}

export default App;
