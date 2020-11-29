from rest_framework.serializers import ModelSerializer

from accounts.serializers import UserSerializer
from projects.models import Project, Task, Status


class StatusSerializer(ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TaskSerializer(ModelSerializer):
    status = StatusSerializer(many=False)
    reporter = UserSerializer(many=False)
    assigned_to = UserSerializer(many=False)

    class Meta:
        model = Task
        fields = '__all__'


