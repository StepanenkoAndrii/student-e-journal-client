import { Empty } from 'antd';
import './not-found.css';

export function NotFound() {
  const notFoundText = 'Either route is invalid or you are not authenticated';

  return <Empty className="empty-default" description={notFoundText} />;
}
