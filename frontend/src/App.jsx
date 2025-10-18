
import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute"
import RootLayout from "./layouts/RootLayout"
import NoteLayout from './layouts/NoteLayout'
import AllNotes from './pages/AllNotes'
import ArchivedNotes from "./pages/ArchivedNotes"
import CreateNotes from './components/CreateNotes'
import EditNotes from './components/EditNotes'
import Settings from './pages/Settings'
import ColorTheme from './components/ColorTheme'
import FontTheme from './components/FontTheme'
import { useSelector } from 'react-redux'

const router = createBrowserRouter(
  [
    { 
      path: "/login", 
      element: <Login /> 
    },
    { 
      path: "/signup", 
      element: <Signup /> 
    },
    {
      path: "/",
      element: <ProtectedRoute> <RootLayout /> </ProtectedRoute>,
      children:[
        {
          // in case of Layouts, no path is needed -> they alaways rendered with child if route is matched
          element: <NoteLayout archiveNotes={false}/>,
          children:
          [
            {
              index: true,
              element : <AllNotes />,
            },
            {
              path: "notes",
              element : <AllNotes />,
              children:
              [
                {
                  path: "create",
                  element: <CreateNotes />,
                },
                {
                  path: ":noteId",
                  element: <EditNotes />,
                },
              ],
            },
          ],
        },
        // Archive ROutes:-
        {
          element: <NoteLayout archiveNotes={true}/>,
          children:
          [
            {
              path: "archives",
              element : <ArchivedNotes />,
              children:
              [
                {
                  path: ":noteId",
                  element: <EditNotes />,
                },
              ],
            },
          ],
        },
        {
          element: <NoteLayout />,
          children:
          [
            {
              path: "settings",
              element : <Settings />,
              children:
              [
                {
                  path: "color-theme",
                  element: <ColorTheme />,
                },
                {
                  path: "font-theme",
                  element: <FontTheme />
                },
              ],
            },
          ],
        },
      ]
    }
  ]
)

function App() {
  const { darkMode, selectedTheme, selectedFont } = useSelector((state) => state.theme);

  useEffect(() => {
    localStorage.setItem("theme", selectedTheme);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, selectedTheme]);

  useEffect(() => {
    localStorage.setItem("font-family", selectedFont);
     document.documentElement.classList.remove("sans-serif", "noto-serif", "monospace");

    if (selectedFont === "sans-serif" ) {
      document.documentElement.classList.add("sans-serif");
      console.log("sans-serif applied")
    } 
    else if (selectedFont === "noto-serif") {
      document.documentElement.classList.add("noto-serif");
      console.log("noto-serif applied"); 
    } 
    else {
      document.documentElement.classList.add("monospace");
      console.log("monospace applied"); 
    }
  }, [selectedFont]);

  return (
    <div className='w-full h-screen overflow-x-hidden relative bg-neutral-0 text-neutral-950'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
