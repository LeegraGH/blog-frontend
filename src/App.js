import Container from "@mui/material/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/auth";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAuthMe());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts/:id" element={<FullPost />}/>
          <Route path="/posts/:id/edit" element={<AddPost />}/>
          <Route path="/posts/create" element={<AddPost />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Registration />}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
