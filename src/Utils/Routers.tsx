import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Profile from '../Pages/Profile/Profile';
import ProfileHomepage from '../Components/Profile/ProfileHomepage';
import SpaceRequirements from '../Components/Profile/SpaceRequirements';
import ChangePassword from '../Components/Profile/ChangePassword';
import PrivateRoute from '../Components/PrivateRoute/PrivateRoute';
import ForgetPassword from '../Pages/ForgetPassword/ForgetPassword';
import MatchOtp from '../Components/MatchOtp/MatchOtp';
import NewPassword from '../Components/NewPassword/NewPassword';
import BookYourSpace from '../Pages/BookYourSpace/BookYourSpace';
import BuyerRegister from '../Pages/BuyerRegister/BuyerRegister';
import VisitorLogin from '../Pages/VisitorLogin/VisitorLogin';
import VisitorRegistration from '../Pages/VisitorRegistration/VisitorRegistration';
import ProductAndServices from '../Components/ProductAndServices/ProductAndServices';
import OnlineVisitors from '../Components/OnlineVisitors/OnlineVisitors';
import RegisterVisitors from '../Components/RegisterVisitors/RegisterVisitors';
import SeminarParticipantLogin from '../Pages/SeminarParticipantLogin/SeminarParticipantLogin';
import VisitorProfile from '../Pages/VisitorProfile/VisitorProfile';
import VisitorProfileHomePage from '../Components/Visitor/VisitorProfileHomePage/VisitorProfileHomePage';
import VisitorPrivateRoute from '../Components/PrivateRoute/VisitorPrivateRoute';
import VisitorEditProfile from '../Pages/VisitorEditProfile/VisitorEditProfile';
import VisitorWishlist from '../Pages/VisitorWishlist/VisitorWishlist';
import NotFound from '../Pages/NotFound/NotFound';
import MyLeads from '../Components/MyLeads/MyLeads';
import VisitorInvoice from '../Pages/VisitorInvoice/VisitorInvoice';
import VisitorForgetPassword from '../Pages/VisitorForgetPassword/VisitorForgetPassword';
import VisitorMatchOtp from '../Pages/VisitorMatchOtp/VisitorMatchOtp';
import VisitorNewPassword from '../Pages/VisitorNewPassword/VisitorNewPassword';
import VisitorChangePassword from '../Pages/VisitorChangePassword/VisitorChangePassword';
import RegisteredEvents from '../Pages/RegisteredEvents/RegisteredEvents';
import EventList from '../Pages/EventList/EventList';
import SingleEvent from '../Pages/SingleEvent/SingleEvent';
import B2BRegistration from '../Pages/B2BRegistration/B2BRegistration';
import B2BLogin from '../Pages/B2BRegistration/B2BLogin';
import B2BForgetPassword from '../Pages/B2BRegistration/B2BForgetPassword';
import B2BProfileHomePage from '../Components/B2B/B2BProfileHomePage';
import B2BProfile from '../Pages/B2BProfile/B2BProfile';
import B2BPrivateRoute from '../Components/PrivateRoute/B2BPrivateRoute';
import B2BWishlist from '../Pages/VisitorWishlist/VisitorWishlist';
import B2BEditProfile from '../Pages/B2BProfile/B2BEditProfile';
import B2BInvoice from '../Pages/B2BProfile/B2BInvoice';
import B2BChangePassword from '../Pages/B2BProfile/B2BChangePassword';
import B2BRegisteredEvents from '../Pages/B2BProfile/B2BRegistratedEvent';

export const routers = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'book-your-space',
    element: <BookYourSpace />,
  },
  {
    path: 'buyer-register',
    element: <BuyerRegister />,
  },
  {
    path: 'visitor-login',
    element: <VisitorLogin />,
  },
  {
    path: 'visitor-login',
    element: <VisitorLogin />,
  },
  {
    path: 'b2b-login',
    element: <B2BLogin />,
  },
  {
    path: 'visitor-registration',
    element: <VisitorRegistration />,
  },
  {
    path: 'b2b-registration',
    element: <B2BRegistration />,
  },
  {
    path: 'seminar-participant-login',
    element: <SeminarParticipantLogin />,
  },
  {
    path: 'event-list',
    element: <EventList />,
  },
  {
    path: 'event-list/:id',
    element: <SingleEvent />,
  },
  {
    path: 'profile',
    element: <PrivateRoute component={<Profile />} />,
    children: [
      {
        path: '/profile',
        element: <ProfileHomepage />,
      },
      {
        path: 'space-requirements',
        element: <SpaceRequirements />,
      },
      {
        path: 'product-and-services',
        element: <ProductAndServices />,
      },
      {
        path: 'my-leads',
        element: <MyLeads />,
      },
      {
        path: 'online-visitors',
        element: <OnlineVisitors />,
      },
      {
        path: 'register-visitors',
        element: <RegisterVisitors />,
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
      },
    ],
  },

  {
    path: 'visitor',
    element: <VisitorPrivateRoute component={<VisitorProfile />} />,

    children: [
      {
        path: '/visitor/profile',
        element: <VisitorProfileHomePage />,
      },

      {
        path: '/visitor/register-event',
        element: <RegisteredEvents />,
      },
      {
        path: '/visitor/edit-profile',
        element: <VisitorEditProfile />,
      },
      {
        path: '/visitor/invoice',
        element: <VisitorInvoice />,
      },
      {
        path: '/visitor/wishlist',
        element: <VisitorWishlist />,
      },
      {
        path: '/visitor/change-password',
        element: <VisitorChangePassword />,
      },
    ],
  },
  {
    path: 'b2b',
    element: <B2BPrivateRoute component={<B2BProfile />} />,
    children: [
      {
        path: 'profile',
        element: <B2BProfileHomePage />,
      },
      {
        path: '/b2b/register-event',
        element: <B2BRegisteredEvents />,
      },
      {
        path: '/b2b/wishlist',
        element: <B2BWishlist />,
      },
      {
        path: '/b2b/invoice',
        element: <B2BInvoice />,
      },
      {
        path: '/b2b/edit-profile',
        element: <B2BEditProfile />,
      },
      {
        path: '/b2b/change-password',
        element: <B2BChangePassword />,
      },
    ],
  },

  {
    path: 'forget-password',
    element: <ForgetPassword />,
  },
  {
    path: 'match-otp',
    element: <MatchOtp />,
  },
  {
    path: 'new-password',
    element: <NewPassword />,
  },
  {
    path: 'visitor-forget-password',
    element: <VisitorForgetPassword />,
  },
  {
    path: 'b2b-forget-password',
    element: <B2BForgetPassword />,
  },
  {
    path: 'visitor-match-otp',
    element: <VisitorMatchOtp />,
  },
  {
    path: 'visitor-new-password',
    element: <VisitorNewPassword />,
  },
]);
