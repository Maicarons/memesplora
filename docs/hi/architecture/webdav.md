# WebDAV प्रोटोकॉल

## अवलोकन

Memesplora WebDAV प्रोटोकॉल का समर्थन करता है, जिससे स्टोरेज स्पेस को नेटवर्क ड्राइव के रूप में मैप किया जा सकता है और ऑपरेटिंग सिस्टम फ़ाइल मैनेजर में सीधे फ़ाइलों पर काम किया जा सकता है।

## पोर्ट

WebDAV सेवा `:5214` पोर्ट पर सुनती है।

## प्रमाणीकरण

WebDAV HTTP Basic Auth प्रमाणीकरण का उपयोग करता है, उपयोगकर्ता नाम और पासवर्ड Web प्रबंधन इंटरफ़ेस में उपयोगकर्ता क्रेडेंशियल हैं।

## समर्थित WebDAV विधियाँ

| विधि | विवरण | कार्यान्वयन स्थिति |
|------|------|:--------:|
| PROPFIND | संसाधन गुण और संग्रह सदस्य प्राप्त करें | ✅ |
| PROPPATCH | संसाधन गुण संशोधित करें | ✅ |
| MKCOL | संग्रह (डायरेक्ट्री) बनाएं | ✅ |
| GET | संसाधन सामग्री प्राप्त करें | ✅ |
| PUT | संसाधन अपलोड करें | ✅ |
| DELETE | संसाधन हटाएं | ✅ |
| COPY | संसाधन कॉपी करें | ✅ |
| MOVE | संसाधन स्थानांतरित करें | ✅ |
| LOCK | संसाधन लॉक करें | ✅ |
| UNLOCK | संसाधन अनलॉक करें | ✅ |
| OPTIONS | समर्थित विधियाँ प्राप्त करें | ✅ |

## उपयोग उदाहरण

### macOS Finder

```
मेनू > जाएं > सर्वर से कनेक्ट करें
इनपुट: http://localhost:5214
उपयोगकर्ता नाम और पासवर्ड इनपुट करें
```

### Windows एक्सप्लोरर

```
"यह पीसी" पर राइट-क्लिक करें > नेटवर्क ड्राइव मैप करें
इनपुट: http://localhost:5214
"अन्य क्रेडेंशियल से कनेक्ट करें" चेक करें
उपयोगकर्ता नाम और पासवर्ड इनपुट करें
```

### Linux

```bash
# davfs2 स्थापित करें
sudo apt install davfs2

# माउंट करें
sudo mount -t davfs http://localhost:5214 /mnt/memesplora

# या /etc/fstab के साथ स्वचालित माउंट
echo "http://localhost:5214 /mnt/memesplora davfs rw,user,noauto 0 0" | sudo tee -a /etc/fstab
```

### curl का उपयोग करना

```bash
# डायरेक्ट्री सूचीबद्ध करें
curl -X PROPFIND http://localhost:5214/ \
  -u username:password \
  -H "Depth: 1"

# डायरेक्ट्री बनाएं
curl -X MKCOL http://localhost:5214/new-folder \
  -u username:password

# फ़ाइल अपलोड करें
curl -T file.txt http://localhost:5214/file.txt \
  -u username:password

# फ़ाइल डाउनलोड करें
curl -o file.txt http://localhost:5214/file.txt \
  -u username:password
```

## कार्यान्वयन आर्किटेक्चर

WebDAV `golang.org/x/net/webdav` पैकेज का उपयोग करके कार्यान्वित किया गया है, मुख्य रूप से एडॉप्टर पैटर्न:

```go
// एडॉप्टर: मेमोरी फ़ाइल सिस्टम को webdav.FileSystem में अनुकूलित करें
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

## लॉक प्रबंधन

WebDAV लॉक समवर्ती लिखने के टकराव को रोकने के लिए उपयोग किए जाते हैं:

- **एक्सक्लूसिव लॉक**: एक समय में केवल एक क्लाइंट संसाधन को संशोधित कर सकता है
- **शेयर्ड लॉक**: कई क्लाइंट एक साथ पढ़ सकते हैं, लेकिन लिख नहीं सकते
- **लॉक टाइमआउट**: समाप्त लॉक स्वचालित रूप से रिलीज़ करें
- **लॉक टोकन**: पहचान और अनलॉक करने के लिए उपयोग किया जाता है

## गुण प्रबंधन

WebDAV दो प्रकार के गुणों का समर्थन करता है:

- **Live Properties**: गतिशील रूप से गणना की जाती है, जैसे फ़ाइल आकार, संशोधन समय
- **Dead Properties**: उपयोगकर्ता-परिभाषित XML गुण

## ध्यान देने योग्य बातें

- WebDAV के माध्यम से बनाई गई फ़ाइलें Web प्रबंधन इंटरफ़ेस में वास्तविक समय में दिखाई देती हैं
- फ़ाइल आकार सीमा स्पेस कोटा द्वारा नियंत्रित होती है
- WebDAV संचार की सुरक्षा के लिए HTTPS का उपयोग करने की अनुशंसा की जाती है