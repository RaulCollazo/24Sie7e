import "./App.css";
import Logo from "./components/Logo/Logo";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  return (
    <>
      <header className="header">
        <Logo />
      </header>

      <div className="searchbar-wrapper">
        <SearchBar />
      </div>
    </>
  );
}

export default App;
