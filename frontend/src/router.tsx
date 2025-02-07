import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from './pages/signInPage/SignInPage'
import SignUpPage from "./pages/signUpPage/SignUpPage";
import Home from "./pages/home/Home";
import CalculatorPage from "./pages/calculatorPage/CalculatorPage";

export function Router() {
    return (

        <BrowserRouter>
        
            <Routes>
                <Route path="/signIn" element={<SignInPage/>}/>
                <Route path="/signUp" element={<SignUpPage/>}/>
                <Route path="/calculator" element={<CalculatorPage/>}/>

                <Route path="/" element={<Home/>}/>
            </Routes>
        
        </BrowserRouter>

    )
}
