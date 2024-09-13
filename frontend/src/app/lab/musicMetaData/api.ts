export const BASE_URL = "/musicbrainz/"

export const createSearchURL = function(
    entity: "artist" | "release" | "recording",
    query: string
) {
    return `${BASE_URL}/${entity}?query=${query}&fmt=json`
}

export const createItemURL = function(
    entity: "artist" | "release" | "recording",
    id: string
) {
    return `${BASE_URL}/${entity}/${id}?inc=artists+labels`
}