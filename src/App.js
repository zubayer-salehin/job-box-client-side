import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getUser, toggleLoading } from "./features/auth/authSlice";
import auth from "./firebase.init";
import routes from "./routes/routes";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';


disableReactDevTools();

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.email))
      } else {
        dispatch(toggleLoading())
      }
    })
  }, [dispatch])

  return (
    <>
      <Toaster />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;