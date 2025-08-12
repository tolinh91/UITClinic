from rest_framework import serializers
from .models import GiayKhamBenh

class GiayKhamBenhSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiayKhamBenh
        fields = '__all__'