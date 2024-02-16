


export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return date.toLocaleDateString('us-US', options)
}