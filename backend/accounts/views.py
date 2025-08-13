from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm
from .forms import RegisterForm
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .forms import EditAccountForm
from .forms import MedicalSupplyForm
from .models import MedicalSupply
from django.contrib import messages
from django.views.decorators.http import require_POST
from django.contrib import messages
from .forms import InventoryTransactionForm
from django.db.models import F
from datetime import date, timedelta
from .models import Patient
from .forms import PatientForm
from .forms import PatientSearchForm
from .forms import TreatmentForm
#from .forms import TestResultForm
from .models import PrescriptionDetail
from .models import TestResult
from .models import Invoice
from .forms import InvoiceForm
from .models import StaffInfo
from .models import UserProfile
from .forms import EditProfileForm
from .forms import DynamicTestResultForm
from django.utils import timezone
from .test_parameters import TEST_PARAMETERS
from django.http import JsonResponse
from .models import Patient
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django import forms
from .forms import RegisterForm
from django.contrib.auth import logout
from .models import UserProfile
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import json
from django.http import JsonResponse, Http404
from accounts import views
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse, HttpResponseBadRequest
from .models import GiayKhamBenh
def home(request):
    return HttpResponse("Trang chủ")
class RegisterForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput())
    confirm_password = forms.CharField(widget=forms.PasswordInput())
    email = forms.EmailField()
    full_name = forms.CharField()
    id_number = forms.CharField()
    birth_date = forms.DateField(input_formats=["%d/%m/%Y", "%Y-%m-%d"])  # dùng ISO format
    phone_number = forms.CharField()
    gender = forms.ChoiceField(choices=[('Nam', 'Nam'), ('Nữ', 'Nữ')])
    address = forms.CharField(required=False)
    university = forms.CharField()
    major = forms.CharField()
    graduation_year = forms.IntegerField()
    role = forms.CharField()

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")
        if password and confirm_password and password != confirm_password:
            raise forms.ValidationError("Mật khẩu và xác nhận mật khẩu không khớp.")
        return cleaned_data
class ChangePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        new_password = request.data.get('new_password')

        if not new_password:
            return Response({"detail": "Mật khẩu mới không được để trống."}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        user.set_password(new_password)  # Hash mật khẩu và lưu
        user.save()

        return Response({"detail": "Đổi mật khẩu thành công."}, status=status.HTTP_200_OK)
@csrf_exempt
def register_view(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = CustomUser.objects.create_user(
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password'],
                full_name=form.cleaned_data['full_name'],
                id_number=form.cleaned_data['id_number'],
                birth_date=form.cleaned_data['birth_date'],
                phone_number=form.cleaned_data['phone_number'],
                gender=form.cleaned_data['gender'],
                address=form.cleaned_data.get('address', ''),
                university=form.cleaned_data['university'],
                major=form.cleaned_data['major'],
                graduation_year=form.cleaned_data['graduation_year'],
                role=form.cleaned_data['role'],
                is_manager=form.cleaned_data.get('is_manager', False),
                email=form.cleaned_data['email']
            )
            return JsonResponse({'success': True, 'message': 'Đăng ký thành công'})
        else:
            return JsonResponse({'success': False, 'message': 'Form không hợp lệ', 'errors': form.errors})
    else:
        form = RegisterForm()
        # Nếu bạn muốn render form ở backend, còn React bạn không cần, hoặc trả về lỗi
        return JsonResponse({'success': False, 'message': 'Phương thức không hợp lệ'})
"""def register_view(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()

            # Lưu thông tin bổ sung
            profile = CustomUser.objects.create(
                user=user,
                phone_number=form.cleaned_data['phone_number'],
                id_number=form.cleaned_data['id_number'],
                university=form.cleaned_data['university'],
                major=form.cleaned_data['major'],
                graduation_year=form.cleaned_data['graduation_year'],
                birth_date=form.cleaned_data['birth_date'],
                role=form.cleaned_data['role'],
                is_manager=form.cleaned_data['is_manager']
            )
            return redirect('login')
    else:
        form = RegisterForm()
    #return render(request, 'accounts/register.html', {'form': form})
    #Trả về có giống với React
    return JsonResponse({'success': False, 'message': 'Form không hợp lệ', 'errors': form.errors}) """
from rest_framework_simplejwt.tokens import RefreshToken #Trả về JSON
@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
        except:
            return JsonResponse({"detail": "Invalid JSON"}, status=400)

        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            })
        else:
            return JsonResponse({"detail": "Tên đăng nhập hoặc mật khẩu sai"}, status=401)

    return JsonResponse({"detail": "Phương thức không được hỗ trợ"}, status=405)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    try:
        profile = user.userprofile  # truy cập liên kết 1-1 qua related_name mặc định
    except UserProfile.DoesNotExist:
        profile = None

    data = {
        'full_name': user.full_name,
        'id_number': user.id_number,
        'birth_date': user.birth_date.isoformat() if user.birth_date else None,
        'phone_number': user.phone_number,
        'gender': user.gender,
        'address': user.address,
        'university': user.university,
        'major': user.major,
        'graduation_year': user.graduation_year,
        'is_manager': user.is_manager,
        'role': user.role,
    }

    # Nếu muốn lấy dữ liệu từ profile (nếu khác dữ liệu user)
    if profile:
        data.update({
            'phone_number': profile.phone_number or data['phone_number'],
            'id_number': profile.id_number or data['id_number'],
            'university': profile.university or data['university'],
            'major': profile.major or data['major'],
            'graduation_year': profile.graduation_year or data['graduation_year'],
            'birth_date': profile.birth_date.isoformat() if profile.birth_date else data['birth_date'],
            'role': profile.role or data['role'],
            'is_manager': profile.is_manager if profile.is_manager is not None else data['is_manager'],
        })

    return Response(data)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    data = request.data

    user.full_name = data.get('full_name', user.full_name)
    user.id_number = data.get('id_number', user.id_number)
    user.birth_date = data.get('birth_date', user.birth_date)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.gender = data.get('gender', user.gender)
    user.university = data.get('university', user.university)
    user.major = data.get('major', user.major)
    user.graduation_year = data.get('graduation_year', user.graduation_year)
    user.position = data.get('position', user.position)
    user.is_manager = data.get('is_manager', user.is_manager)

    user.save()

    return JsonResponse({
        "message": "Thông tin đã được cập nhật thành công",
        "user": {
            "username": user.username,
            "full_name": user.full_name,
            "id_number": user.id_number,
            "birth_date": user.birth_date,
            "phone_number": user.phone_number,
            "gender": user.gender,
            "university": user.university,
            "major": user.major,
            "graduation_year": user.graduation_year,
            "position": user.position,
            "is_manager": user.is_manager
        }
    })
def logout_view(request):
    request.user.auth_token.delete()  # xóa token khỏi server
    return Response({"success": "Logged out"})
@login_required
def delete_account(request):
    if request.method == 'POST':
        user = request.user
        user.delete()
        messages.success(request, 'Tài khoản đã được xóa thành công.')
        return redirect('login')  # hoặc trang chủ
    return redirect('home')  # không cho truy cập GET
'''@login_required
def edit_account(request):
    if request.method == 'POST':
        form = EditAccountForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('profile')  # Hoặc bất kỳ URL nào sau khi cập nhật
    else:
        form = EditAccountForm(instance=request.user)

    return render(request, 'accounts/edit_account.html', {'form': form})'''
