"use client";

import { useEffect, useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/extension/file-upload";
import { Paperclip } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        PDF, CSV, or TXT
      </p>
    </>
  );
};

const FileUploaderChat = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [documents, setDocuments] = useState<any[] | null>([])
  const supabase = createClient()

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const handleFilesChange = async (files: File[] | null) => {
    setFiles(files)
    if (files) {
      const file = files[0]
      await supabase.storage.from('files').upload(`${crypto.randomUUID()}/${file.name}`, file)
    }
  };

  useEffect(() => {
    (async () => {
      const response = await supabase.from('documents_with_storage_path').select();
      if (response.status === 200) {
        console.log(response.data)
        setDocuments(response.data)
      }
    })()
  }, [])


  return (
    <FileUploader
      value={files}
      onValueChange={handleFilesChange}
      dropzoneOptions={dropZoneConfig}
      className="relative bg-background rounded-lg p-2 py-10"
    >
      <FileInput className="outline-dashed outline-1 outline-white">
        <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem key={i} index={i}>
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
      <div>
        <h2 className=" text-2xl my-3">Old files</h2>
        {documents && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {documents.map((document) => (
              <div
                className="flex flex-col gap-2 justify-center items-center border rounded-md p-4 sm:p-6 text-center overflow-hidden cursor-pointer hover:bg-slate-100"
                onClick={async () => {
                  if (!document.storage_object_path) {
                    toast.error('Failed to download file, please try again.')
                    return;
                  }

                  const { data, error } = await supabase.storage
                    .from('files')
                    .createSignedUrl(document.storage_object_path, 60);

                  if (error) {
                    toast.error('Failed to download file. Please try again.');
                    return;
                  }

                  window.location.href = data.signedUrl;
                }}
              >
                <svg
                  width="50px"
                  height="50px"
                  version="1.1"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m82 31.199c0.10156-0.60156-0.10156-1.1992-0.60156-1.6992l-24-24c-0.39844-0.39844-1-0.5-1.5977-0.5h-0.19922-31c-3.6016 0-6.6016 3-6.6016 6.6992v76.5c0 3.6992 3 6.6992 6.6016 6.6992h50.801c3.6992 0 6.6016-3 6.6016-6.6992l-0.003906-56.699v-0.30078zm-48-7.1992h10c1.1016 0 2 0.89844 2 2s-0.89844 2-2 2h-10c-1.1016 0-2-0.89844-2-2s0.89844-2 2-2zm32 52h-32c-1.1016 0-2-0.89844-2-2s0.89844-2 2-2h32c1.1016 0 2 0.89844 2 2s-0.89844 2-2 2zm0-16h-32c-1.1016 0-2-0.89844-2-2s0.89844-2 2-2h32c1.1016 0 2 0.89844 2 2s-0.89844 2-2 2zm0-16h-32c-1.1016 0-2-0.89844-2-2s0.89844-2 2-2h32c1.1016 0 2 0.89844 2 2s-0.89844 2-2 2zm-8-15v-17.199l17.199 17.199z" />
                </svg>

                {document.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </FileUploader>
  );
};

export default FileUploaderChat;
