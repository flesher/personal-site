import viewports from "@/styles/viewports.module.scss";

const integerViewports = Object.entries(viewports).reduce((
    acc: {[key: string]: number}, 
    [key, val]: string[]
) => {
    if (key !== '__checksum') acc[key] = parseInt(val.replace('px', ''));
    return acc;
}, {});

export default integerViewports;