from django import forms
from django.forms import Textarea
from django.contrib.auth.models import User
import re
from .models import MedicalSupply
from .models import InventoryTransaction
from .models import Patient
from .models import TreatmentRecord
from .models import TestResult
from .models import Invoice
from .models import UserProfile
from .test_parameters import TEST_PARAMETERS

class RegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, min_length=8, label="Mật khẩu")
    confirm_password = forms.CharField(widget=forms.PasswordInput, label="Xác nhận mật khẩu")
    
    # Thêm các trường bổ sung
    phone_number = forms.CharField(label="Số điện thoại")
    id_number = forms.CharField(label="CMND/CCCD")
    university = forms.CharField(label="Trường đại học")
    major = forms.CharField(label="Chuyên ngành")
    graduation_year = forms.IntegerField(label="Năm tốt nghiệp")
    birth_date = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}), label="Ngày sinh")
    role = forms.ChoiceField(choices=UserProfile.USER_ROLES, label="Vị trí làm việc")
    is_manager = forms.BooleanField(required=False, label="Là trưởng phòng khám")

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'password','email']

    def clean_username(self):
        username = self.cleaned_data['username']
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError("Tên người dùng đã tồn tại.")
        return username

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Email đã được sử dụng.")
        return email

    def clean_password(self):
        password = self.cleaned_data['password']
        if not re.search(r'[A-Z]', password) or not re.search(r'\d', password):
            raise forms.ValidationError("Mật khẩu phải có ít nhất 1 chữ hoa và 1 số.")
        return password

    def clean(self):
        cleaned_data = super().clean()
        if cleaned_data.get("Mật khẩu") != cleaned_data.get("Xác nhận mật khẩu"):
            raise forms.ValidationError("Mật khẩu xác nhận không khớp.")
        return cleaned_data
    '''def clean(self):
        cleaned_data = super().clean()
        if cleaned_data.get("password") != cleaned_data.get("confirm_password"):
            self.add_error('confirm_password', "Mật khẩu xác nhận không khớp.")
        return cleaned_data '''
class EditAccountForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']  # Trường để sữa thông tin
        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
        }
class EditProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['phone_number', 'id_number', 'university', 'major', 'graduation_year', 'birth_date', 'role', 'is_manager']
        widgets = {
            'phone_number': forms.TextInput(attrs={'class': 'form-control'}),
            'id_number': forms.TextInput(attrs={'class': 'form-control'}),
            'university': forms.TextInput(attrs={'class': 'form-control'}),
            'major': forms.TextInput(attrs={'class': 'form-control'}),
            'graduation_year': forms.NumberInput(attrs={'class': 'form-control'}),
            'birth_date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'role': forms.Select(attrs={'class': 'form-control'}),
            'is_manager': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }
class MedicalSupplyForm(forms.ModelForm):
    class Meta:
        model = MedicalSupply
        fields = ['code', 'name', 'quantity', 'unit', 'expiration_date', 'description', 'supplier', 'threshold', 'unit_price']
        widgets = {
            'code': forms.TextInput(attrs={'class': 'form-control'}),
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'quantity': forms.NumberInput(attrs={'class': 'form-control'}),
            'unit': forms.TextInput(attrs={'class': 'form-control'}),
            'expiration_date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 2}),
            'supplier': forms.TextInput(attrs={'class': 'form-control'}),
            'threshold': forms.NumberInput(attrs={'class': 'form-control'}),
            'unit_price': forms.NumberInput(attrs={'class': 'form-control'}),
        }
class InventoryTransactionForm(forms.ModelForm):
    class Meta:
        model = InventoryTransaction
        fields = ['supply', 'transaction_type', 'quantity', 'note']
        widgets = {
            'expiration_date': forms.DateInput(attrs={'type': 'date'}),
        }

class PatientForm(forms.ModelForm):
    class Meta:
        model = Patient
        exclude = ['code', 'created_at']
        widgets = {
            'symptoms': forms.Textarea(attrs={'rows': 3}),
            'allergy': forms.Textarea(attrs={'rows': 2}),
            'medical_history': forms.Textarea(attrs={'rows': 2}),
            'current_medications': forms.Textarea(attrs={'rows': 2}),
            'old_test_results': forms.Textarea(attrs={'rows': 2}),
        }
        
