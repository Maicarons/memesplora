# بروتوكول WebDAV

## نظرة عامة

يدعم Memesplora بروتوكول WebDAV، مما يتيح تعيين مساحات التخزين كمحرك أقراص شبكة، والعمل على الملفات مباشرة من مدير ملفات نظام التشغيل.

## المنفذ

خدمة WebDAV تستمع على المنفذ `:5214`.

## المصادقة

يستخدم WebDAV مصادقة HTTP Basic Auth، اسم المستخدم وكلمة المرور هما بيانات اعتماد المستخدم في واجهة إدارة الويب.

## طرق WebDAV المدعومة

| الطريقة | الوصف | حالة التنفيذ |
|------|------|:--------:|
| PROPFIND | الحصول على خصائص المورد وأعضاء المجموعة | ✅ |
| PROPPATCH | تعديل خصائص المورد | ✅ |
| MKCOL | إنشاء مجموعة (دليل) | ✅ |
| GET | الحصول على محتوى المورد | ✅ |
| PUT | رفع مورد | ✅ |
| DELETE | حذف مورد | ✅ |
| COPY | نسخ مورد | ✅ |
| MOVE | نقل مورد | ✅ |
| LOCK | قفل مورد | ✅ |
| UNLOCK | فك قفل مورد | ✅ |
| OPTIONS | الحصول على الطرق المدعومة | ✅ |

## أمثلة الاستخدام

### macOS Finder

```
القائمة > اذهب > الاتصال بالخادم
أدخل: http://localhost:5214
أدخل اسم المستخدم وكلمة المرور
```

### Windows Explorer

```
انقر يمينًا على "هذا الكمبيوتر" > تعيين محرك أقراص شبكة
أدخل: http://localhost:5214
حدد "الاتصال باستخدام بيانات اعتماد مختلفة"
أدخل اسم المستخدم وكلمة المرور
```

### Linux

```bash
# تثبيت davfs2
sudo apt install davfs2

# التركيب
sudo mount -t davfs http://localhost:5214 /mnt/memesplora

# أو استخدام /etc/fstab للتركيب التلقائي
echo "http://localhost:5214 /mnt/memesplora davfs rw,user,noauto 0 0" | sudo tee -a /etc/fstab
```

### استخدام curl

```bash
# عرض الدليل
curl -X PROPFIND http://localhost:5214/ \
  -u username:password \
  -H "Depth: 1"

# إنشاء دليل
curl -X MKCOL http://localhost:5214/new-folder \
  -u username:password

# رفع ملف
curl -T file.txt http://localhost:5214/file.txt \
  -u username:password

# تنزيل ملف
curl -o file.txt http://localhost:5214/file.txt \
  -u username:password
```

## هيكل التنفيذ

يتم تنفيذ WebDAV باستخدام حزمة `golang.org/x/net/webdav`، الأساس هو نمط المحول (Adapter Pattern):

```go
// محول: تكييف نظام الملفات في الذاكرة مع webdav.FileSystem
type MemFSAdapter struct {
    mfs *fs.MemFileSystem
}

func (a *MemFSAdapter) Mkdir(ctx context.Context, name string, perm os.FileMode) error {
    return a.mfs.Mkdir(ctx, name, getOwnerID(ctx))
}

func (a *MemFSAdapter) OpenFile(ctx context.Context, name string, flag int, perm os.FileMode) (webdav.File, error) {
    return a.mfs.Open(ctx, name)
}

func (a *MemFSAdapter) RemoveAll(ctx context.Context, name string) error {
    return a.mfs.Delete(ctx, name)
}

func (a *MemFSAdapter) Rename(ctx context.Context, oldName, newName string) error {
    return a.mfs.Rename(ctx, oldName, newName)
}

func (a *MemFSAdapter) Stat(ctx context.Context, name string) (os.FileInfo, error) {
    info, err := a.mfs.Stat(ctx, name)
    if err != nil {
        return nil, err
    }
    return &memFileInfo{info}, nil
}
```

## إدارة الأقفال

تُستخدم أقفال WebDAV لمنع تعارضات الكتابة المتزامنة:

- **قفل حصري**: يمكن لعميل واحد فقط تعديل المورد في نفس الوقت
- **قفل مشترك**: يمكن لعدة عملاء القراءة في نفس الوقت، ولكن لا يمكنهم الكتابة
- **انتهاء صلاحية القفل**: تحرير تلقائي للأقفال منتهية الصلاحية
- **رمز القفل**: يُستخدم لتحديد القفل وفكه

## إدارة الخصائص

يدعم WebDAV نوعين من الخصائص:

- **Live Properties**: تُحسب ديناميكيًا، مثل حجم الملف ووقت التعديل
- **Dead Properties**: خصائص XML مخصصة من قبل المستخدم

## ملاحظات

- الملفات التي يتم إنشاؤها عبر WebDAV تكون مرئية فورًا في واجهة إدارة الويب
- حد حجم الملف يخضع للتحكم بحصة المساحة
- يُوصى باستخدام HTTPS لحماية اتصالات WebDAV