using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using System.Reflection;
using System.Text.Json.Serialization;
using TaskManager.Dtos.mail;
using TaskManager.Interfaces.comment;
using TaskManager.Interfaces.employee;
using TaskManager.Interfaces.mail;
using TaskManager.Interfaces.profilePicture;
using TaskManager.Interfaces.tag;
using TaskManager.Interfaces.taskToDo;
using TaskManager.Interfaces.workItem;
using TaskManager.Models.taskToDo;
using TaskManager.Queries.comment;
using TaskManager.Queries.employee;
using TaskManager.Queries.mail;
using TaskManager.Queries.profilePicture;
using TaskManager.Queries.tag;
using TaskManager.Queries.taskToDo;
using TaskManager.Queries.workItem;
using TaskManager.Services.employee;
using TaskManager.Services.profilePicture;

// We need to add our contexts to Startup.cs to inject the services

namespace TaskManager
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddAutoMapper(typeof(Startup));

            services.AddControllers().AddJsonOptions(opts =>
            {
                var enumConverter = new JsonStringEnumConverter();
                opts.JsonSerializerOptions.Converters.Add(enumConverter);
            });

            services.AddSwaggerGen(options => 
            {
                options.SwaggerDoc("v1", new OpenApiInfo 
                { 
                    Version = "v1",
                    Title = "My Task Manager",
                    Description = "ASP.NET Core Web API Task Manager"
                });

                var fileName = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var filePath = Path.Combine(AppContext.BaseDirectory, fileName);
                options.IncludeXmlComments(filePath);
            });

            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));

            // UseSqlServer requires a connection string that's defined in our appsettings.json
            services.AddDbContextPool<TaskToDoContext>(options => options.UseSqlServer(
                Configuration.GetConnectionString("TaskManagerContextConnectionString")));

            services.AddScoped<IEmployeeData, EmployeeQueries>();
            services.AddScoped<IWorkItemData, WorkItemQueries>();
            services.AddScoped<ITaskToDoData, TaskToDoQueries>();
            services.AddScoped<ICommentData, CommentQueries>();
            services.AddScoped<ITagData, TagQueries>();
            services.AddScoped<IProfilePictureService, ProfilePictureService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddTransient<IMailData, MailQueries>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Swagger Demo API");
                options.OAuthUsePkce();
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder =>
            {
                builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });

            // To access files under wwwroot
            app.UseStaticFiles();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToFile("/index.html"); // to redirect when url doesn't exist
            });
        }
    }
}
