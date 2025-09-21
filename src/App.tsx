import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./Pages/Forms/Login";
import Homepage from "./Pages/Homepage/Homepage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import EditProfilePage from "./Pages/ProfilePage/EditProfilePage";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import CreateEventPage from "./Pages/CreateEventPage/CrearteEventPage";
import ContactUsPage from "./Pages/ContactUsPage/ContactUsPage";
import AboutUs from "./Pages/Aboutus/Aboutus";
import SingleEventPage from "./Pages/SingleProduct/SingleEventPage";
// import SingleEventPage from "./Pages/SingleEventPage/SingleEventPage";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Router>
        <Routes>
          {/* Homepage & Popular Events */}
          <Route path="/" element={<Homepage />} />
          <Route path="/popular-events" element={<Homepage />} />{" "}
          {/* PopularEvents included in Homepage */}
          {/* User/Auth */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Login />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/EditProfile" element={<EditProfilePage />} />
          {/* Events */}
          <Route path="/CreateEvent" element={<CreateEventPage />} />
          <Route path="/event/:id" element={<SingleEventPage />} />
          {/* Products */}
          <Route path="/Products" element={<ProductsPage />} />
          {/* Add SingleProduct page later if needed */}
          {/* <Route path="/single-product/:id" element={<SingleProduct />} /> */}
          {/* Other Pages */}
          <Route path="/ContactUs" element={<ContactUsPage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          {/* Fallback */}
          <Route path="*" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
