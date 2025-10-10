import logging

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from telegrambot.sender import send_contact_notification

# Set up logging
logger = logging.getLogger(__name__)


@require_http_methods(["POST"])
def contact_api(request):
    """
    API endpoint to handle contact form submissions.
    Simply accepts form data and returns 204 No Content.
    """
    honey_pot = request.POST.get('nickname', '')
    if honey_pot:
        return JsonResponse({'success': False, 'message': ''}, status=403)
    try:
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        message = request.POST.get('message', '')
        send_contact_notification(
            name=name,
            email=email,
            message=message
        )

        # Log the received data (for development/debugging)
        logger.info(f"Contact form received - Name: {name}, Email: {email}, Message: {message}")

        # Return 204 No Content (successful processing, no response body)
        return JsonResponse({'success': True, 'message': 'Message sent successfully!'}, status=200)


    except Exception as e:
        logger.error(f"Error in contact API: {str(e)}")
        return JsonResponse({'success': False, 'message': 'Error message here'})
