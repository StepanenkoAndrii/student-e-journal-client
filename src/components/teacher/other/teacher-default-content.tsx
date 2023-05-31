import { Empty } from 'antd';
import './teacher-default-content.css';

export function TeacherDefaultContent() {
  const emptyTeacherText =
    'Please, choose a Subject and a Group to check or edit students grades and/or attendance';

  return <Empty className="empty-default" description={emptyTeacherText} />;
}
