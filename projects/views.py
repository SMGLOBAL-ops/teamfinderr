from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, BasePermission

from .models import Project, ProjectMembership, ProjectMembershipRequest
from .serializers import ProjectSerializer, ProjectMembershipSerializer, ProjectMembershipRequestSerializer,ProjectMembershipRequestNoStatusSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.profile)

        
class ProjectMembershipViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectMembershipSerializer

    def get_queryset(self):
        project = Project.objects.get(pk=self.kwargs["project_pk"])
        members = ProjectMembership.objects.filter(project=project)
        return members

      
class IsMember(BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.method == "PATCH":
            project = obj.to_project
            return project.project_memberships.filter(user=request.user.profile).exists()

      
      
      
          
class ProjectMembershipRequestViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectMembershipRequestSerializer
    permission_classes = [IsAuthenticated,IsMember]
    
    def get_serializer_class(self):
        serializer_class = self.serializer_class
        print(self.kwargs)
        if self.request.method == "PATCH":
            req = ProjectMembershipRequest.objects.get(pk=self.kwargs["pk"])
            print(req.status)
            if req.responded == True:
                serializer_class = ProjectMembershipRequestNoStatusSerializer
            
        return serializer_class
    
    def get_queryset(self):
        project = Project.objects.get(pk=self.kwargs["project_pk"])
        requests = ProjectMembershipRequest.objects.filter(to_project=project)
        return requests
    
    def perform_create(self, serializer):
        project = Project.objects.get(pk=self.kwargs['project_pk'])
        serializer.save(from_user=self.request.user.profile,to_project=project)

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)
        
        