import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Navbar,
  News,
  HomePage,
  Exchange,
  CryptoCurrencies,
  CryptoDetails,
  Profile,
  Dashboard,
} from "./components";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="bg-gradient-to-r from-indigo-500 h-screen border-2 border-black">
      <Navbar />

      <div
        style={{
          marginLeft: isMobile ? "0px" : "300px",
          // marginTop: isMobile && "56px",
        }}
        className="relative h-full overflow-y-auto"
      >
        {!isMobile && (
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <div style={{ margin: "10px" }}>
              {isAuthenticated ? (
                <button
                  className="rounded-lg h-10 w-24 text-white text-lg p-2 bg-gradient-to-r from-indigo-900 to-purple-900"
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  {" "}
                  LogOut{" "}
                </button>
              ) : (
                <button
                  className="rounded-lg h-10 w-24 text-white text-lg p-2 bg-gradient-to-r from-indigo-900 to-purple-900"
                  onClick={() => loginWithRedirect()}
                >
                  {" "}
                  LogIn{" "}
                </button>
              )}
            </div>
          </div>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exchanges" element={<Exchange />} />
          <Route path="/news" element={<News simplified={false} />} />
          <Route
            path="/cryptocurrencies"
            element={<CryptoCurrencies simplified={false} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crypto/:coinId" element={<CryptoDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
