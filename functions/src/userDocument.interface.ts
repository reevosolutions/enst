export interface IResults {
	accepted: boolean;
	written: number;
	oral: number;
	moyen: number;
	success: boolean;
	finalSubscribed: boolean;
}

export let DefaultResults: IResults = {
	accepted: false,
	written: null,
	oral: null,
	moyen: null,
	success: false,
	finalSubscribed: false
};

export interface IFile {
	url: string;
	metadata: {
		contentType: string;
		name: string;
		ext: string;
	};
}

export interface IUserDocument {
	firstName?: string;
	lastName?: string;
	birthday?: {
		day: number;
		month: number;
		year: number;
	};
	email?: string;
	tel?: string;
	bacYear?: number;
	bacCode?: number;
	bacMoyen?: number;
	bacFiliere?: string;
	photoUrl?: IFile;
	bacUrl?: IFile;
	identityUrl?: IFile;
	results?: IResults;
}
