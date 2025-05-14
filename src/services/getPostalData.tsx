import { type PinCodeData } from "../types/PinCodeData";

export async function getPinCodeData(pinCode: string): Promise<PinCodeData[]> {
  const response = await fetch(
    `https://api.postalpincode.in/pincode/${pinCode}`
  );
  const data = await response.json();
  return data;
}

export async function getPostOfficeData(
  postOfficeName: string
): Promise<PinCodeData[]> {
  const response = await fetch(
    `https://api.postalpincode.in/postoffice/${postOfficeName}`
  );
  const data = await response.json();
  return data;
}
