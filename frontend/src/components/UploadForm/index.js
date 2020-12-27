import { useState, useRef, useEffect } from 'react';

import fetch from '../../store/csrf';

export default function UploadForm() {
  const [enableUpload, setEnableUpload] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const uploadModalRef = useRef(null);
  const previewImgRef = useRef(null);


  async function getSignedRequest(file) {
    const res = await fetch(`/api/media/sign-s3?file-name=resources/images/useruploads/${file.name}&file-type=${file.type}`);
    if (res.status === 200) {
      uploadFile(file, res.data.signedRequest, res.data.url);
      setFileToUpload(null);
      setEnableUpload(false);
    }
    else {
      //TODO: disable this alert and annouce something more userfriendly
      alert('Could not get signed URL.', res.error);
    }
  }

  async function uploadFile(file, signedRequest, url) {
    const res = await window.fetch(signedRequest, {
      method: 'PUT',
      body: file
    });
    if (res.status === 200) {
      //TODO: add to database and do some React/Redux rendering using the return url
    }
    else {
      alert('Could not upload file.');
    }
  }
  function onFileInputChange(e) {
    const files = e.target.files;
    const file = files[0];
    if (file == null) {
      return alert('No file selected.');
    }
    setEnableUpload(true);
    setFileToUpload(file);

    // https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      previewImgRef.current && previewImgRef.current.setAttribute('src', e.target.result); 
    }
  }

  function onUploadButtonClicked(e) {
    e.preventDefault();
    getSignedRequest(fileToUpload);
  }
  // useEffect(() => {
  //   console.log("fileToUpload", fileToUpload);
  //   if (fileToUpload) {
  //     const tmppath = fileToUpload.webkitRelativePath;
  //     console.log('full path fileToUpload', tmppath);
  //   }
  // });
  const handelCancelClick = e => {
    // console.log(uploadModalRef.current);
    if (uploadModalRef.current)
      uploadModalRef.current.style.display = "none";
  }
  return (
    <div className="modal modal-center-contents" ref={uploadModalRef}>
      <form type='submit' className='form-container modal-content'>
        <p id="status">{fileToUpload ? "File ready to upload" : "Please select a file"}</p>
        <label class="button button-selectFile">
          <i className="fa fa-image"></i> {(fileToUpload && fileToUpload.name) || "Choose File To Upload"}
          <input type="file" style={{ display: "none" }} name="image" id="file-input" onChange={onFileInputChange} files={fileToUpload} />
        </label>
        {
          fileToUpload && <img className='preview-image' alt="File to upload" ref={previewImgRef}/>
        }
        <div className="buttons-div">
          <button
            className='button button-Send'
            type='submit'
            disabled={!enableUpload}
            onClick={onUploadButtonClicked}
          >Upload</button>
          <button
            className='button button-Reset'
            onClick={handelCancelClick}
          > Cancel </button>
        </div>
      </form>
    </div>
  );
}