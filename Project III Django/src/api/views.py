from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.db import models
from api.models import UserSerializer, UserCountSerializer, LikeCountSerializer, LikeStatsSerializer, VacationStatsSerializer
from .models import RoleModel, User, Vacation, Like
from datetime import date
from .cyber import Cyber 



@api_view(["POST"])
def log_in(request):
    try:

        if request.method == "POST":

            # After receiving the data from the request, extract the email and password
            email = request.data.get("email")
            password = request.data.get("password")
                
            user = User.objects.get(email=email) # return obj of the user.

            if (user is None):
                return Response({"error": "Incorrect email or password."}, status=status.HTTP_401_UNAUTHORIZED)

            hash_password = Cyber.hash(password) # hashing the password for checking it.

            # check if the hash password same like in database. 
            if (user.password != hash_password): 
                return Response({"error": "Incorrect email or password."}, status=status.HTTP_401_UNAUTHORIZED)

            # check the role of the user(only admin can pass).
            if user.role_id != RoleModel.Admin.value:
                return Response({"error": "Unauthorized access."}, status=status.HTTP_403_FORBIDDEN)

            serializer = UserSerializer(user)

            request.session["is_logged-in"] = True

            # generate a jwt token to pass back to the user:
            jwt_token = Cyber.jwt_token(serializer.data)
            return Response(jwt_token, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as err:
        return Response({"error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ----------------------------------------------------------------------------------------------------------------

# get data of users count

@api_view(["GET"])
def total_users(request):
    try:

        # check if user actually logged in.
        if ("is_logged-in" in request.session) == False:
            return Response({"error": "you are not logged in."}, status=status.HTTP_401_UNAUTHORIZED)

        # retrieve the count of users using Django's ORM
        users_count = User.objects.count()

        # create a serializer instance with the count data
        serializer = UserCountSerializer({'total_users': users_count})

        # return the serialized data as a JSON response
        return Response(serializer.data)
    except Exception as err:
        # return an error response if an exception occurs
        return Response({"error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ----------------------------------------------------------------------------------------------------------------

# get data of vacation stats

@api_view(["GET"])
def get_vacation_stats(request):
    try:

        # check if user actually logged in.
        if ("is_logged-in" in request.session) == False:
            return Response({"error": "you are not logged in."}, status=status.HTTP_401_UNAUTHORIZED)

        # retrieve the counts for different types of vacations
        past_vacations = Vacation.objects.filter(
            end_date__lt=date.today()).count()
        on_going_vacations = Vacation.objects.filter(
            start_date__gte=date.today(), end_date__gt=date.today()).count()
        future_vacations = Vacation.objects.filter(
            start_date__gt=date.today()).count()

        # create a dictionary with the data
        data = {
            "past_vacations": past_vacations,
            "on_going_vacations": on_going_vacations,
            "future_vacations": future_vacations
        }

        # create a serializer instance with the data
        serializer = VacationStatsSerializer(data=data)

        # check if the serializer data is valid
        if serializer.is_valid():
            # return the serialized data as JSON
            return Response(serializer.validated_data)
        else:
            # return validation errors if any
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as err:
        # return an error response if an exception occurs
        return Response({"error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ----------------------------------------------------------------------------------------------------------------

# get data of likes count

@api_view(["GET"])
def total_likes(request):
    try:

        # check if user actually logged in.
        if ("is_logged-in" in request.session) == False:
            return Response({"error": "you are not logged in."}, status=status.HTTP_401_UNAUTHORIZED)

        # retrieve the count of likes using Django's ORM
        likes_count = Like.objects.count()

        # serialize the count data
        serializer = LikeCountSerializer({"total_likes": likes_count})

        # return the serialized data as a JSON response
        return Response(serializer.data)
    except Exception as err:
        # return an error response if an exception occurs
        return JsonResponse({"error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ----------------------------------------------------------------------------------------------------------------

# get data of likes stats
@api_view(["GET"])
def get_likes_stats(request):
    try:

        # check if user actually logged in.
        if ("is_logged-in" in request.session) == False:
            return Response({"error": "you are not logged in."}, status=status.HTTP_401_UNAUTHORIZED)

        # perform the query using Django's ORM
        likes_stats = Like.objects \
            .values('vacation__country_id__country_name') \
            .annotate(likes=models.Count('vacation_id'))

        # construct the response data
        response_data = [
            {"destination": item['vacation__country_id__country_name'],
                "likes": item['likes']}
            for item in likes_stats
        ]

        # serialize the response data
        serializer = LikeStatsSerializer(data=response_data, many=True)

        # check if the data is valid
        if serializer.is_valid():
            # Return the serialized data as JSON
            return Response(serializer.data)
        else:
            # return validation errors if any
            return Response(serializer.data)

    except Exception as err:
        # return an error response if an exception occurs
        return JsonResponse({"error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ----------------------------------------------------------------------------------------------------------------

# logout func
@api_view(["GET"])
def log_out(request):
    try:
        request.session.flush()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    except Exception as err:
        return Response({"error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
