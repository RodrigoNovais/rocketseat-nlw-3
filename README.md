<h1 align='center' >
    <img alt='Happy' src='.github/banner.png' />
</h1>

<p align='center'>
    Leve felicidade para o mundo, visite orfanatos e mude o dia de muitas crianças.</br>
    Projeto da Next Level Week #03 Omnistack - RocketSeat
</p>

<p id='insomniaButton' align='center'>
    <a href="https://insomnia.rest/run/?label=Happy&uri=https%3A%2F%2Fgist.github.com%2FRodrigoNovais%2F368435b9eb6f269c3db4ba72462cf54a" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

<p align='center'>
    <img alt='Happy' src='.github/happy.png' width='100%'>
</p>

## 💻 Executando o Happy

### Pré-requisitos

É necessário ter instalado na sua máquina para execução desse projeto:
- [Git](https://git-scm.com)
- [NodeJS](https://nodejs.org/)
- [Gerenciador de pacotes](https://www.npmjs.com)

### ⌨ Baixando o projeto

```bash
# Clone o Repositório
$ git clone git@github.com:RodrigoNovais/rocketseat-nlw-3.git happy

# Acesse a pasta do projeto
$ cd happy
```

### 🗄️ Configurando o modulo do servidor
```bash
# Acesse a pasta do servidor
$ cd server

# Instale as dependências
$ npm install

# Adicione as variáveis de ambiente
-> Crie um arquivo com o nome '.env'
# Salve o token no arquivo .env
-> PORT=4000

# Execute as migrations do banco de dados
$ npm run knex:migrate

# Execute o projeto
$ npm run start
```

### 🖥️ Configurando o modulo do site
```bash
# Acesse a pasta do servidor
$ cd web

# Instale as dependências
$ npm install

# Adicione as variáveis de ambiente
-> Crie um arquivo com o nome '.env'
# Crie uma conta gratuita no MapBox para pegar seu token
-> https://account.mapbox.com
# Salve o token no arquivo .env
-> REACT_APP_MAPBOX_TOKEN=TOKEN

# Execute o projeto
$ npm run start
```

### 📱 Configurando o modulo do aplicativo
```bash
# Acesse a pasta do servidor
$ cd mobile

# Instale as dependências
$ npm install

# Execute o projeto
$ npm run start
```
