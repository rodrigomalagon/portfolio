from pathlib import Path
try:
    from pypdf import PdfReader
except Exception:
    print('MISSING_PYPDF')
    raise SystemExit(0)
for path in [Path('files/CV Rodrigo Malagón EN.pdf'), Path('files/CV Rodrigo Malagón ES.pdf')]:
    print(f'=== {path.name} ===')
    reader = PdfReader(str(path))
    for page in reader.pages:
        text = page.extract_text() or ''
        print(text)
