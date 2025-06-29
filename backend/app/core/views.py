from django.shortcuts import render
from rest_framework import permissions, viewsets
from .models import User
from drf_spectacular.utils import (OpenApiParameter, OpenApiTypes,
                                   extend_schema, extend_schema_view)

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    queryset = User.objects.all()
    serializer_class = "core.UserSerializer"  # Use the custom user serializer
    permission_classes = [permissions.IsAuthenticated]