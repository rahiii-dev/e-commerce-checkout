import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "./components/templates/AppLayout";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "sonner";
import CheckoutPage from "./pages/CheckoutPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />}/>
          </Route>
          <Route path="/checkout/:id" element={<CheckoutPage />}/>
          
          {/* unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors={true} visibleToasts={2} theme="dark"/>
    </>
  )
}

export default App
