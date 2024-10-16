import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from './pages/signInPage/SignInPage'

export function Router() {
    return (

        <BrowserRouter>
        
            <Routes>
                <Route path="/signIn" element={<SignInPage/>}/>
            </Routes>
        
        </BrowserRouter>

    )
}