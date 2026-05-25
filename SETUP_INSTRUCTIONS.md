# Cinema Portfolio - Django Setup Instructions

## Project Structure
```
cinema_portfolio/
├── cinema_portfolio/       # Django project settings
├── portfolio/              # Main app
├── static/                 # Static files
│   ├── css/
│   │   └── style.css      # Main stylesheet with Coolvetica font
│   ├── js/
│   │   └── script.js      # JavaScript animations
│   ├── fonts/             # ADD COOLVETICA FONTS HERE
│   │   ├── coolvetica.ttf
│   │   ├── coolvetica.woff
│   │   └── coolvetica.woff2
│   └── images/            # ADD YOUR IMAGES HERE
│       ├── logo.png       # Your logo
│       ├── hero-bg.jpg    # Hero background
│       └── profile.jpg    # Profile photo
├── templates/             # HTML templates
│   ├── base.html
│   └── index.html
└── manage.py
```

## Setup Steps

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Add Your Assets

#### Coolvetica Font:
1. Download Coolvetica from: https://www.dafont.com/coolvetica.font
2. Place font files in `static/fonts/`:
   - coolvetica.ttf
   - coolvetica.woff
   - coolvetica.woff2

#### Logo:
1. Add your logo to `static/images/logo.png`
2. Recommended size: 200x50px or similar
3. Formats: PNG or SVG

#### Hero Background:
1. Add background image to `static/images/hero-bg.jpg`
2. Recommended size: 1920x1080px or higher

#### Profile Photo:
1. Add to `static/images/profile.jpg`
2. Recommended size: 600x600px

### 3. Run Migrations
```bash
python manage.py migrate
```

### 4. Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

### 5. Run Development Server
```bash
python manage.py runserver
```

Visit: http://127.0.0.1:8000/

## Customization

### Update Text Content:
Edit `templates/index.html` to change:
- Hero title and subtitle
- Project descriptions
- About section text
- Social media links

### Update Colors:
Edit `static/css/style.css` - modify CSS variables:
```css
:root {
    --primary-color: #0a0a0a;
    --accent-color: #ff6b6b;
    --text-color: #e0e0e0;
}
```

### Add Your Video:
Replace the video URL in `templates/index.html`:
```html
<source src="YOUR_VIDEO_URL.mp4" type="video/mp4">
```

### Update Logo:
In `templates/base.html`, the logo section will show:
1. Your logo image (if exists in static/images/logo.png)
2. Text "CINEMA" as fallback

## Production Deployment

### Collect Static Files:
```bash
python manage.py collectstatic
```

### Update Settings:
In `cinema_portfolio/settings.py`:
```python
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com']
SECRET_KEY = 'your-secret-key'  # Generate new one
```

## Features Included

✅ Coolvetica font integration
✅ Custom cursor animations
✅ Smooth scroll effects
✅ Responsive design
✅ Video hero section
✅ Project portfolio grid
✅ Contact form
✅ Django backend ready
✅ Static files configured
✅ Logo support

## Need Help?

- Django docs: https://docs.djangoproject.com/
- Static files: https://docs.djangoproject.com/en/5.0/howto/static-files/
- Deployment: https://docs.djangoproject.com/en/5.0/howto/deployment/
