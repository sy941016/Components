/*
 * @Author: shiyuan
 * @Date: 2024-08-06 15:28:38
 * @LastEditors: shiyuan
 * @LastEditTime: 2024-08-09 10:45:12
 * @Description: 
 */
import { Editor } from '@/components';
import './index.less';

const EditorView = () => {

  const onEditorChange = ({ content }: any)=>{
    console.log('content--', content);
  }
  
  return (
    <Editor onChange={onEditorChange}/>
  );
};

export default EditorView;
