interface QueryFilter {
  [index: string]: string;
}

interface MergeRequest {
  [index: string]: any;
}

const gitLabToken = import.meta.env.VITE_GITLAB_TOKEN
const gitLabUrl = import.meta.env.VITE_GITLAB_BASE_URL

const baseGitLabUri = `${gitLabUrl}api/v4/projects/${import.meta.env.VITE_GITLAB_SPACEFILL_PROJECT_ID}/`

export const fetchApiGet = async (path: string) => {
    // console.log(`${baseGitLabUri}${path}`)
    return await fetch(
        `${baseGitLabUri}${path}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "PRIVATE-TOKEN": gitLabToken
            }
        }
    )
};

export const fetchJob = async (jobId: number) => (
    await fetchApiGet(`jobs/${jobId}`)
        .then(response => (response.json()))
)

export const fetchJobTrace = async (jobId: number): Promise<string> => (
    await fetchApiGet(`jobs/${jobId}/trace`)
        .then(response => (response.text()))
)

export const fetchMergeRequests = async (filters: QueryFilter): Promise<Array<MergeRequest>> => {
    const filterUrl = Object.entries(filters).map(([k, v]) => (
        `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
    )).join('&')
    return await fetchApiGet(`merge_requests?${filterUrl}`)
        .then(response => (response.json()))
}

export const fetchPipelines = async (filters: QueryFilter) => {
    const filterUrl = Object.entries(filters).map(([k, v]) => (
        `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
    )).join('&')
    return await fetchApiGet(`pipelines?${filterUrl}`)
        .then(response => (response.json()))
}

export const fetchGetQueryFilter = async (url: string, filters: QueryFilter = {}) => {
    const filterUrl = Object.entries(filters).map(([k, v]) => (
        `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
    )).join('&')
    // console.log({[url]: filterUrl})
    return await fetchApiGet(url)
        .then(response => (response.json()))
}

