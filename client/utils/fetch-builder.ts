import HttpClient from "./http-client";

const httpClient = new HttpClient()

export default function fetcherBuilder(url: string, requestType: string, requestData?: any) {
    let fetcher
     switch (requestType) {
        case "get":
            fetcher = (url:string) => httpClient.get(url) 
            break;
        case "post":
            fetcher = (url: string) => httpClient.post(url, requestData)
            break;
        case "update":
            fetcher = (url: string) => httpClient.put(url, requestData)
            break;
        case "delete":
            fetcher = (url: string) => httpClient.delete(url)
            break;        
        default:
            throw new Error('Undefined request type!')
    }

    return fetcher
}

