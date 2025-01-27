# Generated by Django 3.1.7 on 2021-04-08 17:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(max_length=500)),
                ('start_date', models.DateTimeField(auto_now_add=True)),
                ('end_date', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('skillcategorymixin_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='profiles.skillcategorymixin')),
                ('name', models.CharField(max_length=200)),
            ],
            bases=('profiles.skillcategorymixin',),
        ),
        migrations.CreateModel(
            name='ProjectMembership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField(max_length=64, null=True)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_memberships', to='projects.project')),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_memberships', to='projects.role')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_memberships', to='profiles.userprofile')),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='members',
            field=models.ManyToManyField(through='projects.ProjectMembership', to='profiles.UserProfile'),
        ),
        migrations.AddField(
            model_name='project',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projects_owned', to='profiles.userprofile'),
        ),
        migrations.AddField(
            model_name='project',
            name='roles',
            field=models.ManyToManyField(through='projects.ProjectMembership', to='projects.Role'),
        ),
        migrations.CreateModel(
            name='ProjectMembershipRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('accepted', 'Accepted'), ('pending', 'Pending'), ('declined', 'Declined')], default='pending', max_length=8)),
                ('responded', models.BooleanField(blank=True, default=False, null=True)),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requests', to='profiles.userprofile')),
                ('role', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='requests', to='projects.role')),
                ('to_project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requests', to='projects.project')),
            ],
            options={
                'unique_together': {('from_user', 'to_project')},
            },
        ),
    ]
