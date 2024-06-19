class DevelopmentConfig {
    public readonly loginUrl = "http://127.0.0.1:8000/api/login/";
    public readonly logoutUrl = "http://127.0.0.1:8000/api/logout/";
    public readonly vacationsUrl = "http://127.0.0.1:8000/api/vacations_stats/";
    public readonly totalUsersUrl = "http://127.0.0.1:8000/api/total_users/";
    public readonly totalLikesUrl = "http://127.0.0.1:8000/api/total_likes/";
    public readonly likesStatsUrl = "http://127.0.0.1:8000/api/likes_stats/";
}

class ProductionConfig {
    public readonly loginUrl = "http://34.214.98.216:8000/api/login/";
    public readonly logoutUrl = "http://34.214.98.216:8000/api/logout/";
    public readonly vacationsUrl = "http://34.214.98.216:8000/api/vacations_stats/";
    public readonly totalUsersUrl = "http://34.214.98.216:8000/api/total_users/";
    public readonly totalLikesUrl = "http://34.214.98.216:8000/api/total_likes/";
    public readonly likesStatsUrl = "http://34.214.98.216:8000/api/likes_stats/";
}

// export const appConfig = new DevelopmentConfig();

export const appConfig = new ProductionConfig(); 

