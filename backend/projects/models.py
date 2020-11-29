from django.db import models

from accounts.models import User


class Status(models.Model):
    name = models.CharField(max_length=32, null=False, blank=False)

    def __str__(self):
        return self.name


class Project(models.Model):
    key = models.CharField(max_length=6, null=False, blank=False)
    name = models.CharField(max_length=64, null=False, blank=False)

    def __str__(self):
        return self.name


class Task(models.Model):
    reporter = models.ForeignKey(User, null=False, on_delete=models.CASCADE, related_name='reported_tasks')
    assigned_to = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='assigned_tasks')
    status = models.ForeignKey(Status, null=False, on_delete=models.CASCADE)
    title = models.CharField(max_length=64, null=False, blank=False)
    description = models.TextField(blank=True, null=False)

    def __str__(self):
        return self.title



