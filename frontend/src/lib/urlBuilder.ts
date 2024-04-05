const urlBuilder = (src: string) => {
    const fullUrl = process.env["IMAGE_URL_PREFIX"] + src
    return fullUrl
} 

export default urlBuilder;