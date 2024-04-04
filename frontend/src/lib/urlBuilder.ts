import configs from "../../configs.json";

const urlBuilder = (src: string) => {
    const fullUrl = configs.STRAPI_URL + src
    console.log(fullUrl);
    return fullUrl
} 

export default urlBuilder;