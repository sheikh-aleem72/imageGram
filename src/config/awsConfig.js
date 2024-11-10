import AWS, { S3 } from "aws-sdk";

const s3 = new AWS.S3({
  region: "",
  accessKeyId: "",
  secretAccessKey: "",
});

export default S3;
