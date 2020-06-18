import React, {useCallback} from 'react';
import Papa from 'papaparse';
import {useDropzone} from 'react-dropzone';
 
function MyDropzone(props) {
  const {handleCloseModal, uploadCsv} = props;
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      Papa.parse(file, {
        header: true,
        transformHeader:function(h) {
          const newH = h.replace(/[^A-Z0-9]+/ig, '_');
          return newH.replace(/_$/g, '').toLowerCase().trim();
        },
        complete: function(result){
          console.log("====result==", result);
          uploadCsv(result.data);
          handleCloseModal(false);
        },
        error: function(err){
          console.log("==errors==", err);
        }
      })
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