import UseSWR from 'swr'
import fetcherBuilder from "../utils/fetch-builder";


const useFetch = (url: string,requestType:string,requestData?:any) => {
    const fetcher = fetcherBuilder(url, requestType, requestData); 
   
    const { data, error } = UseSWR(url, fetcher)
    
    return {data,error}

 }

export default useFetch