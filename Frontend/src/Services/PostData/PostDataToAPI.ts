import axios from "axios";

// Generic function to send data using a POST request
export async function postDataToAPI<T>(url: string, data: T): Promise<T> {
  try {
    const response = await axios.post<T>(url, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // console.error("Error sending data:", error.message);
    } else {
      // console.error("An unknown error occurred while sending data.");
    }
    return {} as T; // Return an empty object as fallback
  }
}
