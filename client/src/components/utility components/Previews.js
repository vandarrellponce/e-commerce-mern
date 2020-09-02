import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


const Previews = (props) => {

  

    const [files, setFiles] = useState([]);
    //const [images, setImages] = useState([])

    const onDrop = (acceptedFiles) => {
        
        // FOR PREVIEW
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file) })))
        
        // TO PASS TO PARENT COMPONENT - PASS ORIGINIAL FILES
        props.updateImages(acceptedFiles)
        
       /*  let formData = new FormData()
        formData.append('file', acceptedFiles[0])
        
        const config = {
            header:{'content-type': 'multipart/form-data'}
        }

        Axios.post('/api/products/upload', formData, {config})
            .then(res => {
                setImages([...images, res.data])
                props.updateImages([...images, res.data])
                console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            }) */
      }
    const onDelete = (filename) => {
        setFiles([...files].filter(file => file.name !== filename))
        
    }

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop
    });


    const thumbs = files.map((file, i) => (
        <div style={thumb} key={i}>
        <div style={thumbInner}>
            <img
            src={file.preview}
            style={img}
            onClick = {e=> onDelete(file.name)}
            alt='preview'
            />
        </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section >
        <div {...getRootProps({className: 'dropzone'})} style={{border:'1px dashed gray', cursor:'crosshair'}}>
            <input {...getInputProps()} />
            <p style={{textAlign:'center'}}>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside style={thumbsContainer}>
            {thumbs}
        </aside>
        </section>
    );
    }

export default Previews