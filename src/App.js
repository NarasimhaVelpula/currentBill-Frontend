
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Bills from './Pages/Bills';
import Bill from './Pages/Bill';
import {  Container } from '@mui/material';
import NewBill from './Pages/NewBill';

function App() {
  return (
    <Container >

    <BrowserRouter>
    <Routes>
      <Route index element={<Bills />} />
      <Route path=":billId" element={<Bill />} />
      <Route path="newBill" element={<NewBill />} />
    </Routes>
  </BrowserRouter>
  </Container>
  );
}

export default App;
