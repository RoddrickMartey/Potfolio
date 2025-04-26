import { Route, Routes, useLocation } from "react-router";
import LoginPage from "./pages/LoginPage";
import Protect from "./auth/Protect";
import HomePage from "./pages/HomePage";
import UpdateUserPage from "./pages/UpdateUserPage";
import ProjectsPage from "./pages/ProjectsPage";
import UpdateProjectPage from "./pages/UpdateProjectPage";
import NavComponent from "./components/NavComponent";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";

function App() {
  const { pathname } = useLocation();

  return (
    <main className="flex min-h-screen">
      <section className="w-full flex flex-col">
        {/* Conditional Header (Visible only on certain paths) */}
        {pathname !== "/" && (
          <section>
            <Header />
          </section>
        )}

        <section className="flex flex-1">
          {/* Conditional Sidebar (Nav) */}
          {pathname !== "/" && (
            <section className="w-1/4 ">
              <NavComponent />
            </section>
          )}

          {/* Main Content Section */}
          <section
            className={`flex-1 border-l-2 border-l-black ${
              pathname !== "/" ? "pl-4" : ""
            }`}
          >
            <Routes>
              <Route path="/" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route element={<Protect />}>
                <Route path="/userInfo" element={<HomePage />} />
                <Route path="/update_user_info" element={<UpdateUserPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route
                  path="/update_project/:id"
                  element={<UpdateProjectPage />}
                />
              </Route>

              {/* Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </section>
        </section>
      </section>
    </main>
  );
}

export default App;
