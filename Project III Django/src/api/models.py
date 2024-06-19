from django.db import models
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from enum import Enum

# ---------------------------------------------------------
# Define role patterns similar to React

class RoleModel(Enum):
    User = 1
    Admin = 2

# ---------------------------------------------------------

# define the Country model
class Country(models.Model):
    country_id = models.AutoField(primary_key=True)
    country_name = models.CharField(max_length=50)

    # specify the name of the database table for this model
    class Meta:
        db_table = 'countries'

# serializer for the Country model
class CountrySerializer(ModelSerializer):
    class Meta:
        model = Country
        fields = "__all__"

# ------------------------------------------------------------

# define the User model
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=40)
    email = models.EmailField(max_length=40)
    password = models.CharField(max_length=30)
    role_id = models.IntegerField()

    # specify the name of the database table for this model
    class Meta:
        db_table = 'users'

# serializer for the User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'first_name', 'last_name', 'email', 'role_id']

# serializer for counting total users
class UserCountSerializer(serializers.Serializer):
    total_users = serializers.IntegerField()

# ------------------------------------------------------------

# define the Vacation model
class Vacation(models.Model):
    vacation_id = models.AutoField(primary_key=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    vacation_description = models.CharField(max_length=1000)
    start_date = models.DateField()
    end_date = models.DateField()
    price = models.IntegerField()
    vacation_photo_filename = models.CharField(max_length=100)

    # specify the name of the database table for this model
    class Meta:
        db_table = 'vacations'

# serializer for the Vacation model
class VacationSerializer(ModelSerializer):
    class Meta:
        model = Vacation
        fields = "__all__"

# serializer for vacation statistics
class VacationStatsSerializer(serializers.Serializer):
    past_vacations = serializers.IntegerField()
    on_going_vacations = serializers.IntegerField()
    future_vacations = serializers.IntegerField()

# ------------------------------------------------------------

# define the Like model
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vacation = models.ForeignKey(Vacation, on_delete=models.CASCADE)

    # specify the name of the database table for this model
    class Meta:
        db_table = 'likes'

# serializer for the Like model
class LikeSerializer(ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"

# serializer for counting total likes
class LikeCountSerializer(serializers.Serializer):
    total_likes = serializers.IntegerField()

# serializer for like statistics
class LikeStatsSerializer(serializers.Serializer):
    destination = serializers.CharField()
    likes = serializers.IntegerField()
