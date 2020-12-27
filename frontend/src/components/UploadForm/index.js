import { useEffect } from 'react';

import fetch from '../../store/csrf';

export default function UploadForm() {
  useEffect(() => {
    document.getElementById("file-input").onchange = () => {
      const files = document.getElementById('file-input').files;
      const file = files[0];
      if (file == null) {
        return alert('No file selected.');
      }
      getSignedRequest(file);
    };
  })

  async function getSignedRequest(file) {
    const res = await fetch(`/api/media/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    console.log("upload from res", res);
    console.log('s3', res.data.signedRequest, res.data.url);
    if (res.status === 200) {
      uploadFile(file, res.data.signedRequest, res.data.url);
    }
    else {
      alert('Could not get signed URL.', res.error);
    }
  }

  function uploadFile(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // document.getElementById('preview').src = url;
          // document.getElementById('avatar-url').value = url;
        }
        else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }
  return (
    <div>
      <input type="file" id="file-input" />
      <p id="status">Please select a file</p>
      {/* <img id="preview" src="/images/default.png" /> */}

      <form type='submit'>
        {/* <input type="hidden" id="avatar-url" name="avatar-url" value="/images/default.png" /> */}
        <input type="text" name="username" placeholder="Username" /><br />
        <input type="text" name="full-name" placeholder="Full name" /><br /><br />
        <button >Upload</button>
      </form>
    </div>
  );
}