import { IUserDocument } from "./userDocument.interface";
import * as express from "express";
import * as Archiver from "archiver";
const request = require("request").defaults({ encoding: null });

export function generateZip(UID:string,document: IUserDocument, res: express.Response) {
	res.writeHead(200, {
		"Content-Type": "application/zip",
		"Content-disposition": `attachment; filename=condidat_${UID}.zip`
	});

	const zip = Archiver("zip");

	// Send the file to the page output.
	zip.pipe(res);

	const photoStream = request(document.photoUrl.url);
	zip.append(photoStream, {
		name: `photo.${document.photoUrl.metadata.ext}`
	});
	const bacStream = request(document.bacUrl.url);
	zip.append(bacStream, { name: `bac.${document.bacUrl.metadata.ext}` });
	const identityStream = request(document.identityUrl.url);
	zip.append(identityStream, {
		name: `identity.${document.identityUrl.metadata.ext}`
	});

	// Create zip with some files. Two dynamic, one static. Put #2 in a sub folder.
	zip
		.finalize()
		.catch(err => {});
}
