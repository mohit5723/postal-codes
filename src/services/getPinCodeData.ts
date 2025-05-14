import { PIN_CODE_URL } from "../constants/ApiURL";
import type { PinCodeData } from "../types/PinCodeData";

export async function getPinCodeData(pincode: string) {
  try {
    const response = await fetch(PIN_CODE_URL + pincode);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data as PinCodeData[];
  } catch (error) {
    console.log(error);
  }
}
