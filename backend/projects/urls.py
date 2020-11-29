from rest_framework import routers

from projects.views import ProjectViewSet, TaskViewSet

router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'projects', ProjectViewSet)

urlpatterns = router.urls
