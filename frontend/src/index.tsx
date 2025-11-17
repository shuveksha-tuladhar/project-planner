import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  useParams,
} from "react-router-dom";

import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import Projects from "./Pages/Projects";
import Profile from "./Pages/Profile";
import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";
import ResetPassword from "./Pages/ResetPassword";
import Project from "./Pages/Project";

const { ToastContainer, toast } = createStandaloneToast();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/auth/profile`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return response.data;
        } catch (error) {
          return {};
        }
      } else {
        return {};
      }
    },
    children: [
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/log-in",
        element: <LogIn />,
      },
      {
        path: "/projects",
        element: <Projects />,
        loader: async () => {
          //get a token from a local storage
          const token = localStorage.getItem("token");

          //if we have a token, we will use it as a bearer on our request for user data
          if (token) {
            try {
              const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/user-projects`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return response.data;
            } catch (error) {
              //if you have an expired token, we will show an error toast and redirect the user to the log-in page
              console.log("ERRORS", error);
              toast({
                title: "An error occurred.",
                description: "You must be signed in to view this page.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              return redirect("/log-in");
            }
          } else {
            //if we dont not have a token, we will show an toast and redirect the user to the sign-up page
            console.log("NO TOKEN");

            toast({
              title: "An error occurred.",
              description: "You must have an account to view this page.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            return redirect("/sign-up");
          }
        },
      },
      {
          path: "/project/:id",
          element: <Project/>,
          loader: async ({params}) => {
           
             const token = localStorage.getItem("token");
  
            if (token) {
              try {
                const response = await axios.get(
                  `${process.env.REACT_APP_API_URL}/auth/project/${params.id}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                
                if (response.data.length === 0){
                  toast({
                    title: "An error occurred.",
                    description: "You do not have access to that project!.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                  return redirect("/projects");
                }

                return response.data;
              } catch (error) {
       
                console.log("ERRORS", error);
                toast({
                  title: "An error occurred.",
                  description: "You must be signed in to view this page.",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
                return redirect("/log-in");
              }
            } else {
     
              console.log("NO TOKEN");
  
              toast({
                title: "An error occurred.",
                description: "You must have an account to view this page.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              return redirect("/sign-up");
            }
          },
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          //get a token from a local storage
          const token = localStorage.getItem("token");

          //if we have a token, we will use it as a bearer on our request for user data
          if (token) {
            try {
              const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/profile`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return response.data;
            } catch (error) {
              //if you have an expired token, we will show an error toast and redirect the user to the log-in page
              console.log("ERRORS", error);
              toast({
                title: "An error occurred.",
                description: "You must be signed in to view this page.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              return redirect("/log-in");
            }
          } else {
            //if we dont not have a token, we will show an toast and redirect the user to the sign-up page
            console.log("NO TOKEN");

            toast({
              title: "An error occurred.",
              description: "You must have an account to view this page.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            return redirect("/sign-up");
          }
        },
      },
      {
        path: "/reset-password/:token/:id",
        element: <ResetPassword />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <ToastContainer />
    <RouterProvider router={router} />
  </>
);
