export interface PinCodeData {
  Message: string;
  Status: string;
  PostOffice: PostOffice[];
}

interface PostOffice {
  Name: string;
  Description: string;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Country: string;
}
