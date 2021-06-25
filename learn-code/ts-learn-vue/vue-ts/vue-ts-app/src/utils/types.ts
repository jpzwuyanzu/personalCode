interface IAxiosResponse {
    status: number
    statusText: string
    request: any
    data: any
    headers: any
    config: any
}

interface Banner {
    readonly bannerid: string
    bannerimh: string
    alt: string
    link: string
}

export { Banner, IAxiosResponse }