import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "../src/Pages/Forms/Login";
import Homepage from "./Pages/Homepage/Homepage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import CreateEventPage from "./Pages/CreateEventPage/CrearteEventPage";
import ContactUsPage from "./Pages/ContactUsPage/ContactUsPage";
import EditProfilePage from "./Pages/ProfilePage/EditProfilePage";
import AboutUs from "./Pages/Aboutus/Aboutus";

function App() {
  return (
    <>
      <div className="bg-gray-900 min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/EditProfile" element={<EditProfilePage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Login />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/CreateEvent" element={<CreateEventPage />} />
            <Route path="/ContactUs" element={<ContactUsPage />} />
            <Route path="/Products" element={<ProductsPage />} />
            <Route path="/AboutUs" element={<AboutUs />} /> {/* 👈 New Route */}
            <Route path="/event/:id" element={<SingleProduct />} />
            {/* Optional: redirect or fallback */}
            <Route path="*" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
