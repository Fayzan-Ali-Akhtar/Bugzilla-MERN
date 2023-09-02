import axios, { AxiosError, AxiosResponse } from "axios";

// Reusable postData function
export async function postData<T>(url: string, data: T): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.post<T>(url, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
        if(error !== undefined && error.response !== undefined && error.response.data !== undefined )
        {
            if(error.response.data.error === "Email already in use!")
            {
                alert("Email already in use!");
            }
        if(error.response.data.error === "Invalid Credentials")
        {
            alert("Invalid Credentials");
        }
            // console.error("Error:", error.response.data.error);
            throw new Error(error.response.data.message);
        }
        else
        {
            throw new Error("Unknown error occurred while sending and processing data.")
        }
    } else {
      // console.error("An unknown error occurred while sending and processing data.");
      throw new Error("Unknown error occurred while sending and processing data.")
    }
  }
}