class PatientSearchForm(forms.Form):
    full_name = forms.CharField(label="Họ tên", required=False)
    id_card = forms.CharField(label="Số CMND", required=False)
    has_insurance = forms.ChoiceField(
        label="Có bảo hiểm?", choices=[('', '---'), ('yes', 'Có'), ('no', 'Không')],
        required=False
    )

class TreatmentForm(forms.ModelForm):
    class Meta:
        model = TreatmentRecord
        fields = [
            'symptoms', 'blood_pressure_systolic', 'blood_pressure_diastolic',
            'pulse', 'spo2', 'temperature',
            'current_medications', 'old_test_results'
        ]
class PatientForm(forms.ModelForm):
    class Meta:
        model = Patient
        exclude = ['code', 'created_at']  # không chỉnh sửa mã

class TestResultForm(forms.ModelForm):
    class Meta:
        model = TestResult
        fields = ['test_type', 'result_value', 'unit', 'ecg_result', 'ultrasound_result', 'price']

    def clean(self):
        cleaned_data = super().clean()
        test_type = self.data.get('test_type') or self.initial.get('test_type')
        # Nếu test_type là 'Đường huyết', thì phải có result_value và đơn vị
        if test_type == 'Đường huyết mao mạch':
            if cleaned_data.get('result_value') is None or not cleaned_data.get('unit'):
                raise forms.ValidationError("Phải nhập kết quả và đơn vị cho đường huyết.")

        # Nếu là ECG hoặc siêu âm thì phải có nội dung nhập tay
        
        if test_type == 'ECG':
            # Ẩn tất cả trừ ecg_result
            self.fields['ecg_result'].required = True
            self.fields['result_value'].widget = forms.HiddenInput()
            self.fields['unit'].widget = forms.HiddenInput()
            self.fields['ultrasound_result'].widget = forms.HiddenInput()
        elif test_type == 'Siêu âm':
            self.fields['ultrasound_result'].required = True
            self.fields['result_value'].widget = forms.HiddenInput()
            self.fields['unit'].widget = forms.HiddenInput()
            self.fields['ecg_result'].widget = forms.HiddenInput()
        else:
            # Mặc định: xét nghiệm thông thường
            # Hiển thị lại kết quả và đơn vị cho các loại xét nghiệm khác
            self.fields['result_value'].required = True
            self.fields['unit'].required = True
            self.fields['ecg_result'].widget = forms.HiddenInput()
            self.fields['ultrasound_result'].widget = forms.HiddenInput()
        #if selected_type == 'ECG':
            #result = form.cleaned_data.get('ecg_result')
        # Lưu riêng ecg_result vào TestResult

        #elif selected_type == 'Siêu âm':
            #result = form.cleaned_data.get('ultrasound_result')
    # Lưu riêng ultrasound_result
        '''if test_type == 'ECG' and not cleaned_data.get('ecg_result'):
            raise forms.ValidationError("Phải nhập kết quả ECG.")
        if test_type == 'Siêu âm' and not cleaned_data.get('ultrasound_result'):
            raise forms.ValidationError("Phải nhập kết quả siêu âm.")'''

        return cleaned_data
class DynamicTestResultForm(forms.Form):
    test_type = forms.ChoiceField(
        choices=[(key, key) for key in TEST_PARAMETERS.keys()],
        label="Loại xét nghiệm"
    )

    def __init__(self, *args, **kwargs):
        test_type = kwargs.pop("test_type", None)
        super().__init__(*args, **kwargs)

        if test_type:
            self.fields["test_type"].initial = test_type
            if test_type in ["ECG:", "Siêu âm:"]:
                self.fields["result_text"] = forms.CharField(
                    label="Kết quả", widget=Textarea, required=True
                )
            else:
                for idx, (param, unit) in enumerate(TEST_PARAMETERS[test_type]):
                    field_name = f"param_{idx}"
                    self.fields[field_name] = forms.CharField(
                        label=f"{param} ({unit})", required=True
                    )
                
class InvoiceForm(forms.ModelForm):
    class Meta:
        model = Invoice
        fields = '__all__'
