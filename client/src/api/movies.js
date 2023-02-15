import { fetchHelper } from "./helper";
const port = 3002

export function getAllMovies(sort = 'title', sortOrder = 'asc'){
    const endpoint = `http://localhost:${port}/movies/?sort=${sort}&sortOrder=${sortOrder}`
    return fetchHelper({endpoint})
}

export function addNewMovie(newMovie){
    console.log(newMovie);
    
    const endpoint = `http://localhost:${port}/movies/add`
    return fetchHelper({endpoint, method: 'POST', body: newMovie})
}