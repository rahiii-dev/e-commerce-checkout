import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "./components/templates/AppLayout";
import LandingPage from "./pages/LandingPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />}/>
          </Route>

          {/* unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
