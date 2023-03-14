import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import {
	STORAGE_ENDPOINT,
	STORAGE_REGION,
	STORAGE_ACCESS_KEY_ID,
	STORAGE_SECRET_ACCESS_KEY,
	STORAGE_BUCKET_NAME
} from '$env/static/private';

const s3 = new S3Client({
	forcePathStyle: true,
	endpoint: STORAGE_ENDPOINT,
	region: STORAGE_REGION,
	credentials: {
		accessKeyId: STORAGE_ACCESS_KEY_ID,
		secretAccessKey: STORAGE_SECRET_ACCESS_KEY
	}
});

export async function upload(file: File) {
	const locationPath = `${uuidv4()}-${file.name}`;

	const command = new PutObjectCommand({
		Bucket: STORAGE_BUCKET_NAME,
		Key: locationPath,
		Body: (await file.arrayBuffer()) as Uint8Array
	});

	try {
		const response = await s3.send(command);
		console.log(response);
		return locationPath;
	} catch (error) {
		console.error(error);
	}
}
