from PIL import Image, ImageDraw, ImageFont
import io
import requests

# Create a simple test image with a few lab values
img = Image.new('RGB', (800, 300), color=(255,255,255))
d = ImageDraw.Draw(img)
try:
    font = ImageFont.truetype('arial.ttf', 18)
except Exception:
    font = ImageFont.load_default()

text = "Patient: John Doe\nHemoglobin: 13 g/dL\nWBC: 12,000 per µL (HIGH)\nGlucose: 90 mg/dL"
d.multiline_text((20,20), text, fill=(0,0,0), font=font)

buf = io.BytesIO()
img.save(buf, format='PNG')
buf.seek(0)

files = {'file': ('test_report.png', buf, 'image/png')}
url = 'http://127.0.0.1:8000/analyze'

print('Posting test image to', url)
resp = requests.post(url, files=files)
print('Status code:', resp.status_code)
try:
    print('Response JSON:', resp.json())
except Exception:
    print('Response text:', resp.text)
