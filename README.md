<img src="https://github.com/user-attachments/assets/813b7b34-377c-42e8-9f1a-12e27e682c7f" alt="Evolution API">

<p align="center"><br>
Este Community Nodes é uma solução 100% gratuita, criada com o intuito de simplificar e auxiliar toda a comunidade a integrar e utilizar ao máximo os principais recursos oferecidos pela Evolution API v2 em seus projetos. Desenvolvido por OrionDesign.<br><br>
🚨<i><b> Obs:</b> Ainda em desenvolvimento</b></i>🚨<br>
</p>
<h1></h1>
<h3>📌 Recurso: Instancia</h3>
Este recurso oferece acesso a todas as principais funcionalidades relacionadas às instâncias da Evolution API. Com ele, você pode realizar diversas operações essenciais, como criar uma nova instância, conectar-se a ela, buscar informações, definir comportamentos personalizados, monitorar presença, reiniciar e até mesmo excluir instâncias de maneira simples e eficiente. <br><br>

Segue a lista das funções relacionadas:<br>

<details>
  <summary>✅ <b> Criar Instancia</b></summary>
	
 O nó "Criar Instância", assim como proprio nome já diz, cria uma nova instância na Evolution API. Você pode configurar o **Nome da Instância**, escolher a **API Key** e o **Número** para geração do "pairingCode", e ainda ajustar diversas opções adicionais, como **Comportamento**, **Proxy**, **Webhook**, **RabbitMQ**, e a integração com **Chatwoot.** Essa flexibilidade permite que à criação da instância seja adaptada a diferentes cenários e necessidades.

> Obs: Esta função funciona apenas se estiver usando a `Global API Key` nas credenciais da Evolution API. `ApiKey de instancia` **não** tem poder para criar novas instancias.


| Campo | Descrição | Obrigatório |
|----------|----------|----------|
| Nome Da Instância | Nome que será atribuido a instancia | ✅ |
| Apikey Para Instancia | ApiKey (token) que será utilizado para consumir api desta instancia | ❌ |
| Número Do WhatsApp | Numero que será utilizado para se conectar na instancia, usado para gerar o "pairingCode" | ❌ |
| Opções | Configurações e Integrações que podem ser adicionadas a instancia no momento de sua crição | ❌ |

Como já descrito, existe o campo de Opções, do qual você pode adicionar novas integrações a sua instancia, veja abaixo mais detalhes sobre cada opção:

<details>
  <summary>👉🏽 <b> Comportamento</b></summary>
  Aqui você pode definir como vai ser o comportamento da instancia:

  | Campo | Descrição | Obrigatório |
  |----------|----------|----------|
  | Rejeitar Ligações | Rejeitar automaticamente todas as ligações recebidas no Whatsapp | ❌ |
  | Mensagem Ao Rejeitar | Mensagem que será enviada automaticamente após rejeitar uma ligação | ❌ |
  | Ignorar Grupos | Não receber as mensagens de grupos na API | ❌ |
  | Sempre Online | Deixar o Status sempre como Online | ❌ |
  | Ler Mensagens | Todas as mensagens serão marcadas como lidas automaticamente, assim que recebidas | ❌ |
  | Ler Status | Os Status dos contatos salvos irão chegar na API | ❌ |
  | Sincronizar Histórico | Sincronizar todo o histórico de mensagens na API | ❌ |
	
</details>
<details>
  <summary>👉🏽 <b> Proxy</b></summary>
  Defina um Proxy para ser usado na instancia:

  | Campo | Descrição | Obrigatório |
  |----------|----------|----------|
  | Host do Proxy | Endereço ip/url do Proxy | ✅ |
  | Porta Do Proxy | Porta do seu Proxy | ✅ |
  | Protocolo Do Proxy | Protocolo Http (para IP ou URL sem SSL) ou Https (para URL com SSL) | ✅ |
  | Usuário Do Proxy | Usuario do Proxy | ✅ |
  | Senha Do Proxy | Senha do Proxy | ✅ |
 
</details>
<details>
  <summary>👉🏽 <b> Webhook</b></summary>
  Ative um endereço para consumir o Webhook a partir de eventos da Evolution API

  | Campo | Descrição | Obrigatório |
  |----------|----------|----------|
  | Url Do Webhook | Url que será enviado os eventos da Evolution API | ✅ |
  | Webhook Por Eventos | Cria uma rota para cada evento adicionando o nome do evento no final da URL | ✅ |
  | Base64 No Webhook | Envie os dados do base64 das mídias no webhook | ✅ |
  | Eventos | Eventos que vai disparar o webhook | ✅ |
	
</details>
<details>
  <summary>👉🏽 <b> RabbitMQ</b></summary>
  Sem informações ainda.
	
</details>
<details>
  <summary>👉🏽 <b> Chatwoot</b></summary>
  Sem informações ainda.
	
</details>

<h1></h1>
 
</details>
<details>
  <summary>✅ <b> Conectar Instancia</b></summary>
  
	
</details>
<details>
  <summary>✅ <b> Buscar Instancia</b></summary>
  
</details>
<details>
  <summary>✅ <b> Definir Comportamento</b></summary>
  
</details>
<details>
  <summary>✅ <b> Definir Presença</b></summary>
  
</details>
<details>
  <summary>✅ <b> Reiniciar Instancia</b></summary>
  
</details>
<details>
  <summary>✅ <b> Desconectar Instancia</b></summary>
  
</details>
<details>
  <summary>✅ <b> Deletar Instancia</b></summary>
  
</details>

<h1></h1>
<h3>📌 Recurso: Mensagem</h3>
<details>
  <summary>✅ <b> Enviar Texto</b></summary>
  
</details>
<details>
  <summary>✅ <b> Enviar Imagem</b></summary>
  
</details>
<details>
  <summary>✅ <b> Enviar Video</b></summary>
  
</details>
<details>
  <summary>✅ <b> Enviar Audio</b></summary>
  
</details>
<details>
  <summary>✅ <b> Enviar Documento</b></summary>
  
</details>
<details>
  <summary>✅ <b> Enviar Enquete</b></summary>
  
</details>
<details>
  <summary>✅ <b> Enviar Status</b></summary>
  
</details>

<h1></h1>
<h3>📌 Recurso: Evento</h3>
<details>
  <summary>✅ <b> Webhook</b></summary>
  
</details>
<details>
  <summary>✅ <b> RabbitMQ</b></summary>
  
</details>
<h1></h1>
<h3>📌 Recurso: Integração</h3>
<details>
  <summary>✅ <b> Proxy</b></summary>
  
</details>
<details>
  <summary>✅ <b> Evolution Bot</b></summary>
  
</details>
<details>
  <summary>✅ <b> Chatwoot</b></summary>
  
</details>

<details>
  <summary>✅ <b> Typebot</b></summary>
  
</details>
<details>
  <summary>✅ <b> Flowise</b></summary>
  
</details>
<details>
  <summary>✅ <b> Dify</b></summary>
  
</details>
<details>
  <summary>❌ <b> OpenAI</b></summary>
  
</details>
<details>
  <summary>❌ <b> S3</b></summary>
  
</details>
<br>
🚨<i><b> Obs:</b> Estas opções podem ser adicionadas ou removidas da versão final deste Node.</b></i>🚨<br>
