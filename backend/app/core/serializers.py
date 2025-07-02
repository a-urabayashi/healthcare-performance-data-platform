from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = "core.User"  # Use the custom user model defined in settings
        fields = ("id", "username", "email", "first_name", "last_name")
        read_only_fields = ("id",)