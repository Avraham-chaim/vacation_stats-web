from django.urls import path
from . import views

urlpatterns = [

    # POST http://localhost:8000/api/login/
    path("login/", views.log_in),
    
    # GET http://localhost:8000/api/logout/
    path("logout/", views.log_out),   

    # GET http://localhost:8000/api/vacations_stats/
    path("vacations_stats/", views.get_vacation_stats),  

    # GET http://localhost:8000/api/total_users/
    path("total_users/", views.total_users),   

    # GET http://localhost:8000/api/total_likes/
    path("total_likes/", views.total_likes),     

    # GET http://localhost:8000/api/likes_stats/
    path("likes_stats/", views.get_likes_stats),     

]