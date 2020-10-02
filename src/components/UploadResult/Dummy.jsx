import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default class MyUpload extends React.Component {
  state = {
    fileList: [],
  };

  handleChange = info => {
    
    let fileList = [...info.fileList];

   
    // fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
  };

  render() {
    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange,
      multiple: true,
    };
    return (
      <Upload {...props} fileList={this.state.fileList}>
        <Button>
          {/* <UploadOutlined /> Upload */}
          Browse
        </Button>
      </Upload>
    );
  }
}
