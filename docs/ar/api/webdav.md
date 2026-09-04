# مرجع بروتوكول WebDAV

## نظرة عامة

يدعم Memesplora بروتوكول WebDAV، مما يتيح تعيين مساحات التخزين كمحرك أقراص شبكة، والعمل على الملفات مباشرة من مدير ملفات نظام التشغيل.

## نقطة النهاية

**عنوان WebDAV**: `http://localhost:5214`

## المصادقة

يستخدم WebDAV مصادقة HTTP Basic Auth.

## الطرق المدعومة

| الطريقة | الوصف |
|------|------|
| PROPFIND | الحصول على خصائص المورد وأعضاء المجموعة |
| PROPPATCH | تعديل خصائص المورد |
| MKCOL | إنشاء مجموعة (دليل) |
| GET | الحصول على محتوى المورد |
| PUT | رفع مورد |
| DELETE | حذف مورد |
| COPY | نسخ مورد |
| MOVE | نقل مورد |
| LOCK | قفل مورد |
| UNLOCK | فك قفل مورد |

## أمثلة الاستخدام

### macOS Finder

```
القائمة > اذهب > الاتصال بالخادم
أدخل: http://localhost:5214
```

### Windows Explorer

```
انقر يمينًا على "هذا الكمبيوتر" > تعيين محرك أقراص شبكة
أدخل: http://localhost:5214
```

### Linux

```bash
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```

### curl

```bash
# عرض الدليل
curl -X PROPFIND http://localhost:5214/ -H "Depth: 1"

# إنشاء دليل
curl -X MKCOL http://localhost:5214/new-folder

# رفع ملف
curl -T file.txt http://localhost:5214/file.txt
```

## تفاصيل الهندسة المعمارية

يرجى الرجوع إلى [هندسة بروتوكول WebDAV](/ar/architecture/webdav) للاطلاع على التصميم التفصيلي.