// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./components/private/PrivateRoute";
import routers from "./routers/routers";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {routers.map((item, index) => {
            const Component = item.component;
            const isPrivate = item.private;

            const element = isPrivate ? (
              <PrivateRoute>
                <Component />
              </PrivateRoute>
            ) : (
              <Component />
            );

            return <Route key={index} path={item.path} element={element} />;
          })}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
