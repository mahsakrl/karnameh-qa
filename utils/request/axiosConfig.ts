interface AxiosConfig {
    baseURL: string;
    timeout?: number;
}
const axiosConfig: AxiosConfig = {
    baseURL: "http://localhost:3004",
    timeout: 5000,
};
export default axiosConfig;
