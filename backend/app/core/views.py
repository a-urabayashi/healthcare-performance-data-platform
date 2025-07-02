from rest_framework import permissions, viewsets

from .models import User


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    queryset = User.objects.all()
    serializer_class = "core.UserSerializer"  # Use the custom user serializer
    permission_classes = [permissions.IsAuthenticated]