import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import NewPatientLogin from './pages/PatientLogin.tsx';
import DrLogin from './pages/Drlogin.tsx'
import PatientSignup from './pages/PatientSignup.tsx';
import DrSignUp from './pages/DrSignup.tsx';
import PatientProfile from './pages/PatientProfile.tsx';
import DoctorProfile from './pages/DrProfile.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/Drlogin',
        element: <DrLogin />
      },
      {
        path: '/PatientLogin',
        element: <NewPatientLogin />
      },
      {
        path: '/DrSignup',
        element: <DrSignUp/>
      },
      {
        path: '/PatientSignup',
        element: <PatientSignup />

      },
      {
        path: '/PatientProfile',
        element: <PatientProfile  />
      },
      {
        path: '/DrProfile',
        element: <DoctorProfile doctor={{dr_id: 0, dr_name: '', email: '', specialization: '', patient_id:[]}} />
      } ,
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
