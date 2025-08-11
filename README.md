# UITClinic


# Running backend server

## Install requirement packages
```bash
pip install django pymysql django-cors-headers djangorestframework djangorestframework-simplejwt
```

## Input database information 

Modify the file backend/web/settings.py to input database information
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        #'NAME': BASE_DIR / 'db.sqlite3',
        'NAME': 'qlkh',   # Input this
        'USER': 'root', # Input this 
        'PASSWORD': 'root', # Input this
        'HOST': '127.0.0.1',    # 
        'PORT': '3306', # Input this         
         'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}

```

## Run the backend 

```bash
python manage.py runserver
```

After running this command the backend will be served at http://127.0.0.1:8000/  by default
