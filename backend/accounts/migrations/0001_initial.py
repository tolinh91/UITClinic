# Generated by Django 5.2.3 on 2025-07-20 09:14

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MedicalSupply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=20)),
                ('name', models.CharField(max_length=100)),
                ('quantity', models.PositiveIntegerField()),
                ('unit', models.CharField(max_length=20)),
                ('expiration_date', models.DateField()),
                ('description', models.TextField(blank=True)),
                ('supplier', models.CharField(blank=True, max_length=255)),
                ('threshold', models.IntegerField(default=10)),
                ('unit_price', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(editable=False, max_length=10)),
                ('full_name', models.CharField(max_length=100)),
                ('id_number', models.CharField(max_length=20)),
                ('has_insurance', models.BooleanField(default=False)),
                ('address', models.TextField()),
                ('phone', models.CharField(max_length=15)),
                ('allergy', models.TextField(blank=True, null=True)),
                ('medical_history', models.TextField(blank=True, null=True)),
                ('current_medications', models.TextField(blank=True, null=True)),
                ('symptoms', models.TextField()),
                ('blood_pressure_systolic', models.PositiveIntegerField()),
                ('blood_pressure_diastolic', models.PositiveIntegerField()),
                ('pulse', models.PositiveIntegerField()),
                ('spo2', models.FloatField()),
                ('temperature', models.FloatField()),
                ('old_test_results', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='InventoryTransaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_type', models.CharField(choices=[('IN', 'Nhập kho'), ('OUT', 'Xuất kho')], max_length=3)),
                ('quantity', models.PositiveIntegerField()),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('note', models.TextField()),
                ('expiry_date', models.DateField(default=django.utils.timezone.now)),
                ('supply', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.medicalsupply')),
            ],
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('consultation_fee', models.DecimalField(decimal_places=0, default=100000, max_digits=10)),
                ('medicine_fee', models.DecimalField(decimal_places=0, default=0, max_digits=10)),
                ('test_fee', models.DecimalField(decimal_places=0, default=0, max_digits=10)),
                ('total_amount', models.DecimalField(decimal_places=0, default=0, max_digits=10)),
                ('amount_paid', models.DecimalField(decimal_places=0, default=0, max_digits=10)),
                ('payment_method', models.CharField(choices=[('cash', 'Tiền mặt'), ('bank', 'Chuyển khoản'), ('card', 'Quẹt thẻ')], default='cash', max_length=20)),
                ('status', models.CharField(choices=[('paid', 'Đã thanh toán'), ('unpaid', 'Chưa thanh toán')], default='unpaid', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.patient')),
            ],
        ),
        migrations.CreateModel(
            name='Prescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.patient')),
            ],
        ),
        migrations.CreateModel(
            name='PrescriptionDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('medical_supply', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.medicalsupply')),
                ('prescription', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='details', to='accounts.prescription')),
            ],
        ),
        migrations.CreateModel(
            name='TestResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('test_type', models.CharField(max_length=100)),
                ('result_value', models.FloatField(blank=True, null=True)),
                ('unit', models.CharField(blank=True, max_length=20, null=True)),
                ('ecg_result', models.TextField(blank=True, null=True)),
                ('ultrasound_result', models.TextField(blank=True, null=True)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='test_results', to='accounts.patient')),
            ],
        ),
        migrations.CreateModel(
            name='TreatmentRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symptoms', models.TextField()),
                ('blood_pressure_systolic', models.PositiveIntegerField()),
                ('blood_pressure_diastolic', models.PositiveIntegerField()),
                ('pulse', models.PositiveIntegerField()),
                ('spo2', models.FloatField()),
                ('temperature', models.FloatField()),
                ('current_medications', models.TextField(blank=True, null=True)),
                ('old_test_results', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='treatment_records', to='accounts.patient')),
            ],
        ),
    ]
