"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/extension/file-upload";
import { Paperclip } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { parseCsvFile, parseTxtFile } from "@/services/FileParsingService";
import axios from "axios";
import { useParams } from "next/navigation";
import { LoadingButton } from "@/components/extension/LoadingButton";
import LoadingWrapper from "@/components/ui/LoadingWrapper";

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
  const { chatbotId: chatId, id } = useParams() as { chatbotId: string, id: string }
  const [loading, setLoading] = useState(true)

  const chatbotId = chatId || id

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  async function uploadFile(file: any, userId: string, chatbotId: string) {
    const filePath = `${userId}/${chatbotId}/${file.name}`;

    const { data, error } = await supabase.storage
      .from('files')
      .upload(filePath, file);

    if (error) {
      toast.error(`Error uploading file:, ${error}`)
      console.error('Error uploading file:', error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('files')
      .getPublicUrl(filePath);

    return { filePath, publicUrl };
  }

  async function storeFileMetadata(userId: string, chatbotId: string, filePath: string, fileUrl: string, fileName: string) {
    const { data, error } = await supabase
      .from('filesdata')
      .insert([
        {
          user_id: userId,
          chatbot_id: chatbotId,
          file_path: filePath,
          file_url: fileUrl,
          file_name: fileName,
        },
      ]).select('*');

    if (error) {
      console.error('Error storing file metadata:', error.message);
      return null;
    }

    console.log('File metadata stored:', data);
    return data;
  }

  async function uploadAndStoreFile(file: any, userId: string, chatbotId: string) {
    // Step 1: Upload the file
    const uploadResult = await uploadFile(file, userId, chatbotId);
    if (!uploadResult) {
      return { success: false, message: 'File upload failed.' };
    }

    const { filePath, publicUrl } = uploadResult;

    // Step 2: Store the metadata in the database
    const metadataResult = await storeFileMetadata(userId, chatbotId, filePath, publicUrl, file.name);
    console.log('metadataResult->', metadataResult)
    if (!metadataResult) {
      return { success: false, message: 'Metadata storage failed.' };
    }

    return { success: true, data: metadataResult };
  }


  async function createdEmbeddings(fileText: string, filesDataObjId: string) {

    const dataObject = {
      text: fileText,
      metadata: {
        fileContent: fileText
      }
    }

    const { data, error } = await supabase.from('ingesteddata').insert({ content: fileText, type: 'file', chatbot_id: chatbotId }).select('id')

    if (error) {
      console.error('Error inserting data to DB:', error);
      throw new Error('Failed to insert data to DB')
    }

    const ingestedDocId = data[0].id

    const { error: dbError } = await supabase.from('filesdata').update({ ingested_data_id: ingestedDocId }).eq('id', filesDataObjId)

    if (dbError) {
      console.error('Error updating ingested data in DB:', dbError);
      throw new Error('Failed to update ingested data in DB')
    }

    const response = await axios.post('/api/embedding-service', { data: dataObject, chatbotId: chatbotId, dataType: 'file', ingestedDocId: ingestedDocId })
    if (response.status === 200) {
      toast.success('Embeddings generated and stored successfully')
      return { success: true }
    } else {
      toast.error('Failed to generate embeddings and store in DB')
      console.error(response)
      return null;
    }
  }

  const handleFilesChange = async (files: File[] | null) => {
    try {
      setLoading(true)
      setFiles(files);

      if (files && files[0]) {
        const file = files[files.length - 1];
        let fileText = '';

        const headers = {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          "Content-Type": 'application/json'
        }

        if (file.type === 'text/plain') {
          fileText = await parseTxtFile(file);
        } else if (file.type === 'text/csv') {
          fileText = await parseCsvFile(file);
        } else if (file.type === 'application/pdf') {
          const formData = new FormData();
          formData.append('file', file);
          const response = await axios.post('/api/parse-pdf-file', formData)

          console.log(response)
          fileText = response.data.text;
        } else {
          console.error('Unsupported file type:', file.type);
        }


        if (!fileText) {
          toast.error('Failed to parse the file');
          return;
        }


        const { user } = (await supabase.auth.getUser()).data
        if (!user) return;

        await uploadAndStoreFile(file, user.id, chatbotId).then(async result => {
          if (result.success) {
            if (result.data) {
              await createdEmbeddings(fileText, result.data[0].id)
              fetchAllFiles()
            }

            console.log('File and metadata stored successfully:', result.data);
          } else {
            toast.error(`Error storing file and metadata: ${result.message}`);
            console.error('Error:', result.message);
          }
        })

      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  };

  const fetchAllFiles = useCallback(async () => {

    const { user } = (await supabase.auth.getUser()).data
    if (!user) return;
    try {
      setLoading(true)
      const response = await supabase.from('filesdata').select()
        .eq('chatbot_id', chatbotId)
        .eq('user_id', user.id);
      if (response.status === 200) {
        console.log(response.data)
        setDocuments(response.data)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }, [supabase, chatbotId])

  useEffect(() => {
    fetchAllFiles();
  }, [fetchAllFiles])

  const downloadFile = async (doc: any) => {
    try {
      setLoading(true)
      if (!doc.file_path) {
        toast.error('Failed to download file, please try again.')
        return;
      }

      const { data, error } = await supabase.storage
        .from('files')
        .createSignedUrl(doc.file_path, 60);

      if (error) {
        toast.error('Failed to download file. Please try again.');
        return;
      }

      if (data.signedUrl) {
        const a = document.createElement('a');
        a.href = data.signedUrl;
        a.download = doc.file_name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  async function removeFile(doc: any) {
    setLoading(true)
    const { id, file_path, ingested_data_id } = doc
    // const doc
    try {
      // Step 1: Delete the file from the Supabase Storage
      const { error: storageError } = await supabase
        .storage
        .from('files') // Replace with your actual bucket name
        .remove([file_path]);

      if (storageError) {
        console.error('Error removing file from storage:', storageError.message);
        return { success: false, message: 'Error removing file from storage' };
      }

      console.log('File removed from storage:', file_path);

      // Step 2: Delete the metadata from the filesdata table
      const { error: dbError } = await supabase
        .from('ingesteddata')
        .delete()
        .eq('id', ingested_data_id);

      if (dbError) {
        console.error('Error removing ingested data from database:', dbError.message);
        return { success: false, message: 'Error removing ingested data from database' };
      }

      console.log('File metadata removed from database:', ingested_data_id);
      fetchAllFiles();

    } catch (error) {
      console.error('Unexpected error removing file:', error);
      return { success: false, message: 'Unexpected error removing file' };
    } finally {
      setLoading(false)
    }
  }


  return (
    <LoadingWrapper loading={loading}>
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
        <div>
          <h2 className=" text-2xl my-3">Old files</h2>
          {documents && (
            <div className="flex flex-col gap-2">
              {documents.map((doc, index) => (
                <div key={index} className=" flex flex-row items-center ">
                  <div className=" flex-1">
                    <div
                      className="w-full flex flex-row items-center gap-3 "
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

                      {doc.file_name}

                    </div>
                  </div>
                  <div className=" flex flex-row gap-2">
                    <LoadingButton onClick={() => downloadFile(doc)} >Download</LoadingButton>
                    <LoadingButton onClick={() => removeFile(doc)} variant={'destructive'}>Remove</LoadingButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </FileUploader>
    </LoadingWrapper>
  );
};

export default FileUploaderChat;
