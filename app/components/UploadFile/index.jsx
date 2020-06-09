import React, {useCallback} from 'react';
import csv from 'csv';
import {useDropzone} from 'react-dropzone';
 
function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
 
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const text = reader.result
        csv.parse(text, (err, data) => {
          if (err) console.log("===err====", err)
          console.log("===data====", data)
        })
        
      }
      reader.readAsBinaryString(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: '.csv'})
 
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

export default MyDropzone;