
import { Metadata } from "next";
import AppSignin from "src/components/auth/signin/app.signin";
export const metadata: Metadata = {
    title: 'Signin',
    description: 'Signin',
}
const LoginPage = async () => {
    return (
        <>
            <AppSignin />
        </>
    )
}
export default LoginPage;