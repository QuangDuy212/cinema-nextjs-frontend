import { Metadata } from "next";
import AppPayment from "src/components/user/payment/app.payment";
export const metadata: Metadata = {
    title: 'Payment page',
    description: 'Payment page',
}
const PaymentPage = () => {
    return (
        <>
            <AppPayment />
        </>
    )
}
export default PaymentPage;