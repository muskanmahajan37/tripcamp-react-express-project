import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import fetch from '../../store/csrf';

export default function UploadForm({
  link = "useruploads", divClass = "modal",
  formClass = 'form-container modal-content modal-content-center-items',
  redirectHome = true
}) {
  const [enableUpload, setEnableUpload] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("Please select a file");
  const uploadModalRef = useRef(null);
  const previewImgRef = useRef(null);
  const history = useHistory();

  async function getSignedRequest(file) {
    const res = await fetch(`/api/media/sign-s3?file-name=resources/images/${link}/${file.name}&file-type=${file.type}`);
    if (res.status === 200) {
      uploadFile(file, res.data.signedRequest, res.data.url);
      setFileToUpload(null);
      setEnableUpload(false);
      setUploadStatus("File uploaded sucssefully!");
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
    setUploadStatus("File ready to upload");

    // https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
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
  const handleCancelClick = e => {
    e.preventDefault();
    if (uploadModalRef.current)
      uploadModalRef.current.style.display = "none";
    if (redirectHome)
      history.push('/');
  }
  return (
    <div className={divClass} ref={uploadModalRef}>
      <form type='submit' className={formClass}>
        <h3>Upload Form</h3>
        {
          uploadStatus && <p style={{ color: 'green' }}>{uploadStatus}</p>
        }
        <label class="button button-selectFile">
          <i className="fa fa-image"></i> {(fileToUpload && fileToUpload.name) || "Choose File To Upload"}
          <input type="file" style={{ display: "none" }} name="image" id="file-input" onChange={onFileInputChange} files={fileToUpload} />
        </label>
        {
          fileToUpload && <img className='preview-image' alt="File to upload" ref={previewImgRef} />
        }
        <div className="button-div-upload">
          <button
            className='button button-Send'
            type='submit'
            disabled={!enableUpload}
            onClick={onUploadButtonClicked}
          >Upload</button>
          <button
            className='button button-Reset'
            onClick={handleCancelClick}
          > Cancel </button>
        </div>
      </form>
    </div>
  );
}