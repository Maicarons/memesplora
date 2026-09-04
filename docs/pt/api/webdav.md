# Referencia do Protocolo WebDAV

## Visao Geral

Memesplora suporta o protocolo WebDAV, permitindo mapear espacos de armazenamento como unidades de rede e operar arquivos diretamente no gerenciador de arquivos do sistema operacional.

## Endpoint

**Endereco WebDAV**: `http://localhost:5214`

## Autenticacao

O WebDAV usa autenticacao HTTP Basic Auth.

## Metodos Suportados

| Metodo | Descricao |
|--------|-----------|
| PROPFIND | Obter propriedades do recurso e membros da colecao |
| PROPPATCH | Modificar propriedades do recurso |
| MKCOL | Criar colecao (diretorio) |
| GET | Obter conteudo do recurso |
| PUT | Enviar recurso |
| DELETE | Excluir recurso |
| COPY | Copiar recurso |
| MOVE | Mover recurso |
| LOCK | Bloquear recurso |
| UNLOCK | Desbloquear recurso |

## Exemplos de Uso

### macOS Finder

```
Menu > Ir > Conectar ao Servidor
Digite: http://localhost:5214
```

### Windows Explorer

```
Clique direito em "Este Computador" > Mapear unidade de rede
Digite: http://localhost:5214
```

### Linux

```bash
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```

### curl

```bash
# Listar diretorio
curl -X PROPFIND http://localhost:5214/ -H "Depth: 1"

# Criar diretorio
curl -X MKCOL http://localhost:5214/nova-pasta

# Upload de arquivo
curl -T arquivo.txt http://localhost:5214/arquivo.txt
```

## Detalhes da Arquitetura

Consulte [Arquitetura do Protocolo WebDAV](/pt/architecture/webdav) para entender o design detalhado.