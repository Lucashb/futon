Projeto FutON

Clonar projeto e buildar:

	git clone .....
	npm install
	
	palpiteiros      = npx react-native start
	palpiteirosAdmin = npx expo start
	palpiteirosWs    = Heroku

Como começar tudo:

	Email utilizado: lucashenrique_000@gmail.com (32462185kanawa)
	Git: lucashenrique_000@gmail.com (32462185kanawa)
	BitBucket: https://bitbucket.org/palpiteiros/palpiteirosapp
	NodeJs: Instalar na maquina pra rodar o "npm init / npm install"
	Heroku: lucashenrique_000@gmail.com (32462185kanawa)
	ClearDB: Dentro do heroku
	React Native: framework utilizado
	JavaScript
	Sequelize
	
MUDAR USUARIO DO GIT

	git config user.name "lucashb"
	git config credential.username "32462185kanawa"

	Comitado no git (https://github.com/Lucashb/palpiteiros.git)
	TOKEN do GIT para conectar via SSH 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
	
	git add .
	git checkout -b nomebranch
	git push -u origin nomebranch
	
	Depois abrir pull request e mergar no Bitbucket

AUTENTICAÇÃO GOOGLE DO APP

	Para autenticação Google Cloud (https://console.cloud.google.com/apis/credentials?project=amazing-thought-347305&supportedpurview=project)
	Chave Secreta do Google Cloud (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)
	ID do Client pra montar a URL de solicitação do email CONECTAR COM GOOGLE (78124351245-sjknt91v6nk4vfvt3c120q0nogvn6i9o.apps.googleusercontent.com)

SUBINDO NODE NO HEROKU (https://dashboard.heroku.com/apps/palpiteirosws/deploy/heroku-git)

	Usar o Authenticator

	heroku login
	heroku git:clone -a palpiteirosws
	cd palpiteirosws
	git add .
	git commit -am "make it better"
	git push heroku master

	MAS É NECESSÁRIO TAMBÉM FAZER O PUSH NO GIT

	git push origin master
	
BANCO DE DADOS - CONECTAR NO BANCO DE DADOS HEROKU

	mysql://b79c07b547e6ce:0d189fa9@us-cdbr-east-05.cleardb.net/heroku_b47cc24a363003c?reconnect=true

	Host: us-cdbr-east-05.cleardb.net
	User: b79c07b547e6ce
	Password: 0d189fa9
	Database: heroku_b47cc24a363003c
	
	Reiniciar sequence de tabelas (SELECT setval('public.students_id_seq', 34550, true);)

	ACESSAR SERVIÇO https://palpiteirosws.herokuapp.com/
	
Para chamar a API dos Campeonatos

	Partidas: https://api.football-data.org/v2/competitions/2013/matches

	Token: 0ecf8e42a0a540d48f6b6f19747fc999
	
Comandos Sequelize

CRIAR OS MIGRATIONS
	
	npx sequelize migration:create --name=create-NOMETABELA
	
CRIAR AS TABELAS
	
	npx sequelize db:migrate
	
	await queryInterface.createTable('brasileiraoas', {
	  id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	  },
	}

ADD COLUNA

	queryInterface.addColumn('Person', 'petName', { type: DataTypes.STRING });
	
REMOVER COLUNA

	queryInterface.removeColumn('Person', 'petName', { /* query options */ });
	
	async up (queryInterface, Sequelize) {
		await queryInterface.removeColumn(
			'partidasusuarios',
			'id_partidas_usuarios'
		);
	},

ALTERAR COLUNA

	await queryInterface.changeColumn('usuariosbrasileiraoas', 'id_partida_brasileirao_a', {
	  type: Sequelize.INTEGER,
	  allowNull: false,
	  references: {
		model: 'brasileiraoas',
		key: 'id'
	  }
	});
	
Drop Tabela
	
	await queryInterface.dropTable('campeonatobrasileiraoas');
	
RELOAD NO PROJETO

	rm -rf node_modules && npm install

PARA SUBIR NA AWS (https://www.youtube.com/watch?v=FQ3QwvtWiMA) (NÃO USAMOS MAIS)

	IP Pulbico: 52.87.217.92
	Conectar na maquina AWS: ssh -i C:/LucasNode/palpiteiros_chave.pem ubuntu@52.87.217.92
	
	Depois rodar os scripts:
	
		sudo apt-get update -y
		sudo apt-get upgrate -y
		sudo apt install nodejs -y
		sudo apt install npm -y
		sudo npm cache clean -f
		sudo npm install -g n
		sudo n stable
		sudo npm install pm2 -g
		sudo npm install yarn -g
		
    Fazer clone do GIT direto de dentro da maquina na AWS
	
	pm2 start src/server.js ou pm2 start src/server.js -xn 'palpiteiros'
	pm2 log
	pm2 ls: mostra uma lista de todas as aplicações sendo executadas.
	pm2 stop nomeprojeto (default)
	
	rmdir -p: deletar diretórios mesmo que nã sejam vazios
	rmdir: deletar diretórios vazios
	
	Arquivos protegidos
	
	sudo chattr -i nomearquivo
	rm -rf nomearquivo
	


GERAR APK COM EXPO ANDROID

	ABB = Dentro da pasta android ./gradlew bundleRelease --stacktrace

	APK = Dentro da pasta android ./gradlew assembleRelease --stacktrace

	eas build -p android --profile preview

Startar aplicação

	npx react-native start
	npx react-native run-android --variant=release
	
APP PLAY STORE

	Email para suporte: suportepalpiteirosoficial@gmail.com
	Email do Admon: palpiteirosAdmob@gmail.com
	FireBase: lucashenrique_000@hotmail.com
	
CONSULTAS

	truncate usuariosbrasileiraoarankings;
	truncate usuariosbrasileiraoas;
	truncate brasileiraoas;
	truncate campeonatos;
	truncate usuarios;

	select * from usuariosbrasileiraoarankings;
	select * from usuariosbrasileiraoas;
	select * from usuarios;
	select * from brasileiraoas;
	select * from campeonatos;

	-- Quantidade de campeonatos
	select count(*) from campeonatos;

	-- Quantidade de usuários
	select count(*) from usuarios;

	-- Se tem ligas duplicadas
	select count(*), a.id_campeonatos, a.id_usuario, a.numero_partida 
	 from usuariosbrasileiraoas a 
	group by a.id_campeonatos, a.id_usuario, a.numero_partida
	order by 1 desc;

	-- Se tem usuario duplicado
	select count(*), a.email from usuarios a group by a.email order by 1 desc;

	-- Insere Saques
	insert into saques(id,id_usuario,valor,status,createdat,updatedat,pix,titular,mensagem)
	values (16,'bruno.partelidona@gmail.com', 2, 'PENDENTE', '2022-07-08 02:09:41', '2022-07-08 02:09:41', 1, 1, ' ');

	-- Notificações iguais
	select a.token from notificacoes a 
	group by a.token
	having count(a.token) > 1;

	-- Pontuação maior da Rodada
	select * from usuariosbrasileiraoarankings a where a.id_campeonato  = 1557 and a.numero_partida = 19 order by a.pontuacao desc, a.ultima_atualizacao asc;

	-- Saques
	select sum(valor) from saques;

	select sum(valor) from saques s where status = 'PENDENTE';
	select sum(valor) from saques s where status = 'REALIZADO';
	select sum(valor) from saques s where status = 'ERRO';

	select * from saques s where status = 'PENDENTE';
	select * from saques s where status = 'REALIZADO';
	select * from saques s where status = 'ERRO';

	-- Usuarios por dia 
	select date_format(createdat, '%d/%m/%Y'), count(*) from usuarios group by date_format(createdat, '%d/%m/%Y') order by 2 desc;
	APP-ADS.TXT

Configurado via: https://www.app-ads-txt.com/email/verify

ADMINISTRADOR

INCLUIR CAMPEONATO BRASILEIRAO A

	NOME: BRASILEIRAO A
	CODIGO: 2013
	RODADA/STAGE: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
	PREMIO: Qualquer valor que quiser
	STATUS: ABERTO
	VERSAO API: v2 (por enquanto) / já pode usar v4

	ALTERAR CAMPEONATO BRASILEIRAO A 
	
		RODADA/STAGE: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
		CODIGO: 2013
		VERSAO API: v2 (por enquanto) / já pode usar v4
		
	ENCERRAR RODADA BRASILEIRAO A 
	
		RODADA: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
		CODIGO: 1557
		STATUS: ENCERRADO
	
INCLUIR PREMIER LEAGUE

	NOME: PREMIER LEAGUE
	CODIGO: 2021
	RODADA/STAGE: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
	PREMIO: Qualquer valor que quiser
	STATUS: ABERTO
	VERSAO API: v2 (por enquanto)

	ALTERAR PREMIER LEAGUE
	
		RODADA/STAGE: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
		CODIGO: 1490
		VERSAO API: v2 (por enquanto)
		
	ENCERRAR PREMIER LEAGUE 
	
		RODADA: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
		CODIGO: 1490
		STATUS: ENCERRADO
		
INCLUIR CAMPEONATO LIBERTADORES

	NOME: LIBERTADORES
	CODIGO: 2152
	RODADA/STAGE: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
	PREMIO: Qualquer valor que quiser
	STATUS: ABERTO
	VERSAO API: v2 (por enquanto)

	ALTERAR CAMPEONATO LIBERTADORES 
	
		RODADA/STAGE: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
		CODIGO: 2152
		VERSAO API: v2 (por enquanto)
		
	ENCERRAR RODADA LIBERTADORES
	
		RODADA: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
		CODIGO: 873
		STATUS: ENCERRADO
NOTIFICATION EXPO PUSH NOTIFICATION (FIREBASE)

	FireBase = https://console.firebase.google.com/u/0/project/palpiteirosnotify/analytics/app/android:com.scluckas.Palpiteiros/overview/~2F%3Ft%3D1657684807074&fpn%3D107589206782&swu%3D1&sgu%3D1&sus%3Dupgraded&cs%3Dapp.m.dashboard.overview&g%3D1

	Firebase Server Key = AAAAGQzRAv4:APA91bH1r94KoBhMgPnmTPvuoD1jQKm6rBaD5EXy0ers7IAkF2ehccyRQlhmPJZTaB8UqIcDuhsYKWlcUzFPX6h4QIQZSl58spVy2b9gOJnmDPDyiGvv7yeybOUtyJ-pFhKwhdzkBQrB

	Firebase Sender ID = 107589206782

	Google cloud = "current_key": "AIzaSyA5aeQGDpA2NSS7qzfF2cUR7Jd8RlVedlY"

	Notificações: https://docs.expo.dev/push-notifications/sending-notifications/

	https://expo.dev/notifications
	
HEROKU

Verificar saude da Hospedagem Node.js

	Size Node.js = 125.9 MiB of 500 MiB (13/07/2022)

Verificar saude do banco de dados 

	https://www.cleardb.com/database/details?id=1825759BC56C75142BAFCFE07CA19B19 - 5% (13/07/2022)
	
INTEGRAÇÃO FACEBOOK

	Email: suportepalpiteirosoficial@gmail.com
	Acessar: https://business.facebook.com/n/?pub%2Fhome%2F&business_id=572563114661398&ref=resurrection_email_1&aref=1662433465111459&medium=email&mid=5e7f92a9090d1G5b06e19b4e6fG5e7f9742693a3Ga9c&n_m=suportepalpiteirosoficial%40gmail.com&rms=v2&irms=true
	ID do APP = 816036009533550
	ID do aplicativo: 610501000757224
	Token = EAALmLjB44G4BAN1ueFkkBLLYuGpinRBIJzsxpnP4XZBkjvAZAlayZB0DjzK8PAdHohEZBuBNb67k9YBOqXglbIFiJ0izujnoIXQEDtfyKGUqcykzzjFNQugZBe0MAIEJFOe2xEwZABF7sn38ZCZATJEzZBmFOE9ZBH5Qz99LJX3nXcCMjLnUAeOUHO
	Face AD = 816036009533550_816040909533060

	IBAN - BR3260701190033440000286939FF

	https://business.facebook.com/pub/home/?business_id=468392758339100
	https://business.facebook.com/pub/home/?business_id=827435331970025 
	https://developers.facebook.com/apps/610501000757224/dashboard/?business_id=468392758339100

Certo 

	https://www.facebook.com/business/help/452287605232720?id=211412110064838
	
CRIAR TAREFA

	https://javascript.plainenglish.io/scheduled-background-task-in-react-native-app-6f1f02a0faa7 (react-native-background-task)
