import { Metadata } from "next";
import AppRegister from "src/components/auth/register/app.register";
export const metadata: Metadata = {
    title: 'Register',
    description: 'Register',
}
const RegisterPage = () => {
    return (
        <>
            <AppRegister />
        </>
    )
}
export default RegisterPage;