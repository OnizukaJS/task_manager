using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace TaskManager.Middlewares
{
    public class ErrorsHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorsHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                string errorMessage;
                var response = context.Response;
                response.ContentType = "application/json";

                switch (error)
                {
                    case KeyNotFoundException:
                        response.StatusCode = (int)HttpStatusCode.NotFound;
                        errorMessage = error.Message;
                        break;
                    default:
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        errorMessage = "Unexpected error";
                        break;
                }

                var result = JsonSerializer.Serialize(new { message = errorMessage });

                await response.WriteAsync(result);
            }
        }
    }
}
