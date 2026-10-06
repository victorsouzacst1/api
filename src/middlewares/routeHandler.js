import { routes } from "../routes.js"
import { extractQueryParams } from "../utils/extract-querry-params.js"
import { Database } from "../database.js"

const database = new Database()

export function routeHandler(req, res) {
    const route = routes.find((route) => {
        return route.method === req.method && route.path.test(req.url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)
        const {querry, ...params} = routeParams.groups

        req.params = params
        req.querry = querry ? extractQueryParams(querry) : {}

        return route.controller({req, res, database})
    }

    return res.writeHead(404).end("Rota não encontrada!")
}