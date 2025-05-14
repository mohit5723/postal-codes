import type { Ref } from "react";
import Button from "./Button";

interface SearchComponentProps {
  isPinCode: boolean;
  onSelectPinCode: () => void;
  onSearchClick: () => void;
  onSelectPostOffice: () => void;
  inputRef: Ref<HTMLInputElement>;
}

function SearchComponent({
  onSelectPinCode,
  onSearchClick,
  onSelectPostOffice,
  isPinCode,
  inputRef,
}: SearchComponentProps) {
  return (
    <div className="m-2">
      <div className="flex gap-2 my-2">
        <Button isActive={isPinCode} onClick={onSelectPinCode}>
          Search by Pin Code
        </Button>
        <Button isActive={!isPinCode} onClick={onSelectPostOffice}>
          Search by Post Office
        </Button>
      </div>
      <div>
        <input
          type="text"
          ref={inputRef}
          placeholder={
            isPinCode ? "Search by pin code" : "Search by post office"
          }
          className="border-2 border-black rounded"
        />
        <Button onClick={onSearchClick} isActive={true}>
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchComponent;
