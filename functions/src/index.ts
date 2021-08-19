import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import { generateConvocation, generatePdf } from './pdf';
import { generateZip } from './zip';
import { IUserDocument } from './userDocument.interface';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const storage = admin.storage();

const app = express();

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());

export const webApp = functions.https.onRequest(app);

app.get("/", (req, res) => {
	res.send("Hello");
});

app.get("/warm", (req, res) => {
	res.send("Calentando para la pelea");
});

app.get("/hello", (req, res) => {
	res.send("hello");
});

app.get(
	"/files/:UID",
	(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const UID = req.params.UID;
		db.collection("userFiles")
			.doc(UID)
			.get()
			.then(doc => {
				if (!doc.exists) {
					next(new Error("User not found"));
				} else {
					generateZip(UID, doc.data() as IUserDocument, res);
				}
			})
			.catch(function(error) {
				next(error);
			});
	}
);
app.get(
	"/convocation/:UID",
	(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const UID = req.params.UID;
		db.collection("userFiles")
			.doc(UID)
			.get()
			.then(doc => {
				if (!doc.exists) {
					next(new Error("User not found"));
				} else {
					generateConvocation(UID, doc.data() as IUserDocument, res);
				}
			})
			.catch(function(error) {
				next(error);
			});
	}
);
app.get(
	"/pdf",
	(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		generatePdf(res);
	}
);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send(err.stack);
});
