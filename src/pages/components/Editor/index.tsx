/*
 * @Author: shiyuan
 * @Date: 2026-10-12 10:00:00
 * @Description: Editor 富文本编辑器组件文档页
 */
import { message } from 'antd';
import { Editor } from '@/components';
import { ApiTable, DemoCard, DocPage } from '../common';

const apiData = [
  {
    key: '1',
    name: 'onChange',
    description: '富文本内容变化回调，返回 HTML 字符串',
    type: '(content: string) => void',
    defaultValue: '-',
  },
  {
    key: '2',
    name: 'content',
    description: '初始 HTML 内容',
    type: 'string',
    defaultValue: "''",
  },
];

const EditorDoc = () => {
  return (
    <DocPage
      title="Editor 富文本编辑器"
      description="基于 CKEditor 4 的富文本编辑器，内置自定义工具栏与图片上传插件。"
    >
      <DemoCard title="基础用法" description="编辑内容并在控制台输出 HTML">
        <Editor
          onChange={(content: string) => {
            console.log('content--', content);
            message.info('内容已更新（详见控制台）');
          }}
        />
      </DemoCard>

      <ApiTable data={apiData} />
    </DocPage>
  );
};

export default EditorDoc;
