import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

class BackendAPIService {
  baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1";
  }

  async get(path: string, config: AxiosRequestConfig): Promise<AxiosResponse> {
    const response = await axios.get(this.baseUrl + path, config);
    return response;
  }

  async post(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    const response = await axios.post(this.baseUrl + path, data, config);
    return response;
  }
}

const apiService = new BackendAPIService();
export default apiService;
