import "./App.css";
import Content from "./components/Content";
import Navigation from "./components/Navigation/Navigation";
import AuthProvider from "./components/providers/AuthProvider";
import LanguageProvider from "./components/providers/LanguageProvider";
import ThemeProvider from "./components/providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navigation />
        
        <AuthProvider>
          <Content />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
