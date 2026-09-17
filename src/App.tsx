import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { SavedProvider } from './context/SavedContext';
import { ReviewProvider } from './context/ReviewContext';
import Layout from './components/Layout';
import AgraPlanner from './pages/AgraPlanner';
import AgraMoneyGuide from './pages/AgraMoneyGuide';
import AgraHiddenPlaces from './pages/AgraHiddenPlaces';
import AgraStay from './pages/AgraStay';
import AgraHelp from './pages/AgraHelp';
import AgraCulture from './pages/AgraCulture';
import AgraEvents from './pages/AgraEvents';
import AgraStayEat from './pages/AgraStayEat';
import AgraArtsCrafts from './pages/AgraArtsCrafts';
import AgraLocalStories from './pages/AgraLocalStories';
import CityPlanner from './pages/CityPlanner';
import IndiaCompanion from './pages/IndiaCompanion';

import Landing from './pages/Landing';
import StartTrip from './pages/StartTrip';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import StatePage from './pages/StatePage';
import DestinationPage from './pages/DestinationPage';
import PlacePage from './pages/PlacePage';
import Guides from './pages/Guides';
import GuideProfile from './pages/GuideProfile';
import BecomeGuide from './pages/BecomeGuide';
import Experiences from './pages/Experiences';
import Saved from './pages/Saved';
import Feedback from './pages/Feedback';
import About from './pages/About';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SavedProvider>
          <ReviewProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Landing />} />
                  <Route path="/start" element={<StartTrip />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/profile" element={<Profile />} />

                  <Route path="/explore" element={<Explore />} />
                  <Route path="/states" element={<Explore />} />
                  <Route path="/states/:stateId" element={<StatePage />} />
                  <Route path="/destination/:destinationId" element={<DestinationPage />} />
                  <Route path="/destination/:destinationId/plan" element={<CityPlanner />} />
                  <Route path="/companion" element={<IndiaCompanion />} />
                  <Route path="/companion/:destinationId" element={<IndiaCompanion />} />
                  <Route path="/place/:placeId" element={<PlacePage />} />
                  <Route path="/agra/plan" element={<AgraPlanner />} />
                  <Route path="/agra/planner" element={<AgraPlanner />} />
                  <Route path="/agra/money" element={<AgraMoneyGuide />} />
                  <Route path="/agra/hidden" element={<AgraHiddenPlaces />} />
                  <Route path="/agra/stay" element={<AgraStay />} />
                  <Route path="/agra/help" element={<AgraHelp />} />
                  <Route path="/agra/culture" element={<AgraCulture />} />
                  <Route path="/agra/events" element={<AgraEvents />} />
                  <Route path="/agra/stay-eat" element={<AgraStayEat />} />
                  <Route path="/agra/arts-crafts" element={<AgraArtsCrafts />} />
                  <Route path="/agra/local-stories" element={<AgraLocalStories />} />

                  <Route path="/guides" element={<Guides />} />
                  <Route path="/guides/:guideId" element={<GuideProfile />} />
                  <Route path="/become-guide" element={<BecomeGuide />} />
                  <Route path="/experiences" element={<Experiences />} />

                  <Route path="/saved" element={<Saved />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/search" element={<SearchResults />} />

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ReviewProvider>
        </SavedProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
