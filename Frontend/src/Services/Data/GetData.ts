import { fetchFromAPI } from './GetDataFromAPI';

// Reusable getData function
export async function getData<T>(url: string): Promise<T> {
  try {
    const data = await fetchFromAPI<T>(url);
    // console.log('Data:', data);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('An unknown error occurred while fetching and processing data.');
    }
    return {} as T; // Return an empty object as fallback
  }
}
