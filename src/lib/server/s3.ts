import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
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

const ONE_HOUR = 60 * 60;

export async function getDownloadUrl(locationPath: string | null) {
	if (!locationPath) return '';

	const command = new GetObjectCommand({
		Bucket: STORAGE_BUCKET_NAME,
		Key: locationPath
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return await getSignedUrl(s3, command, { expiresIn: ONE_HOUR });
}

export async function upload(file: File) {
	if (file.size <= 0) return;

	const locationPath = `${Date.now()}-${file.name}`;

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

export async function remove(locationPath: string | null) {
	if (!locationPath) return '';

	const command = new DeleteObjectCommand({
		Bucket: STORAGE_BUCKET_NAME,
		Key: locationPath
	});

	try {
		const response = await s3.send(command);
		console.log(response);
	} catch (error) {
		console.error(error);
	}
}
