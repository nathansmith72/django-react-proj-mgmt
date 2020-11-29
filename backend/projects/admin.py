from django.contrib import admin

from projects.models import Status, Project, Task


class StatusAdmin(admin.ModelAdmin):
    pass


class ProjectAdmin(admin.ModelAdmin):
    pass


class TaskAdmin(admin.ModelAdmin):
    pass


admin.site.register(Status, StatusAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Task, TaskAdmin)
