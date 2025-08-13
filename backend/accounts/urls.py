from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views
from .views import inventory_transaction_view
from .views import inventory_dashboard
from .views import search_patient
from .views import get_accounts
from .views import register_view
from rest_framework.authtoken.views import obtain_auth_token
from .views import current_user
from .views import ChangePasswordAPIView
from rest_framework import generics
from .views import PrescriptionDetailView, using_prescription_list
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    #path('logout/', views.logout_view, name='logout'),
    path('delete/', views.delete_account, name='delete_account'),
    path('edit/', views.edit_account, name='edit_account'),
    #path('profile/', views.profile, name='profile'),
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('supplies/add/', views.add_medical_supply, name='add_medical_supply'),
    path('supplies_list/', views.medical_supply_list, name='medical_supply_list'),
    path('supplies/edit/<int:supply_id>/', views.edit_medical_supply, name='edit_medical_supply'),
    path('supplies/delete/<int:supply_id>/', views.delete_medical_supply, name='delete_medical_supply'),
    path('inventory/', inventory_transaction_view, name='inventory_transaction'),
    path('dashboard/', inventory_dashboard, name='inventory_dashboard'),
    #path('patients/create/', views.create_patient, name='create_patient'),
    #path('patients/search/', search_patient, name='search_patient'),
    #path('patients/<int:patient_id>/treatment/', views.add_treatment, name='add_treatment'),
    #path('patients/<int:patient_id>/', views.patient_detail, name='patient_detail'),
    #path('patients/<int:patient_id>/edit/', views.edit_patient, name='edit_patient'),
    path('patients/<int:patient_id>/tests/add/', views.add_test_result, name='add_test_result'),
    path('patients/<int:patient_id>/tests/', views.view_test_results, name='view_test_results'),
    path('patients/<int:patient_id>/tests/print/', views.print_test_results, name='print_test_results'),
    path('patients/<int:patient_id>/invoices/create/', views.create_invoice, name='create_invoice'),
    path('invoices/', views.invoice_list, name='invoice_list'),
    path('invoices/<int:invoice_id>/edit/', views.edit_invoice, name='edit_invoice'),
    path('invoices/<int:invoice_id>/print/', views.print_invoice, name='print_invoice'),
    path("", get_accounts),
    path('register/', register_view, name='register'),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('api/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #path('api/profile/', views.profile_view, name='profile'),  # Truy cập cần token
    path('api/token/', obtain_auth_token, name='api_token_auth'),  # Đăng nhập lấy token
    path('api/logout/', views.logout_view, name='api_logout'),
    path('create_patient/', views.create_patient, name='create_patient'),
    path('patient_list/', views.patient_list, name='patient_list'),
    path('patient_detail/<int:pk>/', views.patient_detail, name='patient_detail'),
    path('current-user/', current_user, name='current-user'),
    path('change-password/', ChangePasswordAPIView.as_view(), name='change-password'),
    path("update-profile/", views.update_profile, name="update_profile"),
    path('patient/<int:pk>/', views.patient_update, name='update_patient'),
    path('giay-kham-benh/', views.giay_kham_benh_list_create, name='giay-kham-benh-list-create'),
    path('giay-kham-benh-list/', views.giay_kham_benh_list, name='giay-kham-benh-list'),
    path('appointments/', views.appointment_list, name='appointment_list'),
    path('giay-kham-benh/<int:pk>/', views.giay_kham_benh_detail, name='giay_kham_benh_detail'),
    path('prescriptions/', using_prescription_list, name='using_prescription'),
    path('using_prescription/<int:pk>/', PrescriptionDetailView.as_view(), name='prescription-detail')

]



   
