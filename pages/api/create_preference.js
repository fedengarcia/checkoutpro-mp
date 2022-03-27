// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mercadopago = require("mercadopago");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: "YOUR ACCESS TOKEN" //DEV or PROD

});


export default function(req, res) {
	return new Promise((resolve, reject) => {
		console.log("BODY ------> EXTRA DATA",req);
		let preference = {
			items: [
				{
					title: req.body[0].description,
					unit_price: req.body[0].unit_price,
					quantity: parseInt(req.body[0].quantity),
				}
			],
			back_urls: {
				"success": "http://localhost:3000/feedback",
				"failure": "http://localhost:3000/feedback",
				"pending": "http://localhost:3000/feedback",
			},
			auto_return: "approved",
		};

		// console.log(preference)

		mercadopago.preferences.create(preference)
		.then(function (response) {
			res.statusCode = 200
			res.setHeader('Content-type','application/json')
			res.json({
				id: response.body.id,
				redirect: response.body.init_point
			});
			resolve();

		}).catch(function (error) {
			console.log("TU ERROR ------------>")
			res.json(error);
			res.status(405).end();
			resolve();
		});

	});
	
	
}
