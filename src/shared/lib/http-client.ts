import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// export interface MarvelApiResponse<T> {
//   data: {
//     results: T[];
//     count: number;
//     total: number;
//     offset: number;
//     limit: number;
//   };
// }
// Интерфейс для HTTP-клиента
export interface HttpClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  // post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  // put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  // delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

// Реализация HTTP-клиента с использованием Axios
class AxiosHttpClient implements HttpClient {
  private axiosInstance = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public',
    timeout: 10000, // 10 секунд
  });

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get<T>(url, config);
  }

  // post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
  //   return this.axiosInstance.post<T>(url, data, config);
  // }

  // put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
  //   return this.axiosInstance.put<T>(url, data, config);
  // }

  // delete<T>(url: string, config?: AxiosRequestConfig) {
  //   return this.axiosInstance.delete<T>(url, config);
  // }
}

// Экспортируем экземпляр клиента
export const httpClient: HttpClient = new AxiosHttpClient();
