from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from .views import inventory_transaction_view
from .views import inventory_dashboard
from .views import search_patient
urlpatterns = [
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('delete/', views.delete_account, name='delete_account'),
    path('edit/', views.edit_account, name='edit_account'),
    path('profile/', views.profile, name='profile'),
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
    path('patients/create/', views.create_patient, name='create_patient'),
    path('patients/search/', search_patient, name='search_patient'),
    path('patients/<int:patient_id>/treatment/', views.add_treatment, name='add_treatment'),
    path('patients/<int:patient_id>/', views.patient_detail, name='patient_detail'),
    path('patients/<int:patient_id>/edit/', views.edit_patient, name='edit_patient'),
    path('patients/<int:patient_id>/tests/add/', views.add_test_result, name='add_test_result'),
    path('patients/<int:patient_id>/tests/', views.view_test_results, name='view_test_results'),
    path('patients/<int:patient_id>/tests/print/', views.print_test_results, name='print_test_results'),
    path('patients/<int:patient_id>/invoices/create/', views.create_invoice, name='create_invoice'),
    path('invoices/', views.invoice_list, name='invoice_list'),
    path('invoices/<int:invoice_id>/edit/', views.edit_invoice, name='edit_invoice'),
    path('invoices/<int:invoice_id>/print/', views.print_invoice, name='print_invoice'),
]