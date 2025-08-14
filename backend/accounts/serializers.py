from rest_framework import serializers
from .models import GiayKhamBenh
from .models import using_Prescription
from .models import PrescriptionMedicine
from rest_framework import generics
from .models import DrugSupply

class GiayKhamBenhSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiayKhamBenh
        fields = '__all__'
class PrescriptionSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)

    class Meta:
        model = using_Prescription
        fields = ['id', 'patient_name', 'doctor', 'total', 'status', 'created_at']

class PrescriptionMedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrescriptionMedicine
        fields = ['medicine', 'quantity', 'usage']

class PrescriptionSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    medicines = PrescriptionMedicineSerializer(many=True)

    class Meta:
        model = using_Prescription
        fields = ['id', 'patient_name', 'doctor', 'total', 'status', 'created_at', 'medicines']

    def create(self, validated_data):
        medicines_data = validated_data.pop('medicines')
        prescription = using_Prescription.objects.create(**validated_data)
        for med_data in medicines_data:
            PrescriptionMedicine.objects.create(prescription=prescription, **med_data)
        return prescription
class PrescriptionDetailView(generics.RetrieveAPIView):
    queryset = using_Prescription.objects.all()
    serializer_class = PrescriptionSerializer

class DrugSupplySerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugSupply
        fields = '__all__'