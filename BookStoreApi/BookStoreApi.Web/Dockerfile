# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["BookStoreApi.Web/BookStoreApi.Web.csproj", "BookStoreApi.Web/"]
RUN dotnet restore "BookStoreApi.Web/BookStoreApi.Web.csproj"
COPY . .
WORKDIR "/src/BookStoreApi.Web"
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Run
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "BookStoreApi.Web.dll"]
