import { Button, Card, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ISubject } from '../../../../interfaces/interfaces';

interface SubjectsListProps {
  subjects: ISubject[];
  setPickedSubject: any;
  handleSubjectDelete: () => void;
  goToSubjectCreate: () => void;
}

export function SubjectsList({
  subjects,
  setPickedSubject,
  handleSubjectDelete,
  goToSubjectCreate
}: SubjectsListProps) {
  return (
    <>
      <List
        className="list-of-data"
        dataSource={subjects}
        renderItem={(subject) => (
          <Card key={subject.subjectId} className="list-item-card card" hoverable={false}>
            <List.Item key={subject.subjectId + `item`} className="list-item">
              <List.Item.Meta title={<p className="list-item-meta-p-title">{subject.name}</p>} />
              <Button
                className="teacher-button"
                onClick={() => {
                  setPickedSubject(subject);
                  handleSubjectDelete();
                }}
                icon={<DeleteOutlined />}></Button>
            </List.Item>
          </Card>
        )}
      />
      <Button className="new-teacher-button" onClick={goToSubjectCreate}>
        Add new subject
      </Button>
    </>
  );
}
