function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

if('serviceWorker' in navigator && 'Notification' in window) {

	window.onload = function() {

		navigator.serviceWorker.register('/projetosw/sw.js')
			.then(function(){
				console.log("ServiceWorker registrado com sucesso!");
			},
			function(e){
				console.log("Erro ao registrar o serviceWorker: ");
				console.log(e);
			});

		navigator.serviceWorker.ready
			.then(function(reg){

				var appCode = 'BOE-LtOZ9YiBAh0kJXfaHke9y0AvRxJQOX5xEMI7IEVrsFNyqlOiMAuYhusf69yysxEkKu9jT_OX3EnwJlG50uQ';

				var options = {
					userVisibleOnly:true,
					applicationServerKey:urlBase64ToUint8Array(appCode)
				};

			reg.pushManager.subscribe(options)
				.then(function(pushSubscription){
					console.log(JSON.stringify(pushSubscription));
					/*
					fetch(
						"https://meusite.com.br/notificacao/registro",
						{
							method:'POST',
							JSON.stringify(pushSubscription)
						}
					)
					.then(function(res){
						console.log("DEU");
					})
					.catch(function(e){
						console.log("DEU ERRO");
					});
					*/
				})
				.catch(function(error){
					console.log(error.message);
				});
		});

		//console.log(Notification.permission);
		Notification.requestPermission(function(permission){
			if(permission == 'granted') {
				console.log("PERMITIDO");
			} else {
				console.log("NEGADO");
			}
		});
	};
}