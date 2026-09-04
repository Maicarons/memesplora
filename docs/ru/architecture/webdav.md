# Протокол WebDAV

## Обзор

Memesplora поддерживает протокол WebDAV, позволяя монтировать пространства хранения как сетевые диски и работать с файлами напрямую из файлового менеджера операционной системы.

## Порт

WebDAV сервис работает на порту `:5214`.

## Аутентификация

WebDAV использует HTTP Basic Auth. Имя пользователя и пароль — это учётные данные пользователя из веб-интерфейса управления.

## Поддерживаемые методы WebDAV

| Метод | Описание | Статус |
|-------|----------|:------:|
| PROPFIND | Получение свойств ресурса и членов коллекции | ✅ |
| PROPPATCH | Изменение свойств ресурса | ✅ |
| MKCOL | Создание коллекции (каталога) | ✅ |
| GET | Получение содержимого ресурса | ✅ |
| PUT | Загрузка ресурса | ✅ |
| DELETE | Удаление ресурса | ✅ |
| COPY | Копирование ресурса | ✅ |
| MOVE | Перемещение ресурса | ✅ |
| LOCK | Блокировка ресурса | ✅ |
| UNLOCK | Разблокировка ресурса | ✅ |
| OPTIONS | Получение списка поддерживаемых методов | ✅ |

## Примеры использования

### macOS Finder

```
Меню > Переход > Подключиться к серверу
Введите: http://localhost:5214
Введите имя пользователя и пароль
```

### Windows Проводник

```
Правой кнопкой «Этот компьютер» > Подключить сетевой диск
Введите: http://localhost:5214
Отметьте «Использовать другие учётные данные»
Введите имя пользователя и пароль
```

### Linux

```bash
# Установка davfs2
sudo apt install davfs2

# Монтирование
sudo mount -t davfs http://localhost:5214 /mnt/memesplora

# Или автоматическое монтирование через /etc/fstab
echo "http://localhost:5214 /mnt/memesplora davfs rw,user,noauto 0 0" | sudo tee -a /etc/fstab
```

### Использование curl

```bash
# Список каталога
curl -X PROPFIND http://localhost:5214/ \
  -u username:password \
  -H "Depth: 1"

# Создание каталога
curl -X MKCOL http://localhost:5214/new-folder \
  -u username:password

# Загрузка файла
curl -T file.txt http://localhost:5214/file.txt \
  -u username:password

# Скачивание файла
curl -o file.txt http://localhost:5214/file.txt \
  -u username:password
```

## Архитектура реализации

WebDAV реализован с использованием пакета `golang.org/x/net/webdav`, основой является паттерн адаптера:

```go
// Адаптер: адаптирует файловую систему в памяти к webdav.FileSystem
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

## Управление блокировками

Блокировки WebDAV предотвращают конфликты конкурентной записи:

- **Эксклюзивная блокировка**: только один клиент может изменять ресурс в данный момент времени
- **Общая блокировка**: несколько клиентов могут одновременно читать, но не могут писать
- **Тайм-аут блокировки**: автоматическое освобождение просроченных блокировок
- **Токен блокировки**: используется для идентификации и снятия блокировки

## Управление свойствами

WebDAV поддерживает два типа свойств:

- **Live Properties**: динамически вычисляемые, такие как размер файла, время изменения
- **Dead Properties**: пользовательские XML-свойства

## Примечания

- Файлы, созданные через WebDAV, мгновенно видны в веб-интерфейсе
- Ограничение размера файлов контролируется квотой пространства
- Рекомендуется использовать HTTPS для защиты WebDAV-трафика