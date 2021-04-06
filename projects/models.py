from django.db import models
from django.core.validators import  MaxValueValidator, MinValueValidator
from profiles.models import UserProfile
from enum import Enum

# Create your models here.

class SkillType(models.Model):  # The type that the skill falls under -> e.g. python type is coding 
    name = models.CharField(max_length=200)
    
    def __str__(self):
        return f'{self.name}'
    
class Skill(models.Model): # table to store a skill -> skill is mapped to users and projects -> skill has a name, a type
    name = models.CharField(max_length=200)
    type = models.ForeignKey(SkillType,on_delete=models.CASCADE)
    # coding, business, etc

    def __str__(self):
        return f'{self.name}'
    
class Role(models.Model): # Role is the job role that a project requires  e.g. project manager, developer etc
    name = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.name}'
    

# class Difficulty(models.Model):
#     pass # project difficulty (Used to determine candidates suitability)

class Project(models.Model): # a project that a user will create
    name = models.CharField(max_length=200) #charfield limited to 255 characters
    description = models.TextField(max_length=500) #Textfield >255 characters
    #owner = models.ForeignKey(UserProfile,on_delete=models.CASCADE)
    members = models.ManyToManyField(UserProfile, through="Membership") #related_name makes it easier to query e.g. profile.projects
    #max_members = models.PositiveIntegerField() # the maximum number of people that a project can have (user defined and varies between projects)
    skills = models.ManyToManyField(Skill)
    #roles_req = models.ManyToManyField(Role)
    #difficulty = models.PositiveIntegerField(validators=[MaxValueValidator(5),MinValueValidator(1)])
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()


    def __str__(self):
        return f'{self.name}'
        
class Membership(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    invite_reason = models.CharField(max_length=64)

    def __str__(self):
        return f'{self.user}{self.project}'
    
