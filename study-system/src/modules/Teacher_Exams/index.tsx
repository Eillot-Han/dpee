import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Button, Form, Input, message, List, InputNumber, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

type Paper = {
  id: string;
  title: string;
  tags: string[];
}

const defaultPapers: Paper[] = [
  { id: 'paper-1', title: '试卷示例1', tags: ['数据库'] },
  // 更多默认试卷...
]

export default function Teacher_Exams() {
  const [papers, setPapers] = useState(defaultPapers);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handlePaperGeneration = () => {
    // 在这里实现生成试卷的逻辑，例如调用mutationGQL中的相应方法
    // ...
    navigate('/generated-papers', { state: { selectedTags, quantity } }); // 跳转到生成试卷结果页面
  };

  return (
    <div className="teacher">
      <h1>查询试卷</h1>
      <List
        header={<div>现有试卷列表</div>}
        bordered
        dataSource={papers}
        renderItem={(paper: Paper) => (
          <List.Item>
            <List.Item.Meta
              title={paper.title}
              description={paper.tags.join(', ')}
            />
          </List.Item>
        )}
      />
      <div className="generate-paper-form">
        <Form layout="inline">
          <Form.Item label="标签">
            <Select
              mode="tags"
              style={{ width: '100%' }}
              tokenSeparators={[' ', ',']}
              placeholder="请输入或选择标签"
              value={selectedTags}
              onChange={setSelectedTags}
            >
              {/* 从API获取所有可用标签并渲染 */}
            </Select>
          </Form.Item>
          <Form.Item label="数量">
            <InputNumber
              min={1}
              value={quantity}
              onChange={(value) => setQuantity(value as number)} 
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={handlePaperGeneration}
              disabled={!selectedTags.length || !quantity}
            >
              生产试卷
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}