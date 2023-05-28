import { Empty } from 'antd';
import './admin-default-content.css';

export function AdminDefaultContent() {
  const emptyAdminText = 'Please, choose a Group, Subjects or Teachers from the side menu';

  return <Empty className="empty-default" description={emptyAdminText} />;
}
