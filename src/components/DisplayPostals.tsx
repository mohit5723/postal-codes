import type { PinCodeData } from "../types/PinCodeData";

interface DisplayPostalsProps {
  postalData: PinCodeData[];
  deliveryStatus: "Delivery" | "Non-Delivery" | "All";
  branchType: "All" | "Head Post Office" | "Sub Post Office";
}

function DisplayPostals({ postalData, deliveryStatus, branchType }: DisplayPostalsProps) {
  // Filter and sort the post offices
  const filteredPostOffices = postalData[0]?.PostOffice.filter((postOfficeItem) => {
    // Filter by delivery status
    const deliveryMatch = 
      deliveryStatus === "All" || 
      postOfficeItem.DeliveryStatus === deliveryStatus;
    
    // Filter by branch type
    const branchTypeMatch = 
      branchType === "All" || 
      postOfficeItem.BranchType === branchType;
    
    return deliveryMatch && branchTypeMatch;
  })

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
          {filteredPostOffices?.map((office) => {
            return (
              <div key={office.Name} className="bg-blue-200 p-2">
                <div className="flex justify-between">
                  <p className="text-blue-800">{office.Name}</p>
                  <div className="flex gap-2">
                    <span
                      className={
                        office.DeliveryStatus === "Delivery"
                          ? "bg-green-400 rounded px-2"
                          : "bg-red-400 rounded px-2"
                      }
                    >
                      {office.DeliveryStatus}
                    </span>
                    <span className="bg-yellow-400 rounded px-2">
                      {office.BranchType}
                    </span>
                  </div>
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
