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

export async function upload({ name: filename }: File) {
	console.log('config', s3.config)
	// const target = { Bucket: 'svelte-kit-bucket', Key: uuidv4(), Body: stream };
	const command = new PutObjectCommand({
		Bucket: STORAGE_BUCKET_NAME,
		Key: `${uuidv4()}${filename}`,
		Body: 'Hello S3!'
	});

	try {
		const response = await s3.send(command);
		console.log(response);
	} catch (err) {
		console.error(err);
	}

}
