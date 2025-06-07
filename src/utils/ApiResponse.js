class ApiResponse {
    constructor(statuscode, data , message = "Success") {
        this.statuscode = statuscode;
        this.data = data;
        this.message = message;
        this.success = statuscode < 400; // Assuming status codes < 400 are successful
    }
    
}
export { ApiResponse };