
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
from .forms import TestResultForm
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

def register_view(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()

            # Lưu thông tin bổ sung
            profile = UserProfile.objects.create(
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
    return render(request, 'accounts/register.html', {'form': form})

'''def register_view(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            return redirect('login')
    else:
        form = RegisterForm()
    return render(request, 'accounts/register.html', {'form': form})'''

def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')  # thay bằng trang chính
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')
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
def create_patient(request):
    if request.method == 'POST':
        form = PatientForm(request.POST)
        if form.is_valid():
            patient = form.save(commit=False)
            patient.save()
            return redirect('add_treatment',patient_id=patient.id)  # hoặc redirect đến dashboard
    else:
        form = PatientForm()
    return render(request, 'patients/create_patient.html', {'form': form})

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
def patient_detail(request, patient_id):
    patient = get_object_or_404(Patient, id=patient_id)
    return render(request, 'patients/patient_detail.html', {'patient': patient})

def edit_patient(request, patient_id):
    patient = get_object_or_404(Patient, id=patient_id)
    if request.method == 'POST':
        form = PatientForm(request.POST, instance=patient)
        if form.is_valid():
            form.save()
            return redirect('patient_detail', patient_id=patient.id)  # hoặc trang cần đến 
    else:
        form = PatientForm(instance=patient)
    return render(request, 'patients/edit_patient.html', {'form': form, 'patient': patient})

from django.shortcuts import render, get_object_or_404, redirect
from .models import Patient, TestResult
from .forms import DynamicTestResultForm

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