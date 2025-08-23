from django.shortcuts import render

from frontend import config


def home(request):
    return render(
        request=request,
        template_name='frontend/index.html',
        context={
            "site_title": config.SITE_TITLE,
            "site_subtitle": config.SITE_SUBTITLE,
            "site_description": config.SITE_DESCRIPTION,
        }
    )
