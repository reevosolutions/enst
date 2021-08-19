import { IUserDocument } from "./userDocument.interface";
import * as express from "express";
import * as fs from "fs";
import * as path from "path";
const PdfPrinter = require("pdfmake");

export function generateConvocation(
	UID: string,
	document: IUserDocument,
	res: express.Response
) {
	// Define font files
	const fonts = {
		Roboto: {
			normal:
				"node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf",
			bold:
				"node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf",
			italics:
				"node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf",
			bolditalics:
				"node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf"
		}
	};

	const printer = new PdfPrinter(fonts);

	const docDefinition = {
		content: [
			"First paragraph",
			"Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines"
		]
	};

	const options = {
		// ...
	};

	const doc = printer.createPdfKitDocument(docDefinition, options);
	const chunks = [];

	doc.on("data", chunk => {
		chunks.push(chunk);
	});

	doc.on("end", () => {
		const result = Buffer.concat(chunks);
		res.setHeader("Content-Type", "application/pdf");
		res.send(result); // Buffer data
	});

	doc.end();
}

export function generatePdf(res: express.Response) {
	// Define font files
	const fonts = {
		Roboto: {
			normal:
				"node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf",
			bold:
				"node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf",
			italics:
				"node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf",
			bolditalics:
				"node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf"
		}
	};

	const printer = new PdfPrinter(fonts);

	const docDefinition = {
		content: [
			"First paragraph",
			"Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines"
		]
	};

	const options = {
		// ...
	};

	const doc = printer.createPdfKitDocument(docDefinition, options);
	const chunks = [];

	doc.on("data", chunk => {
		chunks.push(chunk);
	});

	doc.on("end", () => {
		const result = Buffer.concat(chunks);
		res.setHeader("Content-Type", "application/pdf");
		res.send(result); // Buffer data
	});

	doc.end();
}
