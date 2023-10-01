import logo from "./simpplr.svg";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { Newsletters } from "./Newsletters/Newsletters";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Newsletters />
      </div>
    </QueryClientProvider>
  );
}

export default App;
