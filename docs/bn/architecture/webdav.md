# WebDAV প্রোটোকল

## ওভারভিউ

Memesplora WebDAV প্রোটোকল সমর্থন করে, যা স্টোরেজ স্পেসকে নেটওয়ার্ক ড্রাইভ হিসেবে ম্যাপ করতে এবং অপারেটিং সিস্টেম ফাইল ম্যানেজারে সরাসরি ফাইল পরিচালনা করতে দেয়।

## পোর্ট

WebDAV সার্ভিস `:5214` পোর্টে শোনে।

## অথেনটিকেশন

WebDAV HTTP বেসিক Auth অথেনটিকেশন ব্যবহার করে, ইউজারনেম এবং পাসওয়ার্ড ওয়েব ম্যানেজমেন্ট ইন্টারফেসের ইউজার ক্রেডেনশিয়াল।

## সমর্থিত WebDAV পদ্ধতি

| পদ্ধতি | বিবরণ | বাস্তবায়ন অবস্থা |
|------|------|:--------:|
| PROPFIND | রিসোর্স বৈশিষ্ট্য এবং কালেকশন সদস্য পাওয়া | ✅ |
| PROPPATCH | রিসোর্স বৈশিষ্ট্য পরিবর্তন | ✅ |
| MKCOL | কালেকশন (ডিরেক্টরি) তৈরি | ✅ |
| GET | রিসোর্স কন্টেন্ট পাওয়া | ✅ |
| PUT | রিসোর্স আপলোড | ✅ |
| DELETE | রিসোর্স মুছে ফেলা | ✅ |
| COPY | রিসোর্স কপি | ✅ |
| MOVE | রিসোর্স সরানো | ✅ |
| LOCK | রিসোর্স লক | ✅ |
| UNLOCK | রিসোর্স আনলক | ✅ |
| OPTIONS | সমর্থিত পদ্ধতি পাওয়া | ✅ |

## ব্যবহারের উদাহরণ

### macOS Finder

```
মেনু > যান > সার্ভারে সংযোগ
ইনপুট: http://localhost:5214
ইউজারনেম এবং পাসওয়ার্ড ইনপুট
```

### Windows এক্সপ্লোরার

```
"এই পিসি" তে রাইট-ক্লিক > নেটওয়ার্ক ড্রাইভ ম্যাপ
ইনপুট: http://localhost:5214
"অন্য ক্রেডেনশিয়াল ব্যবহার করে সংযোগ" চেক
ইউজারনেম এবং পাসওয়ার্ড ইনপুট
```

### Linux

```bash
# davfs2 ইনস্টল
sudo apt install davfs2

# মাউন্ট
sudo mount -t davfs http://localhost:5214 /mnt/memesplora

# অথবা /etc/fstab ব্যবহার করে স্বয়ংক্রিয় মাউন্ট
echo "http://localhost:5214 /mnt/memesplora davfs rw,user,noauto 0 0" | sudo tee -a /etc/fstab
```

### curl ব্যবহার

```bash
# ডিরেক্টরি তালিকা
curl -X PROPFIND http://localhost:5214/ \
  -u username:password \
  -H "Depth: 1"

# ডিরেক্টরি তৈরি
curl -X MKCOL http://localhost:5214/new-folder \
  -u username:password

# ফাইল আপলোড
curl -T file.txt http://localhost:5214/file.txt \
  -u username:password

# ফাইল ডাউনলোড
curl -o file.txt http://localhost:5214/file.txt \
  -u username:password
```

## বাস্তবায়ন আর্কিটেকচার

WebDAV `golang.org/x/net/webdav` প্যাকেজ ব্যবহার করে বাস্তবায়িত, মূল উদ্দেশ্য হল অ্যাডাপ্টার প্যাটার্ন:

```go
// অ্যাডাপ্টার: মেমোরি ফাইলসিস্টেমকে webdav.FileSystem-এ রূপান্তর
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

## লক ম্যানেজমেন্ট

WebDAV লকগুলি কনকারেন্ট রাইট কনফ্লিক্ট প্রতিরোধে ব্যবহৃত হয়:

- **এক্সক্লুসিভ লক**: একই সময়ে শুধুমাত্র একটি ক্লায়েন্ট রিসোর্স পরিবর্তন করতে পারে
- **শেয়ার্ড লক**: একাধিক ক্লায়েন্ট একসাথে পড়তে পারে, কিন্তু লিখতে পারে না
- **লক টাইমআউট**: স্বয়ংক্রিয়ভাবে মেয়াদোত্তীর্ণ লক মুক্তি
- **লক টোকেন**: সনাক্তকরণ এবং আনলকের জন্য ব্যবহৃত

## অ্যাট্রিবিউট ম্যানেজমেন্ট

WebDAV দুই ধরনের অ্যাট্রিবিউট সমর্থন করে:

- **লাইভ প্রপার্টিজ**: ডায়নামিকভাবে গণনা করা হয়, যেমন ফাইল সাইজ, পরিবর্তনের সময়
- **ডেড প্রপার্টিজ**: ব্যবহারকারী-সংজ্ঞায়িত XML অ্যাট্রিবিউট

## গুরুত্বপূর্ণ নোট

- WebDAV-র মাধ্যমে তৈরি ফাইলগুলি ওয়েব ম্যানেজমেন্ট ইন্টারফেসে রিয়েল-টাইমে দৃশ্যমান
- ফাইল সাইজ সীমা স্পেস কোটা দ্বারা নিয়ন্ত্রিত
- WebDAV যোগাযোগ সুরক্ষিত করতে HTTPS ব্যবহার করার পরামর্শ দেওয়া হয়