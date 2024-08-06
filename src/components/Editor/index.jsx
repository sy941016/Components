/*
 * @Author: shiyuan
 * @Date: 2024-08-06 15:28:10
 * @LastEditors: shiyuan
 * @LastEditTime: 2024-08-09 11:04:50
 * @Description: 
 */
import { CKEditor } from 'ckeditor4-react';
import { Toast } from 'antd-mobile';
import './index.less';

const OSS_SERVER = `upload/data`; // 上传地址
const TOKEN = ``;
const Editor = ({ onChange, content = '' }) => {
  const onEditor = ({ editor }) => {
    const content = editor.getData();
    onChange(content);
  }

  const handleFileUploadRequest = (evt) => {
    const fileLoader = evt.data.fileLoader;
    const formData = new FormData();
    formData.append('file', fileLoader.file);

    // 阻止默认行为，防止加载 Blob URL
    evt.stop();

    fetch(OSS_SERVER, {
      method: 'POST',
      body: formData,
      headers: {
        'Access-Token': TOKEN,
      },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        // 获取上传图片的 URL
        const imageUrl = data.url;

        if (imageUrl) {
          // 插入图片到编辑器中
          const editor = fileLoader.editor;
          const imgHtml = `<img src="${imageUrl}" alt="uploaded image" />`;
          // 插入光标位置
          editor.fire('lockSnapshot');
          editor.insertHtml(imgHtml);
          editor.fire('unlockSnapshot');

          // 更新文件加载器状态，取消 Blob 加载
          fileLoader.url = imageUrl;
          fileLoader.loaded = 1;
          fileLoader.update();

          // 手动触发内容变化事件以更新内容
          const updatedContent = editor.getData();
          onChange(updatedContent);
        }
      })
      .catch((error) => {
        console.error('文件上传失败:', error);
        Toast.show('文件上传失败');

        // 取消文件加载器状态，并清除任何插入的无效内容
        const editor = fileLoader.editor;

        // 在编辑器中查找并移除与当前 fileLoader 关联的所有图片元素
        editor.fire('lockSnapshot');
        editor.getCommand('undo').exec();
        editor.fire('unlockSnapshot');

        // 取消上传
        fileLoader.abort();
      });
  };

  return (
    <CKEditor
      className='editor-container'
      initData={content}
      onFileUploadRequest={handleFileUploadRequest}
      config={{
        toolbar: [
          // { name: 'document', items: ['Source'] }, // 源码
          { name: 'clipboard', items: ['Undo', 'Redo'] }, // 前进/后退
          { name: 'styles', items: ['Format', 'FontSize', 'TextColor', 'BGColor', 'Font'] }, // 文字
          { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'RemoveFormat'] }, // 格式
          { name: 'paragraph', items: ['NumberedList', 'BulletedList','JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] }, // 对齐方式
          { name: 'insert', items: ['EasyImageUpload','Table', 'HorizontalRule', 'SpecialChar'] }, // 表格及其他
          { name: 'tools', items: ['Maximize'] }, // 全屏
        ],
        format_tags: 'p;h1;h2;h3;h4;h5;h6',
        height: 600,
        removePlugins: 'image', // 移除 image 插件
        extraPlugins: 'easyimage,justify,format,font,colorbutton,panelbutton', // toolbar依赖插件
        filebrowserImageUploadUrl: OSS_SERVER,
        clipboard_handleImages: false,
      }}
      onChange={onEditor}
      onInstanceReady={() => {
        console.log( 'Editor is ready!' );
      }}
    />
  );
}

export default Editor;
