import axios from 'axios';
import RNFS from 'react-native-fs';

const web3API = 'https://api.web3.storage/upload';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIzQzNBOUZENEY2QUM2YTBlRTAzZjU4YkZiMDZFNDU1MWVjNGZmMDEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzg3MDU3NjQ1NjQsIm5hbWUiOiJzb2xjbGFuIn0.Jto6InvwCEpKmK13r3c_FlDZxfbZeIpA34e5e-NYdjM';

export const saveJsonToFile = async (fileName: string, jsonData: any) => {
  const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}.json`;
  const jsonString = JSON.stringify(jsonData);

  try {
    await RNFS.writeFile(filePath, jsonString, 'utf8');
    console.log(`Saved ${fileName}.json to ${filePath}`);
    return `file://${filePath}`;
  } catch (error) {
    console.error(`Error saving ${fileName}.json to ${filePath}: ${error}`);
    return '';
  }
};

export const uploadMetadata = async (
  image_cid: string,
  name: string,
  description: string,
  symbol: string,
) => {
  const imageURL = `https://w3s.link/ipfs/${image_cid}`;

  const metadata = {
    name,
    description,
    image: imageURL,
    symbol,
  };
  console.log('Metadata: ', metadata);
  const fileUri = await saveJsonToFile('metadata', metadata);

  const metadataFileUpload = {
    uri: fileUri,
    type: 'application/json',
    name: 'metadata.json',
  };
  const formData = new FormData();
  formData.append('file', metadataFileUpload);

  const metadataResponse = await axios.post(web3API, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  const { cid } = metadataResponse.data;
  return cid;
};

export const uploadImage = async (imageUrl: string) => {
  const nftImage = {
    uri: imageUrl,
    type: 'image/jpeg',
    name: 'image.jpg',
  };

  const formData = new FormData();
  formData.append('file', nftImage);

  const imageResponse = await axios.post(web3API, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  const { cid } = imageResponse.data;
  return cid;
};
