// App.jsx
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./components/private/PrivateRoute";
import routers from "./routers/routers";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense
          fallback={
            <div className="loading-container">
              <div className="spinner"></div>
              <span>Loading...</span>
            </div>
          }
        >
          <Routes>
            {routers.map((item, index) => {
              const Component = item.component;
              const isPrivate = item.private;

              return (
                <Route
                  key={index}
                  path={item.path}
                  element={
                    isPrivate ? (
                      <PrivateRoute>
                        <Component />
                      </PrivateRoute>
                    ) : (
                      <Component />
                    )
                  }
                />
              );
            })}
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
