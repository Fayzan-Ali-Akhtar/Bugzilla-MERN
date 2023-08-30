import { getOneManagerURL } from "../../Constants/Constants";
import { newGetData } from '../GetData/NewGetData';
import { addTokenToRequestHeader } from '../../Utils/outGoing';

export async function fetchManageName(managerID: string): Promise<string> {
  // console.log('managerID:', managerID);
  try {
    const config = {
      headers: {},
      params: {
        id: managerID 
      }
    };

    addTokenToRequestHeader(config);

    const managerData: any = await newGetData<any[]>(getOneManagerURL, config);
    const nameOfManager = managerData.manager.firstName + " " + managerData.manager.lastName;
    return nameOfManager;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
