import { Metadata } from "next";
import AppProfile from "src/components/user/profile/app.profile";
export const metadata: Metadata = {
    title: 'Profile page',
    description: 'Profile page',
}
const ProfilePage = () => {
    return (
        <>
            <AppProfile />
        </>
    )
}
export default ProfilePage;