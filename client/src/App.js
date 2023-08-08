import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

import Landing from './pages/Landing';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Doctors from './pages/Admin/Doctors';
import Users from './pages/Admin/Users';
import Profile from './pages/Doctor/Profile';
import BookingPage from './pages/BookingPage';
import PatientPage from './pages/Doctor/PatientPage';
import PatientAppointments from './pages/PatientAppointments';



function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
    <BrowserRouter>
    {loading ? (<Spinner />) : (
    <Routes>

      <Route path='/' 
      element={

      <ProtectedRoute>
        <HomePage/>
      </ProtectedRoute>
      } />

<Route path='/apply-doctor' 
      element={

      <ProtectedRoute>
        <ApplyDoctor/>
      </ProtectedRoute>
      
      } />

<Route path='/admin/doctors' 
      element={

      <ProtectedRoute>
        <Doctors/>
      </ProtectedRoute>
      
      } />

<Route path='/doctor/profile/:id' 
      element={

      <ProtectedRoute>
        <Profile/>
      </ProtectedRoute>
      
      } />
     < Route path='/doctor/Booking-Details/:id' 
      element={

      <ProtectedRoute>
        <BookingPage/>
      </ProtectedRoute>
      
      } />
      < Route path='/doctor/PatientLogs/:id' 
      element={

      <ProtectedRoute>
        <PatientPage/>
      </ProtectedRoute>
      
      } />
<Route path='/admin/users' 
      element={

      <ProtectedRoute>
        <Users/>
      </ProtectedRoute>
      
      } />

<Route path='/notification' 
      element={

      <ProtectedRoute>
        <NotificationPage/>
      </ProtectedRoute>
      
      } />
      <Route path='/appointments' 
      element={

      <ProtectedRoute>
        <PatientAppointments/>
      </ProtectedRoute>
      
      } />

      <Route path='/Login' 
      element={

      <PublicRoute>
        <Login/>
      </PublicRoute>

      } />

      <Route path='/Register' 
      element={
      <PublicRoute>
        <Register/>
      </PublicRoute>

      } />
      
      <Route path='/Landing'
      element={

        <PublicRoute>
          <Landing/>
        </PublicRoute>

      }/>
    </Routes>
    )}
    </BrowserRouter>
    </>
  );
}

export default App;
