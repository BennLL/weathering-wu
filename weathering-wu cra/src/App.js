import Title from "./components/title";
import { Signup } from "./pages/signupForm";
import { Login } from "./pages/loginForm";
import HomePage from "./pages/homePage";
import "./App.css";
import './index.css';
import { useEffect } from 'react';
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: (<>
      <Title />
      <HomePage />
    </>)
  },
  {
    path: '/signup',
    element: (<>
      <Title />
      <Signup />
    </>)
  },
  {
    path: '/login',
    element: (<>
      <Title />
      <Login />
    </>)
  }
])

function App() {
  // raining effect
  useEffect(() => {
    let hrElement;
    let counter = 70;
    for (let i = 0; i < counter; i++) {
      hrElement = document.createElement("HR");
      hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
      hrElement.style.animationDuration = 2 + Math.random() * 3 + "s";
      hrElement.style.animationDelay = Math.random() * 5 + "s";
      document.body.appendChild(hrElement);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="whole"
      >
        <AuthContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthContextProvider>
      </div>
    </QueryClientProvider>

  )
}

export default App;