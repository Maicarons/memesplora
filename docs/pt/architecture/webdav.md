# Protocolo WebDAV

## Visao Geral

Memesplora suporta o protocolo WebDAV, permitindo mapear espacos de armazenamento como unidades de rede e operar arquivos diretamente no gerenciador de arquivos do sistema operacional.

## Porta

O servico WebDAV escuta na porta `:5214`.

## Autenticacao

O WebDAV usa autenticacao HTTP Basic Auth. O nome de usuario e senha sao as credenciais de usuario da interface de administracao web.

## Metodos WebDAV Suportados

| Metodo | Descricao | Status de Implementacao |
|--------|-----------|:----------------------:|
| PROPFIND | Obter propriedades do recurso e membros da colecao | ✅ |
| PROPPATCH | Modificar propriedades do recurso | ✅ |
| MKCOL | Criar colecao (diretorio) | ✅ |
| GET | Obter conteudo do recurso | ✅ |
| PUT | Enviar recurso | ✅ |
| DELETE | Excluir recurso | ✅ |
| COPY | Copiar recurso | ✅ |
| MOVE | Mover recurso | ✅ |
| LOCK | Bloquear recurso | ✅ |
| UNLOCK | Desbloquear recurso | ✅ |
| OPTIONS | Obter metodos suportados | ✅ |

## Exemplos de Uso

### macOS Finder

```
Menu > Ir > Conectar ao Servidor
Digite: http://localhost:5214
Digite nome de usuario e senha
```

### Windows Explorer

```
Clique direito em "Este Computador" > Mapear unidade de rede
Digite: http://localhost:5214
Marque "Conectar usando credenciais diferentes"
Digite nome de usuario e senha
```

### Linux

```bash
# Instalar davfs2
sudo apt install davfs2

# Montar
sudo mount -t davfs http://localhost:5214 /mnt/memesplora

# Ou usar /etc/fstab para montagem automatica
echo "http://localhost:5214 /mnt/memesplora davfs rw,user,noauto 0 0" | sudo tee -a /etc/fstab
```

### Usando curl

```bash
# Listar diretorio
curl -X PROPFIND http://localhost:5214/ \
  -u usuario:senha \
  -H "Depth: 1"

# Criar diretorio
curl -X MKCOL http://localhost:5214/nova-pasta \
  -u usuario:senha

# Upload de arquivo
curl -T arquivo.txt http://localhost:5214/arquivo.txt \
  -u usuario:senha

# Download de arquivo
curl -o arquivo.txt http://localhost:5214/arquivo.txt \
  -u usuario:senha
```

## Arquitetura de Implementacao

O WebDAV e implementado usando o pacote `golang.org/x/net/webdav`, com o padrao de adaptador:

```go
// Adaptador: adapta o sistema de arquivos em memoria para webdav.FileSystem
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

## Gerenciamento de Locks

Os locks do WebDAV sao usados para prevenir conflitos de escrita concorrente:

- **Lock exclusivo**: Apenas um cliente pode modificar o recurso por vez
- **Lock compartilhado**: Multiplos clientes podem ler simultaneamente, mas nao escrever
- **Time out do lock**: Locks expirados sao liberados automaticamente
- **Token de lock**: Usado para identificar e desbloquear

## Gerenciamento de Propriedades

O WebDAV suporta dois tipos de propriedades:

- **Live Properties**: Calculadas dinamicamente, como tamanho do arquivo, data de modificacao
- **Dead Properties**: Atributos XML personalizados definidos pelo usuario

## Notas

- Arquivos criados via WebDAV ficam visiveis em tempo real na interface de administracao web
- O limite de tamanho de arquivo e controlado pela cota do espaco
- Recomenda-se o uso de HTTPS para proteger a comunicacao WebDAV