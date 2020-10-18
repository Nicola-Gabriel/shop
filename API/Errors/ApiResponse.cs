using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetErrorMessage(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetErrorMessage(int statusCode)
        {
           return statusCode switch
           {
               400 => "You have made a bad request",
               401 => "You are not Authorized",
               404 => "Resources not found",
               500 => "Not your fault, server error",
               _ => null
           };
        }
    }
}