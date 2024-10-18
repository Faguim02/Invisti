import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from './pages/signInPage/SignInPage'
import SignUpPage from "./pages/signUpPage/SignUpPage";
import Home from "./pages/home/Home";

export function Router() {
    return (

        <BrowserRouter>
        
            <Routes>
                <Route path="/signIn" element={<SignInPage/>}/>
                <Route path="/signUp" element={<SignUpPage/>}/>

                <Route path="/" element={<Home/>}/>
            </Routes>
        
        </BrowserRouter>

    )
}