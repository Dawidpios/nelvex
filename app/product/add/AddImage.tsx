"use client";
import { useState } from "react";
import { PickerOverlay } from "filestack-react";
import { useGlobalContext } from "../../Context/store";

const AddImage = () => {
  const { setProductImageUrl } = useGlobalContext();
  const [showPicker, setShowPicker] = useState(false);

  const handlePicker = () => {
    setShowPicker((prev) => !prev);
  };

  return (
    <>
      <button onClick={handlePicker}>Add product image</button>
      {showPicker && (
        <PickerOverlay
          apikey={process.env.FILESTACK_API as string}
          pickerOptions={{
            fromSources: ["local_file_system", "url"],
            onUploadDone: (data) => {
              
            },
            onClose: () => handlePicker(),
            accept: ["image/*"],
            maxFiles: 1,
            minFiles: 1,
            imageMax: [300, 150],
          }}
        ></PickerOverlay>
      )}
    </>
  );
};

export default AddImage;
