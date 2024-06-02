import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import {
  Home,
  Login,
  Signup,
  NotFound,
  CreateTrip,
  Profile,
  TripDetails,
  UpdateTrip,
} from "./pages";

import { Navigation, Footer } from "./components";

import { setUser } from "./store/reducers/userSlice";
import ExplorePage from "./pages/ExplorePage";
import ContactUsPage from "./pages/ContactPage";
import Guides from "./pages/Guides";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component render
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/guide" element={<Guides />} />
        <Route path="/contact" element={<ContactUsPage />} />

        {user && (
          <>
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/trips/:id" element={<TripDetails />} />
            <Route path="/trips/:id/edit" element={<UpdateTrip />} />
          </>
        )}

        <Route path="/create-trip" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
