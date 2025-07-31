import Header from "./components/Header";
import AppRoutes from "./routes";

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <AppRoutes />
    </div>
  );
};

export default App;
