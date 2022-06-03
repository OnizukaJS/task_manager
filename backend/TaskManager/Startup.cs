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
using TaskManager.Dtos.mailDto;
using TaskManager.Models.taskToDo;
using TaskManager.Repository.comment;
using TaskManager.Repository.employee;
using TaskManager.Repository.tag;
using TaskManager.Repository.taskToDo;
using TaskManager.Repository.workItem;
using TaskManager.Services.comment;
using TaskManager.Services.employee;
using TaskManager.Services.mail;
using TaskManager.Services.profilePicture;
using TaskManager.Services.tag;
using TaskManager.Services.taskToDo;
using TaskManager.Services.workItem;

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

            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IEmployeeService, EmployeeService>();

            services.AddScoped<ITaskToDoRepository, TaskToDoRepository>();
            services.AddScoped<ITaskToDoService, TaskToDoService>();

            services.AddScoped<IWorkItemRepository, WorkItemRepository>();
            services.AddScoped<IWorkItemService, WorkItemService>();
            
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<ICommentService, CommentService>();

            services.AddScoped<ITagRepository, TagRepository>();
            services.AddScoped<ITagService, TagService>();

            services.AddScoped<IProfilePictureService, ProfilePictureService>();

            services.AddTransient<IMailService, MailService>();
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
