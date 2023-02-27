import React, { useState } from "react";
import {
  Button,
  BorderedFlexContainer,
  Container,
  GridContainer,
  BorderedContainer,
} from "../../Global";

const ImageUploader = ({ handleImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Preview the image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    // Pass the selected file to the parent component
    handleImageUpload(selectedFile);
  };

  return (
    <BorderedContainer>
      <GridContainer width="100%" columns="1fr 100px">
        <input type="file" onChange={handleFileChange} />
        <Button
          btnColor={(props) => props.theme.colors.atsBlue}
          onClick={handleUploadClick}
          disabled={!selectedFile}
        >
          Upload
        </Button>
      </GridContainer>
      <BorderedFlexContainer width="100%">
        {previewUrl && <img height="100px" src={previewUrl} alt="Preview" />}
      </BorderedFlexContainer>
    </BorderedContainer>
  );
};

export default ImageUploader;
