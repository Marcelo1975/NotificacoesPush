self.addEventListener('install', event => {
	console.log("Evento de Install");
	self.skipWaiting();
});

self.addEventListener('activate', event => {
	console.log("Evento de Activate");
});

self.addEventListener('push', event => {
	console.log("Evento de Push");
	var data = JSON.parse(event.data.text());
	//console.log(event.data.text());

	event.waitUntil(
		self.registration.showNotification(
			data.titulo,
			{
				body:data.corpo,
				icon:data.icon,
				requireInteraction:true,
				data:data,
				actions:[
					{title:"Arquivar", action:"arquivar"},
					{title:"Marcar Como Lido", action:"marcar_lido"}
				]
			}
		)
	);
});

self.addEventListener('notificationclick', event => {
	event.notification.close();

	var id = event.notification.data.id;
	if(event.action == 'arquivar') {
		console.log("Clicou em arquivar "+id);
	} else if(event.action == 'marcar_lido') {
		console.log("Clicou em marcado como lido "+id);
	} else {
		clients.openWindow(event.notification.data.url);
	}
});