@login_required
def edit_account(request):
    user = request.user
    try:
        profile = user.userprofile
    except UserProfile.DoesNotExist:
        profile = UserProfile(user=user)

    if request.method == 'POST':
        user_form = EditAccountForm(request.POST, instance=user)
        profile_form = EditProfileForm(request.POST, instance=profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            return redirect('profile')
    else:
        user_form = EditAccountForm(instance=user)
        profile_form = EditProfileForm(instance=profile)

    return render(request, 'accounts/edit_account.html', {
        'form': user_form,
        'profile_form': profile_form
    })
@login_required
def profile(request):
    try:
        staff_info = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        staff_info = None
    return render(request, 'accounts/profile.html', {
        'user': request.user,
        'staff_info': staff_info
    })
    
'''@login_required # Dẫn vào profile
def profile(request):
    return render(request, 'accounts/profile.html')'''

@login_required
def add_medical_supply(request): #Thêm vật tư y tế
    if request.method == 'POST':
        form = MedicalSupplyForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('medical_supply_list')  
    else:
        form = MedicalSupplyForm()
    return render(request, 'supplies/add_supply.html', {'form': form})
@login_required
def medical_supply_list(request): #Hiển thị danh sách vật tư y tế
    supplies = MedicalSupply.objects.all()
    return render(request, 'supplies/supply_list.html', {'supplies': supplies})
@login_required
def edit_medical_supply(request, supply_id): #Sữa vật tư.
    supply = get_object_or_404(MedicalSupply, id=supply_id)
    if request.method == 'POST':
        form = MedicalSupplyForm(request.POST, instance=supply)
        if form.is_valid():
            form.save()
            return redirect('medical_supply_list')  # quay lại danh sách
    else:
        form = MedicalSupplyForm(instance=supply)

    return render(request, 'supplies/edit_supply.html', {'form': form, 'supply': supply})
@login_required
def delete_medical_supply(request, supply_id):
    supply = get_object_or_404(MedicalSupply, id=supply_id)
    if request.method == 'POST':
        supply.delete()
        return redirect('medical_supply_list')  # Trang danh sách sau khi xóa
    return render(request, 'supplies/confirm_delete.html', {'supply': supply})

def inventory_transaction_view(request):
    form = InventoryTransactionForm()
    if request.method == 'POST':
        form = InventoryTransactionForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                messages.success(request, "Giao dịch kho thành công.")
                return redirect('inventory_transaction')
            except ValueError as e:
                messages.error(request, str(e))

    return render(request, 'inventory/transaction_form.html', {'form': form})

def get_low_stock_supplies(): # Hàm cảnh báo tồn kho
    return MedicalSupply.objects.filter(quantity__lt= F('threshold'))

def get_expiring_supplies():
    today = date.today()
    six_months_later = today + timedelta(days=180)
    return MedicalSupply.objects.filter(expiration_date__isnull=False, expiration_date__lte=six_months_later)

def inventory_dashboard(request):
    low_stock_items = MedicalSupply.objects.filter(quantity__lt=F('threshold'))

    today = date.today()
    six_months_later = today + timedelta(days=180)

    expiring_items = MedicalSupply.objects.filter(
        expiration_date__isnull=False,
        expiration_date__lte=six_months_later
    )

    return render(request, 'inventory/dashboard.html', {
        'low_stock_items': low_stock_items,
        'expiring_items': expiring_items,
    })
'''def create_patient(request):
    if request.method == 'POST':
        form = PatientForm(request.POST)
        if form.is_valid():
            patient = form.save(commit=False)
            patient.save()
            return redirect('add_treatment',patient_id=patient.id)  # hoặc redirect đến dashboard
    else:
        form = PatientForm()
    return render(request, 'patients/create_patient.html', {'form': form})'''


@csrf_exempt
def create_patient(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Tạo bệnh nhân trước, chưa có code
            patient = Patient.objects.create(
                full_name=data.get("full_name", ""),
                id_number=data.get("id_number", ""),
                has_insurance=data.get("has_insurance", False),
                address=data.get("address", ""),
                phone=data.get("phone", ""),
                allergy=data.get("allergy", ""),
                medical_history=data.get("medical_history", ""),
                current_medications=data.get("current_medications", ""),
                symptoms=data.get("symptoms", ""),
                blood_pressure_systolic=data.get("blood_pressure_systolic", 0),
                blood_pressure_diastolic=data.get("blood_pressure_diastolic", 0),
                pulse=data.get("pulse", 0),
                spo2=data.get("spo2", 0),
                temperature=data.get("temperature", 0),
                old_test_results=data.get("old_test_results", ""),
            )

            # Gán mã bệnh nhân = id
            patient.code = str(patient.id)
            #patient.code = f"BN{patient.id:06d}"
            patient.save()

            return JsonResponse({"success": True, "patient_id": patient.id})

        except Exception as e:
            return JsonResponse({"success": False, "errors": str(e)}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)
def patient_list(request):
    patients = Patient.objects.all().order_by('-created_at')
    data = []
    for p in patients:
        data.append({
            "id": p.id,  # Thêm ID để frontend dùng
            "code": p.code,
            "full_name": p.full_name,
            "id_number": p.id_number,
            "has_insurance": p.has_insurance,
            "address": p.address,
            "phone": p.phone,
            "allergy": p.allergy,
            "medical_history": p.medical_history,
            "current_medications": p.current_medications,
            "symptoms": p.symptoms,
            "blood_pressure_systolic": p.blood_pressure_systolic,
            "blood_pressure_diastolic": p.blood_pressure_diastolic,
            "pulse": p.pulse,
            "spo2": p.spo2,
            "temperature": p.temperature,
            "old_test_results": p.old_test_results,
            "created_at": p.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        })
    return JsonResponse(data, safe=False)
def search_patient(request):
    form = PatientSearchForm(request.GET or None)
    results = None
    if form.is_valid():
        full_name = form.cleaned_data.get('full_name')
        id_card = form.cleaned_data.get('id_card')
        has_insurance = form.cleaned_data.get('has_insurance')

        query = Patient.objects.all()
        if full_name:
            query = query.filter(full_name__icontains=full_name)
        if id_card:
            query = query.filter(id_card__icontains=id_card)
        if has_insurance == 'yes':
            query = query.filter(has_insurance=True)
        elif has_insurance == 'no':
            query = query.filter(has_insurance=False)

        results = query

    return render(request, 'patients/search_patient.html', {
        'form': form,
        'results': results
    })
def add_treatment(request, patient_id):
    patient = get_object_or_404(Patient, pk=patient_id)

    if request.method == 'POST':
        form = TreatmentForm(request.POST)
        if form.is_valid():
            treatment = form.save(commit=False)
            treatment.patient = patient
            treatment.save()
            return redirect('patient_detail', patient_id=patient.id)
    else:
        form = TreatmentForm()

    return render(request, 'patients/add_treatment.html', {
        'form': form,
        'patient': patient
    })

from django.http import JsonResponse
from .models import Patient

def patient_detail(request, pk):
    try:
        p = Patient.objects.get(pk=pk)
        data = {
            "id": p.id,  # ID để frontend dùng
            "code": p.code,
            "full_name": p.full_name,
            "id_number": p.id_number,
            "has_insurance": p.has_insurance,
            "address": p.address,
            "phone": p.phone,
            "allergy": p.allergy,
            "medical_history": p.medical_history,
            "current_medications": p.current_medications,
            "symptoms": p.symptoms,
            "blood_pressure_systolic": p.blood_pressure_systolic,
            "blood_pressure_diastolic": p.blood_pressure_diastolic,
            "pulse": p.pulse,
            "spo2": p.spo2,
            "temperature": p.temperature,
            "old_test_results": p.old_test_results,
            "created_at": p.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
        return JsonResponse(data)
    except Patient.DoesNotExist:
        return JsonResponse({})
@csrf_exempt  # dùng nếu không bật CSRF protection cho PUT
def patient_update(request, pk):
    if request.method == "PUT":
        try:
            patient = Patient.objects.get(pk=pk)
            data = json.loads(request.body)

            patient.code = data.get("code", patient.code)
            patient.full_name = data.get("full_name", patient.full_name)
            patient.id_number = data.get("id_number", patient.id_number)
            patient.has_insurance = data.get("has_insurance", patient.has_insurance)
            patient.address = data.get("address", patient.address)
            patient.phone = data.get("phone", patient.phone)
            patient.allergy = data.get("allergy", patient.allergy)
            patient.medical_history = data.get("medical_history", patient.medical_history)
            patient.current_medications = data.get("current_medications", patient.current_medications)
            patient.symptoms = data.get("symptoms", patient.symptoms)
            patient.blood_pressure_systolic = data.get("blood_pressure_systolic", patient.blood_pressure_systolic)
            patient.blood_pressure_diastolic = data.get("blood_pressure_diastolic", patient.blood_pressure_diastolic)
            patient.pulse = data.get("pulse", patient.pulse)
            patient.spo2 = data.get("spo2", patient.spo2)
            patient.temperature = data.get("temperature", patient.temperature)
            patient.old_test_results = data.get("old_test_results", patient.old_test_results)

            patient.save()
            return JsonResponse({"message": "Cập nhật bệnh nhân thành công"})
        except Patient.DoesNotExist:
            return JsonResponse({"error": "Không tìm thấy bệnh nhân"}, status=404)
    else:
        return JsonResponse({"error": "Phương thức không được hỗ trợ"}, status=405)
# GIẤY KHÁM BỆNH
@csrf_exempt
def giay_kham_benh_list_create(request):
    if request.method == "GET":
        gkbs = GiayKhamBenh.objects.all().order_by('-ngayTao')
        data = [model_to_dict(gkb) for gkb in gkbs]
        return JsonResponse(data, safe=False)

    elif request.method == "POST":
        try:
            body = json.loads(request.body)
            # validate required fields
            required_fields = ['tieuDe', 'tenBenhNhan', 'phongKham', 'gia', 'bacSi']
            for field in required_fields:
                if field not in body or not body[field]:
                    return HttpResponseBadRequest(f"Missing field: {field}")

            gkb = GiayKhamBenh.objects.create(
                tieuDe=body['tieuDe'],
                tenBenhNhan=body['tenBenhNhan'],
                theBHYT=body.get('theBHYT', False),
                phongKham=body['phongKham'],
                gia=body['gia'],
                bacSi=body['bacSi'],
                ghiChu=body.get('ghiChu', '')
            )
            return JsonResponse(model_to_dict(gkb), status=201)
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON")
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
def giay_kham_benh_list(request):
    gkb_list = GiayKhamBenh.objects.select_related('patient').order_by('-date')
    data = []
    for gkb in gkb_list:
        data.append({
            "id": gkb.id,
            "code": gkb.code,
            "patient": gkb.patient.full_name,  # lấy tên bệnh nhân
            "title": gkb.title,
            "room": gkb.room,
            "doctor": gkb.doctor,
            "date": gkb.date.strftime("%Y-%m-%d"),
            "status": gkb.status,
        })
    return JsonResponse(data, safe=False)
#Các trường của GKB
from .models import Appointment
from datetime import timedelta
import random
@csrf_exempt
def appointment_list(request):
    rooms = ["Phòng 101", "Phòng 102", "Phòng 201", "Phòng 202"]
    doctors = ["BS. Nguyễn Văn A", "BS. Trần Thị B", "BS. Lê Văn C"]
    statuses = ["Chưa khám", "Đang khám", "Đã khám"]

    patients = Patient.objects.all().order_by('-created_at')
    data = []

    for p in patients:
        start_time = p.created_at.replace(hour=random.randint(7, 15), minute=0)
        end_time = start_time + timedelta(minutes=random.choice([15, 30, 45]))

        data.append({
            "patient": p.full_name,
            "title": "Khám tổng quát",
            "room": random.choice(rooms),
            "doctor": random.choice(doctors),
            "status": random.choice(statuses),
            "start_time": start_time.strftime("%Y-%m-%d %H:%M"),
            "end_time": end_time.strftime("%Y-%m-%d %H:%M"),
            "description": "Khám sức khỏe định kỳ cho bệnh nhân."
        })
    
    return JsonResponse(data, safe=False)
#xem giấy KB
from .serializers import GiayKhamBenhSerializer
@api_view(['GET'])
def giay_kham_benh_detail(request, pk):
    try:
        gkb = GiayKhamBenh.objects.get(pk=pk)
    except GiayKhamBenh.DoesNotExist:
        return Response({"error": "Không tìm thấy giấy khám bệnh"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = GiayKhamBenhSerializer(gkb)
    return Response(serializer.data, status=status.HTTP_200_OK)
from django.shortcuts import render, get_object_or_404, redirect
from .models import Patient, TestResult
from .forms import DynamicTestResultForm
#---ĐƠN THUỐC ---
from .models import using_Prescription
from .serializers import PrescriptionSerializer
@api_view(['GET', 'POST'])
def using_prescription_list(request):
    if request.method == 'GET':
        prescriptions = using_Prescription.objects.all()
        serializer = PrescriptionSerializer(prescriptions, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = PrescriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import generics
from .models import using_Prescription
from .serializers import PrescriptionSerializer

class PrescriptionDetailView(generics.RetrieveAPIView):
    queryset = using_Prescription.objects.all()
    serializer_class = PrescriptionSerializer


GIÁ_ECG = 200000
GIÁ_SIÊU_ÂM = 300000
TEST_TYPE_PRICE = {
    "Công thức máu:": 90000,
    "Sinh hóa máu:": 200000,
    "Tổng phân tích nước tiểu:": 100000,
    "ECG:": 200000,
    "Siêu âm:": 300000,
}
def add_test_result(request, patient_id):
    patient = get_object_or_404(Patient, id=patient_id)
    selected_type = request.POST.get("test_type") or request.GET.get("test_type")
    
    form = DynamicTestResultForm(request.POST or None, test_type=selected_type)

    if request.method == "POST" and form.is_valid():
        test_type = form.cleaned_data["test_type"]

        if test_type in ["ECG:", "Siêu âm:"]:
            result_text = form.cleaned_data["result_text"]
            TestResult.objects.create(
                patient=patient,
                test_type=test_type,
                ecg_result=result_text if test_type == "ECG:" else None,
                ultrasound_result=result_text if test_type == "Siêu âm:" else None,
                price=GIÁ_ECG if test_type == "ECG:" else GIÁ_SIÊU_ÂM,
                created_at=timezone.now()
            )
        elif selected_type in TEST_PARAMETERS:
            parameters = TEST_PARAMETERS[selected_type]
            for param_name, unit in parameters:
                result_value = form.cleaned_data.get(param_name)
                if result_value:  # chỉ lưu nếu có kết quả nhập
                    TestResult.objects.create(
                    patient=patient,
                    test_type=selected_type,
                    result_value=result_value,
                    unit=unit,
                    price= TEST_TYPE_PRICE.get(selected_type, 0),
                    created_at=timezone.now()
            )
        else:
            results = []
            for idx, (param, unit) in enumerate(TEST_PARAMETERS[test_type]):
                value = form.cleaned_data.get(f"param_{idx}")
                results.append(f"{param} {value} {unit}")

            TestResult.objects.create(
                patient=patient,
                test_type=test_type,
                result_value="\n".join(results),
                price=150_000,  # hoặc cấu hình theo loại
                created_at=timezone.now()
            )

        return redirect("view_test_results", patient_id=patient.id)

    return render(request, "Tests/add_test_result.html", {
        "form": form,
        "patient": patient
    })

    
'''def add_test_result(request, patient_id):
    patient = get_object_or_404(Patient, id=patient_id)
    if request.method == 'POST':
        form = TestResultForm(request.POST)
        if form.is_valid():
            test_result = form.save(commit=False)
            test_result.patient = patient
            test_result.save()
            return redirect('view_test_results', patient_id=patient.id)
    else:
        form = TestResultForm()
    return render(request, 'Tests/add_test_result.html', {'form': form, 'patient': patient})'''
def view_test_results(request, patient_id):
    patient = get_object_or_404(Patient, pk=patient_id)
    test_results = TestResult.objects.filter(patient=patient).order_by('-created_at')
    return render(request, 'Tests/view_test_results.html', {
        'patient': patient,
        'test_results': test_results,
    })
'''def view_test_results(request, patient_id):
    patient = get_object_or_404(Patient, id=patient_id)
    test_results = patient.test_results.all()
    test_results = TestResult.objects.filter(patient_id=patient_id)
    return render(request, 'Tests/view_test_results.html', {'patient': patient, 'test_results': test_results})'''

def print_test_results(request, patient_id):
    patient = get_object_or_404(Patient, id=patient_id)
    test_results = patient.test_results.all()
    return render(request, 'Tests/print_test_results.html', {'patient': patient, 'test_results': test_results})

def calculate_fees(patient):
    test_fee = sum(result.price for result in TestResult.objects.filter(patient=patient))
    medication_fee = 0
    prescriptions = PrescriptionDetail.objects.filter(prescription__patient=patient)
    for pres in prescriptions:
        medication_fee += pres.medical_supply.unit_price * pres.quantity

    return {
        'consultation_fee': 100000,
        'test_fee': test_fee,
        'medication_fee': medication_fee,
        'total': 100000 + test_fee + medication_fee,
    }

def create_invoice(request, patient_id):
    patient = get_object_or_404(Patient, pk=patient_id)

    # Tính tiền thuốc và xét nghiệm
    prescriptions = PrescriptionDetail.objects.filter(prescription__patient=patient)
    medicine_total = sum(p.quantity * p.medicine.price for p in prescriptions)

    tests = TestResult.objects.filter(patient=patient)
    test_total = sum(t.test_type.price for t in tests if t.test_type and t.test_type.price)

    consultation_fee = 100000
    total_amount = consultation_fee + medicine_total + test_total

    if request.method == 'POST':
        payment_method = request.POST.get('payment_method')
        status = request.POST.get('status')
        amount_paid = request.POST.get('amount_paid')

        Invoice.objects.create(
            patient=patient,
            consultation_fee=consultation_fee,
            medicine_fee=medicine_total,
            test_fee=test_total,
            total_amount=total_amount,
            amount_paid=amount_paid,
            payment_method=payment_method,
            status=status
        )

        return redirect('invoice_list')

    context = {
        'patient': patient,
        'medicine_total': medicine_total,
        'test_total': test_total,
        'total_amount': total_amount,
    }
    return render(request, 'accounts/create_invoice.html', context)

def invoice_list(request):
    invoices = Invoice.objects.select_related('patient').all().order_by('-created_at')
    return render(request, 'accounts/invoice_list.html', {'invoices': invoices})

def print_invoice(request, invoice_id):
    invoice = get_object_or_404(Invoice, pk=invoice_id)
    return render(request, 'accounts/invoice_detail.html', {'invoice': invoice})

def edit_invoice(request, invoice_id):
    invoice = get_object_or_404(Invoice, id=invoice_id)

    if request.method == 'POST':
        form = InvoiceForm(request.POST, instance=invoice)
        if form.is_valid():
            form.save()
            return redirect('invoice_detail', invoice_id=invoice.id)
    else:
        form = InvoiceForm(instance=invoice)

    return render(request, 'accounts/edit_invoice.html', {
        'form': form,
        'invoice': invoice,
    })

def print_invoice(request, invoice_id):
    invoice = get_object_or_404(Invoice, id=invoice_id)
    return render(request, 'accounts/print_invoice.html', {'invoice': invoice})

from django.http import JsonResponse
from .models import Patient

def get_patients(request):
    data = list(Patient.objects.values())
    return JsonResponse(data, safe=False)
'''--API--'''
def patient_list(request):
    patients = Patient.objects.all()
    data = [model_to_dict(p) for p in patients]
    return JsonResponse(data, safe=False)

from django.http import JsonResponse

def get_accounts(request):
    data = [
        {"id": 1, "name": "Nguyễn Văn A"},
        {"id": 2, "name": "Trần Thị B"},
    ]
    return JsonResponse(data, safe=False)
#Login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
@api_view(['POST']) 
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(username=email, password=password)

    if user is not None:
        return Response({'success': True, 'message': 'Đăng nhập thành công'})
    else:
        return Response({'success': False, 'message': 'Sai tài khoản hoặc mật khẩu'}, status=401)
#Resigter
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
import traceback
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import UserProfile
from accounts.models import CustomUser
@api_view(['POST'])
def register_view(request):
    form = RegisterForm(data=request.data)
    if form.is_valid():
        data = form.cleaned_data
        user = CustomUser.objects.create_user(
            username=data["username"],
            email=data["email"],
            password=data["password"],
            full_name=data["full_name"],
            id_number=data["id_number"],
            birth_date=data["birth_date"],
            phone_number=data["phone_number"],
            gender=data["gender"],
            address=data.get("address", ""),
            university=data["university"],
            major=data["major"],
            graduation_year=data["graduation_year"],
            role=data["role"],  # 👈 xử lý role ở đây
        )
        return Response({'success': True, 'message': 'Đăng ký thành công'})
    else:
        return Response({'success': False, 'message': 'Form không hợp lệ', 'errors': form.errors})
'''-- Lấy dữ liệu từ backend ra SQL'''
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from accounts.models import LoginLog  # Bảng log bạn tạo
import json
from accounts.models import LoginLog
@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        try:
            user = User.objects.get(email=email)
            user_auth = authenticate(username=user.username, password=password)

            if user_auth:
                #Ghi lại login vào bảng MySQL (XAMPP)
                LoginLog.objects.create(
                    user=user,
                    status='success'
                )
                return JsonResponse({'status': 'success', 'message': 'Đăng nhập thành công'})

            else:
                LoginLog.objects.create(
                    user=user,
                    status='fail'
                )
                return JsonResponse({'status': 'fail', 'message': 'Sai mật khẩu'}, status=401)

        except User.DoesNotExist:
            return JsonResponse({'status': 'fail', 'message': 'Email không tồn tại'}, status=404)

    return JsonResponse({'message': 'Phải dùng POST'}, status=400)

# --- Xuất ORM ---