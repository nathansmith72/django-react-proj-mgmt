from rest_framework.viewsets import ModelViewSet

from projects.models import Project, Task
from projects.serializers import ProjectSerializer, TaskSerializer


class ProjectViewSet(ModelViewSet):
    model = Project
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TaskViewSet(ModelViewSet):
    model = Task
    queryset = Task.objects.all()
    serializer_class = TaskSerializer