from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
    UserManager,
)
from django.db import models


class UserManager(BaseUserManager):
    """ Manager for User model """
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("No Email provided")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    
    
class User(AbstractBaseUser, PermissionsMixin):
    """ Custom user model """

    email = models.EmailField(max_length=255, unique=True)
    display_name = models.CharField(verbose_name="display_name", max_length=255)
    first_name = models.CharField(
        verbose_name="first_name", max_length=255, null=True, blank=True
    )
    last_name = models.CharField(
        verbose_name="last_name", max_length=255, null=True, blank=True
    )
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_clinic = models.BooleanField(default=False)
    is_consultant = models.BooleanField(default=False)
    login_count = models.IntegerField(default=0)
    is_demo = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "email"

    def __str__(self) -> str:
        return self.display_name + f" ({self.email})"
        
        
        