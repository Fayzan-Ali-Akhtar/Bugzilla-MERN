import axios from "axios";

// Generic function to fetch data from the API
export async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
    } else {
      console.error("An unknown error occurred while fetching data.");
    }
    return {} as T; // Return an empty object as fallback
  }
}

// Generic function to fetch and process data
export async function fetchFromAPI<T>(url: string): Promise<T> {
  try {
    const rawData = await fetchData<T>(url);
    return rawData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("An unknown error occurred while fetching and processing data.");
    }
    return {} as T; // Return an empty object as fallback
  }
}
