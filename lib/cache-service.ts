import type { PersonalData, Project, Skill, SocialLink } from "@/lib/schema";

const DB_NAME = "PortfolioCacheDB";
const DB_VERSION = 1;
const STORE_NAME = "portfolioData";

export interface CachedData {
	lastModified: string;
	projects: Project[];
	services: Skill[];
	personalData: PersonalData | null;
	socialLinks: SocialLink[];
	imageBlobData: Record<string, Blob>; // URL -> Blob object
}

/**
 * Initialize IndexedDB
 */
function openDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			// Create object store if it doesn't exist
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME);
			}
		};
	});
}

/**
 * Get cached data from IndexedDB
 */
export async function getCachedData(): Promise<CachedData | null> {
	try {
		const db = await openDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(STORE_NAME, "readonly");
			const store = transaction.objectStore(STORE_NAME);
			const request = store.get("portfolioData");

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve(request.result || null);
		});
	} catch (error) {
		console.error("Failed to get cached data:", error);
		return null;
	}
}

/**
 * Set cached data in IndexedDB
 */
export async function setCachedData(data: CachedData): Promise<void> {
	try {
		const db = await openDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(STORE_NAME, "readwrite");
			const store = transaction.objectStore(STORE_NAME);
			const request = store.put(data, "portfolioData");

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve();
		});
	} catch (error) {
		console.error("Failed to set cached data:", error);
		throw error;
	}
}

/**
 * Clear all cached data
 */
export async function clearCache(): Promise<void> {
	try {
		const db = await openDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(STORE_NAME, "readwrite");
			const store = transaction.objectStore(STORE_NAME);
			const request = store.clear();

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve();
		});
	} catch (error) {
		console.error("Failed to clear cache:", error);
		throw error;
	}
}

/**
 * Preload images and return Blob objects for caching
 */
export async function preloadImages(imageUrls: string[]): Promise<Record<string, Blob>> {
	const imageBlobData: Record<string, Blob> = {};

	await Promise.all(
		imageUrls.map(async (url) => {
			try {
				// Fetch the image
				const response = await fetch(url);
				if (!response.ok) {
					console.warn(`Failed to fetch image: ${url}`);
					return;
				}

				// Convert to blob
				const blob = await response.blob();
				imageBlobData[url] = blob;
			} catch (error) {
				console.error(`Error preloading image ${url}:`, error);
			}
		})
	);

	return imageBlobData;
}

/**
 * Create Blob URLs from stored Blobs
 */
export function createBlobUrls(imageBlobData: Record<string, Blob>): Record<string, string> {
	const imageBlobs: Record<string, string> = {};
	
	if (!imageBlobData) {
		return imageBlobs;
	}
	
	Object.entries(imageBlobData).forEach(([url, blob]) => {
		try {
			imageBlobs[url] = URL.createObjectURL(blob);
		} catch (error) {
			console.error("Error creating blob URL:", error);
		}
	});
	
	return imageBlobs;
}

/**
 * Cleanup blob URLs when data is cleared
 */
export function cleanupBlobURLs(imageBlobs: Record<string, string>): void {
	Object.values(imageBlobs).forEach((blobUrl) => {
		try {
			URL.revokeObjectURL(blobUrl);
		} catch (error) {
			console.error("Error revoking blob URL:", error);
		}
	});
}

