#!/bin/sh

set -e

# python manage.py collectstatic --noinput
python manage.py wait_for_db
# python manage.py fetch_performance_data

# python manage.py migrate
# python manage.py create_alpha_agreement
# python manage.py create_init_user_models_from_dataframe
# python manage.py create_init_corpration_clinic_model
# python manage.py create_threshold_cache
# python manage.py create_init_demo_user_models
# python manage.py create_init_demo_corporation_models
# python manage.py create_init_demo_clinic_models
# python manage.py create_init_performance_model
# python manage.py delete_clinic_model_exclude_performances
# python manage.py delete_users_exclude_performances
# python manage.py create_init_performance_dataframe
# python manage.py create_init_demo_performance_models
# python manage.py create_init_demo_clinic_spreadsheets
# python manage.py create_init_reciept_computer_models

# uwsgi --socket :9000 --workers 4 --master --enable-threads --module config.wsgi