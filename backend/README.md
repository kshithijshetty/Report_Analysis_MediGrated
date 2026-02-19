# Backend Setup

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Install system packages required by `pytesseract` and `pdf2image`.
   - **Ubuntu / Debian:**
     ```bash
     sudo apt install tesseract-ocr poppler-utils
     ```
   - **macOS (Homebrew):**
     ```bash
     brew install tesseract poppler
     ```
   - **Windows:**
     1. Install [Tesseract OCR](https://github.com/UB-Mannheim/tesseract/wiki) (use the official installer or [Chocolatey](https://chocolatey.org/): `choco install tesseract`).
     2. Install [Poppler for Windows](https://github.com/oschwartz10612/poppler-windows/releases) and add its `bin` folder to your `PATH`.
     3. Make sure both `tesseract.exe` and `pdftoppm.exe` are available on the command line.

3. Create a `.env` file and add your API key:
   ```env
   GROQ_API_KEY=your_key
   ```

4. Run the server:
   ```bash
   uvicorn app:app --reload
   ```
