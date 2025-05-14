import type { PinCodeData } from "../types/PinCodeData";

interface DisplayPostalsProps {
  postalData: PinCodeData[];
  deliveryStatus: "Delivery" | "Non-Delivery" | "All";
}
function DisplayPostals({ postalData, deliveryStatus }: DisplayPostalsProps) {
  console.log(deliveryStatus, "component");
  console.log(postalData[0].PostOffice[0].DeliveryStatus, "delhi");

  return (
    <>
      <div>
        <div
          className={`flex justify-between ${
            postalData[0]?.Status !== "Success"
              ? "bg-red-400 text-white"
              : "bg-green-400 text-white"
          } p-2`}
        >
          <p>Message: {postalData[0]?.Message}</p>
          <p>Status: {postalData[0]?.Status}</p>
        </div>
      </div>
      {
        <div className="flex flex-col gap-2 m-2">
          {postalData[0]?.PostOffice.filter((postOfficeItem) => {
            if (deliveryStatus === "All") {
              return true;
            } else {
              return postOfficeItem.DeliveryStatus === deliveryStatus;
            }
          }).map((office) => {
            return (
              <div className="bg-blue-200 p-2">
                <div className="flex justify-between">
                  <p className="text-blue-800">{office.Name}</p>
                  <p
                    className={
                      office.DeliveryStatus === "Delivery"
                        ? "bg-green-400 rounded"
                        : "bg-red-400 rounded"
                    }
                  >
                    {office.DeliveryStatus}
                  </p>
                </div>
                <div className="rounded bg-gray-50 p-2">
                  <p>District: {office.District}</p>
                  <p>Division: {office.Division}</p>
                  <p>Region: {office.Region}</p>
                  <p>Country: {office.Country}</p>
                </div>
              </div>
            );
          })}
        </div>
      }
    </>
  );
}

export default DisplayPostals;
