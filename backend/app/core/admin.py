from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User

class UserAdmin(BaseUserAdmin):
    """Custom User Admin"""
    
    ordering = ('email',)
    
    fieldsets = [
        (
            None,
            {
                "fields": (
                    "email",
                    "last_name",
                    "first_name",
                    "display_name",
                    "login_count",
                )
            },
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_staff",
                    "is_active",
                    "is_clinic",
                    "is_consultant",
                    "is_demo",
                    "is_superuser",
                )
            },
        ),
        (_("Important dates"), {"fields": ("last_login",)}),
    ]
    
    list_display = ('email', 'display_name', 'is_active', 'is_staff', 'is_clinic', 'is_consultant')
    

admin.site.register(User, UserAdmin)