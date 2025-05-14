import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { PinCodeData } from "./types/PinCodeData";
import { getPinCodeData, getPostOfficeData } from "./services/getPostalData";
import Loading from "./components/Loading";
import SearchComponent from "./components/SearchComponent";
import DisplayPostals from "./components/DisplayPostals";

function App() {
  const [isPinCode, setIsPinCode] = useState<boolean>(true);
  const [postalData, setPostalData] = useState<PinCodeData[]>([]);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<
    "Delivery" | "Non-Delivery" | "All"
  >("All");
  const [branchType, setBranchType] = useState<"All" | "Head Post Office" | "Sub Post Office">("All");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getData() {
      if (!searchInput) return;

      // Validate pin code if isPinCode is true
      if (isPinCode && !/^\d{6}$/.test(searchInput)) {
        setErrorMessage("Please enter a valid 6-digit pin code.");
        return;
      }

      setIsLoading(true);
      try {
        const data = isPinCode 
          ? await getPinCodeData(searchInput)
          : await getPostOfficeData(searchInput);
        
        setHasSearched(true);

        if (data && data[0].Status !== "Error") {
          setPostalData(data);
          setErrorMessage(null);
        } else {
          setPostalData([]);
          setErrorMessage("No data found");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching data"+error);
        setPostalData([]);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [isPinCode, searchInput]);

  function handleSearchClick() {
    if (inputRef.current) {
      const inputValue = inputRef.current.value.trim();
      setSearchInput(inputValue);
    }
  }

  function handleSelectDelivery(e: ChangeEvent<HTMLSelectElement>) {
    setDeliveryStatus(e.target.value as "Delivery" | "Non-Delivery" | "All");
  }

  function handleSelectBranchType(e: ChangeEvent<HTMLSelectElement>) {
    setBranchType(e.target.value as "All" | "Head Post Office" | "Sub Post Office");
  }

  return (
    <>
      <SearchComponent
        inputRef={inputRef}
        onSelectPinCode={() => setIsPinCode(true)}
        onSearchClick={handleSearchClick}
        onSelectPostOffice={() => setIsPinCode(false)}
        isPinCode={isPinCode}
      />

      {!isLoading && !errorMessage && hasSearched ? (
        <>
          <div className="flex gap-4 p-2">
            <select
              className="border-2 p-2 rounded"
              name="delivery"
              id="delivery"
              onChange={handleSelectDelivery}
              value={deliveryStatus}
            >
              <option value="All">All Delivery Options</option>
              <option value="Delivery">Delivery</option>
              <option value="Non-Delivery">Non-Delivery</option>
            </select>
            
            <select
              className="border-2 p-2 rounded"
              name="branchType"
              id="branchType"
              onChange={handleSelectBranchType}
              value={branchType}
            >
              <option value="All">All Branch Types</option>
              <option value="Head Post Office">Head Post Office</option>
              <option value="Sub Post Office">Sub Post Office</option>
            </select>
          </div>
          <DisplayPostals
            deliveryStatus={deliveryStatus}
            branchType={branchType}
            postalData={postalData}
          />
        </>
      ) : (
        <Loading
          errorMessage={hasSearched ? errorMessage : null}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default App;