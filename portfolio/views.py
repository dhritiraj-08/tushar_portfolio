import threading
from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings

def send_email_async(subject, message, from_email, recipient_list):
    """Send email in background thread so it doesn't block the response."""
    try:
        send_mail(subject, message, from_email, recipient_list, fail_silently=True)
    except Exception:
        pass

def index(request):
    return render(request, 'index.html')

def contact(request):
    if request.method == 'POST':
        name    = request.POST.get('name', '').strip()
        email   = request.POST.get('email', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()

        if not all([name, email, subject, message]):
            return JsonResponse({'success': False, 'error': 'All fields are required.'})

        full_message = f"From: {name} <{email}>\n\n{message}"

        # Fire and forget — don't wait for SMTP
        t = threading.Thread(
            target=send_email_async,
            args=(
                f"Portfolio Contact: {subject}",
                full_message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.CONTACT_EMAIL],
            )
        )
        t.daemon = True
        t.start()

        return JsonResponse({'success': True})

    return JsonResponse({'success': False, 'error': 'Invalid request.'})
