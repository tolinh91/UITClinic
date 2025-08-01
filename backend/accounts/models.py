from django.db import models
from django.utils import timezone
from django import forms
from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model): #Thêm tính năng trong tạo tài khoản
    USER_ROLES = [
        ('BS', 'Bác sĩ'),
        ('DD', 'Điều dưỡng'),
        ('DS', 'Dược sĩ'),
        ('TT', 'Tiếp tân'),
    ]
    # Trường user (tên), role(vai trò), is_manager: phải trưởng PK
    user = models.OneToOneField(User, on_delete=models.CASCADE) 
    phone_number = models.CharField(max_length=15) # SDT
    id_number = models.CharField(max_length=20)  # Số CMND/CCCD
    university = models.CharField(max_length=255) # Trường ĐH
    major = models.CharField(max_length=255) # Chuyên ngành
    graduation_year = models.PositiveIntegerField()
    birth_date = models.DateField() # Ngày sinh
    role = models.CharField(max_length=2, choices=USER_ROLES) # Vai trò
    is_manager = models.BooleanField(default=False) 

    def __str__(self):
        return self.user.get_full_name()

class StaffInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    identity_number = models.CharField(max_length=20)  # CCCD
    university = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    graduation_year = models.IntegerField()
    birth_date = models.DateField()
    
    POSITION_CHOICES = [
        ('BS', 'Bác sĩ'),
        ('DD', 'Điều dưỡng'),
        ('DS', 'Dược sĩ'),
        ('TT', 'Tiếp tân'),
    ]
    position = models.CharField(max_length=10, choices=POSITION_CHOICES)
    
    is_manager = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.position})"
       
class MedicalSupply(models.Model):
    code = models.CharField(max_length=20) # Mã thuốc
    name = models.CharField(max_length=100) # Tên thuốc
    quantity = models.PositiveIntegerField() # Số lượng
    unit = models.CharField(max_length=20) # Đơn vị
    expiration_date = models.DateField() # Hạn sử dụng
    description = models.TextField(blank=True) # Mô tả
    supplier = models.CharField(max_length=255, blank=True) # Nhà cung cấp
    threshold = models.IntegerField(default=10)  # Ngưỡng tồn kho tối thiểu
    unit_price = models.IntegerField() # Giá
    def __str__(self):
        return f"{self.code} {self.name} ({self.quantity} {self.unit})"
    
class InventoryTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('IN', 'Nhập kho'),
        ('OUT', 'Xuất kho'),
    ]
    supply = models.ForeignKey(MedicalSupply, on_delete=models.CASCADE) #Nhà cung cấp vật tư
    transaction_type = models.CharField(max_length=3, choices=TRANSACTION_TYPES) 
    quantity = models.PositiveIntegerField()
    date = models.DateTimeField(default=timezone.now)
    note = models.TextField()
    expiry_date = models.DateField(default=timezone.now)
    def save(self, *args, **kwargs):
        if self.transaction_type == 'OUT':
            if self.quantity > self.supply.quantity:
                raise ValueError("Số lượng xuất vượt quá số tồn kho.")
            self.supply.quantity -= self.quantity
        elif self.transaction_type == 'IN':
            self.supply.quantity += self.quantity

        self.supply.save()
        super().save(*args, **kwargs)

class Patient(models.Model):
    code = models.AutoField(primary_key=True) #Mã số BN tạo tự động
    code = models.CharField(max_length=10, editable=False) #Quy tắc tạo mã số BN
    full_name = models.CharField(max_length=100) # Họ và tên BN
    id_number = models.CharField(max_length=20) #CCCD
    has_insurance = models.BooleanField(default=False) #Có BHYT không
    address = models.TextField() # Địa chỉ
    phone = models.CharField(max_length=15) # SDT
    allergy = models.TextField(blank=True, null=True) # Có dị ứng không?
    medical_history = models.TextField(blank=True, null=True) # Tiền sử Y Khoa
    current_medications = models.TextField(blank=True, null=True) # Tình trạng Y tế hiện tại (dùng thuốc)
    symptoms = models.TextField() # Triệu chứng

    # DHST
    blood_pressure_systolic = models.PositiveIntegerField() #HA tâm thu
    blood_pressure_diastolic = models.PositiveIntegerField() # HA tâm trương
    pulse = models.PositiveIntegerField() # Mạch
    spo2 = models.FloatField() # spO2
    temperature = models.FloatField() # Nhiệt độ

    old_test_results = models.TextField(blank=True, null=True) # XN cũ nếu có

    created_at = models.DateTimeField(default=timezone.now)
    def save(self, *args, **kwargs):
        if not self.code:
            last_id = Patient.objects.all().count() + 1
            self.code = f"BN{last_id:05d}"  # VD: BN00001
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.code} - {self.full_name}"

class TreatmentRecord(models.Model):
    patient = models.ForeignKey('Patient', on_delete=models.CASCADE, related_name='treatment_records')

    # Các trường điều trị
    symptoms = models.TextField()
    blood_pressure_systolic = models.PositiveIntegerField()
    blood_pressure_diastolic = models.PositiveIntegerField()
    pulse = models.PositiveIntegerField()
    spo2 = models.FloatField()
    temperature = models.FloatField()
    current_medications = models.TextField(blank=True, null=True)
    old_test_results = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Hồ sơ điều trị {self.id} - {self.patient.full_name}"    

class TestResult(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="test_results")
    test_type = models.CharField(max_length=100)
    result_value = models.FloatField(null=True, blank=True)  # Nếu là số thực
    unit = models.CharField(max_length=20, blank=True, null=True)
    
    # Các kết quả tự nhập đặc biệt
    ecg_result = models.TextField(blank=True, null=True) #ECG
    ultrasound_result = models.TextField(blank=True, null=True)# Siêu âm
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) #Giá

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.patient.code} - {self.test_type}"
    
class Prescription(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Đơn thuốc ngày {self.date_created} cho {self.patient.full_name}"

class PrescriptionDetail(models.Model):
    prescription = models.ForeignKey(Prescription, on_delete=models.CASCADE, related_name='details')
    medical_supply = models.ForeignKey(MedicalSupply, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def get_cost(self):
        return self.quantity * self.medical_supply.unit_price

class Invoice(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    consultation_fee = models.DecimalField(default=100000, max_digits=10, decimal_places=0)
    medicine_fee = models.DecimalField(default=0, max_digits=10, decimal_places=0)
    test_fee = models.DecimalField(default=0, max_digits=10, decimal_places=0)
    total_amount = models.DecimalField(default=0, max_digits=10, decimal_places=0)
    amount_paid = models.DecimalField(default=0, max_digits=10, decimal_places=0)
    
    PAYMENT_CHOICES = [
        ('cash', 'Tiền mặt'),
        ('bank', 'Chuyển khoản'),
        ('card', 'Quẹt thẻ'),
    ]
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES, default='cash')
    
    STATUS_CHOICES = [
        ('paid', 'Đã thanh toán'),
        ('unpaid', 'Chưa thanh toán'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='unpaid')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Invoice #{self.id} - {self.patient.full_name}"
    
class InvoiceForm(forms.ModelForm):
    class Meta:
        model = Invoice
        fields = ['consultation_fee', 'medicine_fee', 'test_fee',
                  'payment_method', 'status', 'amount_paid']