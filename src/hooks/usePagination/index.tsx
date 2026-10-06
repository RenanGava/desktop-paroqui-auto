import { useState } from "react"




export function usePagination() {

    const [selectedPage, setSelectedPage] = useState(1)
    const [pages, setPages] = useState(0)
    const [loading, setLoading] = useState(false)



    return {
        selectedPage,
        pages,
        loading,
        setPages,
        setLoading,
        setSelectedPage
    }
}