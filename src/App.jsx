import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Components/Home/Home';
import SingleProduct from './Components/SingleProduct/SingleProduct';
import Cart from './Components/Cart/Cart';
import Tshirt from './Tshirt';
import CheckoutSuccess from './Components/Cart/CheckoutSuccess';
import Shop from './Components/Shop/Shop';
import Admin from './Components/Admin/Admin';
import Services from './Components/Services/Services'

function App() {
  return (  
    <>      
        <Layout/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/SingleProduct/:id" element={<SingleProduct/>}/>
            <Route path="/category/:cname" element={<Shop/>}/>
            <Route path="/cart/:u_id" element={<Cart/>}/>
            <Route path="/success" element={<CheckoutSuccess/>} />
            <Route path="/tshirtDesigner" element={<Tshirt/>}></Route>
            <Route path="/admin" element={<Admin/>}/>   
            <Route path="/services" element={<Services/>}/>   
        </Routes>      
        
    </>
  );
}

export default App;