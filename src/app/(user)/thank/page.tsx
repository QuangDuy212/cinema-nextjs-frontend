import { Metadata } from "next";
import AppThank from "src/components/user/thank/app.thank";
export const metadata: Metadata = {
    title: 'Thank page',
    description: 'Thank page',
}
const ThankPage = () => {
    return (
        <>
            <AppThank />
        </>
    )
}
export default ThankPage;