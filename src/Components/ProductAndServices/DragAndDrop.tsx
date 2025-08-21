import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RiCloseCircleFill } from 'react-icons/ri';

const DragAndDrop = ({ setFiles, files }: any) => {
  const handleDrop = (e: any) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    setFiles([...files, ...droppedFiles]);
  };

  const handleFileSelect = (e: any) => {
    setFiles([...files, ...e.target.files]);
  };

  const handelRemove = (id: any) => {
    const filterImage = files.filter((img: any, index: number) => index !== id);
    setFiles(filterImage);
  };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        border: 'dashed 2px lightgray',
        borderRadius: 5,
        height: 200,
        justifyContent: 'center',
      }}
    >
      <label htmlFor='file'>
        <h3 className='pointer'>Drag and Drop files here </h3>
        <input
          type='file'
          id='file'
          onChange={handleFileSelect}
          multiple
          hidden
          className='d-none'
        />
      </label>

      <div>
        {files.length ? (
          <Row>
            {files.map((file: any, index: number) => {
              return (
                <Col key={file.name}>
                  <div className='droppable-image-div pe-2 '>
                    <img
                      src={URL.createObjectURL(file)}
                      alt=''
                      height={150}
                      width={150}
                    />
                    <RiCloseCircleFill
                      onClick={() => handelRemove(index)}
                      className='droppable-image-remove pointer'
                      size={30}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;
