using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using AspFitnessApi.Models;
using Microsoft.AspNetCore.Identity;
using System.IO;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace AspFitnessApi
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
      services.AddDbContext<AspFitnessApiContext>(options =>
              options.UseSqlServer(Configuration.GetConnectionString("AspFitnessApiContext")));

      services.AddIdentity<ApplicationUser, IdentityRole>()
          .AddEntityFrameworkStores<AspFitnessApiContext>()
          .AddDefaultTokenProviders();

      services.Configure<IdentityOptions>(options => {
        options.Password.RequireDigit = false;
        options.Password.RequiredLength = 8;
        options.Password.RequireLowercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
      });
      services.AddCors();
      services.AddMvc()
          .AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

      services.AddAuthentication(options =>
      {
        options.DefaultAuthenticateScheme = "Jwt";
        options.DefaultChallengeScheme = "Jwt";
      })
      .AddJwtBearer("Jwt", options => {
        options.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateAudience = false,
          ValidateIssuer = false,
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("The secret that needs to be at least 16 characeterslong for HmacSha256")),
          ValidateLifetime = true, //validate the expiration and not before values
          ClockSkew = TimeSpan.FromMinutes(5) //5 minute tolerance for the expiration
        };
      });
    }


    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.Use(async (context, next) => {
        await next();
        if (context.Response.StatusCode == 404 &&
        !Path.HasExtension(context.Request.Path.Value) &&
        !context.Request.Path.Value.StartsWith("/api/"))
        {
          context.Request.Path = "/index.html";
          await next();
        }
      });
      app.UseMvcWithDefaultRoute();
      app.UseDefaultFiles();
      app.UseStaticFiles();


      app.UseCors(builder =>
          builder.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials()
          );
      app.UseAuthentication();
      app.UseMvc();
    }
  }
}
