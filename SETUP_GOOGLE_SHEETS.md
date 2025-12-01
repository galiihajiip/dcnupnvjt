# Setup Google Sheets untuk Form Pendaftaran

## Langkah 1: Buat Google Spreadsheet

1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru dengan nama: **DCN UPNVJT - Data Contributor**
3. Di Sheet1, buat header di baris pertama:

| Timestamp | Nama Lengkap | NIM | Program Studi | Angkatan | Email | WhatsApp | Instagram | LinkedIn | GitHub | Ketersediaan | Motivasi | Minat |
|-----------|--------------|-----|---------------|----------|-------|----------|-----------|----------|--------|--------------|----------|-------|

## Langkah 2: Buat Google Apps Script

1. Di Google Sheets, klik **Extensions** → **Apps Script**
2. Hapus kode default, paste kode ini:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Append data ke sheet
    sheet.appendRow([
      data.timestamp,
      data.nama,
      data.nim,
      data.prodi,
      data.angkatan,
      data.email,
      data.whatsapp,
      data.instagram,
      data.linkedin,
      data.github,
      data.ketersediaan,
      data.motivasi,
      data.minat
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Klik **Save** (ikon disket)
4. Beri nama project: **DCN Form Handler**

## Langkah 3: Deploy Web App

1. Klik **Deploy** → **New deployment**
2. Klik ikon ⚙️ (gear) → pilih **Web app**
3. Setting:
   - **Description**: DCN Form Handler v1
   - **Execute as**: Me (email kamu)
   - **Who has access**: Anyone
4. Klik **Deploy**
5. Klik **Authorize access**
6. Pilih akun Google kamu
7. Klik **Advanced** → **Go to DCN Form Handler (unsafe)**
8. Klik **Allow**
9. **COPY URL** yang muncul (contoh: `https://script.google.com/macros/s/AKfycby.../exec`)

## Langkah 4: Update Website

1. Buka file **script.js**
2. Cari baris:
```javascript
const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE';
```
3. Ganti dengan URL yang kamu copy tadi:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
```
4. Save file

## Langkah 5: Test Form

1. Buka website kamu
2. Isi form pendaftaran
3. Submit
4. Cek Google Sheets, data harus masuk otomatis!

## Tips

- Data akan masuk real-time ke Google Sheets
- Kamu bisa export ke Excel kapan saja
- Bisa buat filter, sort, dan analisis data
- Gratis unlimited!

## Troubleshooting

**Jika data tidak masuk:**
1. Pastikan URL Google Script sudah benar
2. Cek console browser (F12) untuk error
3. Pastikan deployment setting "Who has access" = Anyone
4. Coba deploy ulang dengan versi baru

**Jika muncul error authorization:**
1. Ulangi langkah authorize access
2. Pastikan pilih "Allow" semua permission

---

Butuh bantuan? Chat admin: https://wa.me/6282265588823
