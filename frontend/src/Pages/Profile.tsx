import { Box } from "@chakra-ui/react"
import { useLoaderData } from "react-router";

const Profile = () => {
    const data = useLoaderData()

    console.log('LOADER DATA', data)
    return (
        <Box>
            Profile page
        </Box>
    )
}

export default Profile;