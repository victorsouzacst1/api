export function extractQueryParams(querry) {
    return querry
        .slice(1)
        .split("&")
        .reduce((querryParams, param) => {
            const [key, value] = param.split("=")
            querryParams[key] = value
            return querryParams
    }, {})
}