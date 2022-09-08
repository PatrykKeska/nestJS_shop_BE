export interface MulterDiskUploadedFiles {
  [fieldName: string]:
    | {
        filename: string;
        size: number;
        mimetype: string;
        originalname: string;
        encoding: string;
        path: string;
      }[]
    | undefined;
}
