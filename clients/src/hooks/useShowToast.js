import { useToast } from "@chakra-ui/react"
import { useCallback } from "react"

const useShowToast = () => {
    const toast = useToast()
    const showToast = useCallback(
        (title, description, status, position) => {
            toast({
                title,
                description,
                status,
                duration: 2000,
                isClosable: true,
                // position: 'top-right',
                position: 'top',
            })
        },
        [toast]
    )
    return showToast
}

export default useShowToast