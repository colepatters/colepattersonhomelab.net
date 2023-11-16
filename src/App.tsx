import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient()

const firebaseConfig = {
  apiKey: "AIzaSyANxDvimkrwvx-iI92wdDtiQQcfo_YAGac",
  authDomain: "colepattersonhomelab.firebaseapp.com",
  projectId: "colepattersonhomelab",
  storageBucket: "colepattersonhomelab.appspot.com",
  messagingSenderId: "179926383053",
  appId: "1:179926383053:web:287b3ba5c5f18be39dac84",
  measurementId: "G-KBMN6VHX5B"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

import NavBar from './NavBar'
import Games from './Games'

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import PagesOverview from "./PagesOverview";
import About from "./About";

function Root() {
  
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: 'games',
        element: <Games firestore={firestore}/>
      },
      {
        path: 'pages/*',
        element: <PagesOverview firestore={firestore} />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
