import { Card, Carousel } from 'antd';
import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import services from '@/services';

export default () => {
  const [noticeList, setNoticeList] = useState<any[]>([]);

  useAsyncEffect(async () => {
    const items: any = await services.system.overview.getNoticeList();
    setNoticeList(items);
  }, []);

  return (
    <Card bordered className="notice-card">
      {noticeList?.length ? (
        <Carousel autoplay autoplaySpeed={10 * 1000} effect="fade">
          {noticeList.map((item, index) => {
            return <div key={index}>公告：{item?.content}</div>;
          })}
        </Carousel>
      ) : (
        <span>暂无公告</span>
      )}
    </Card>
  );
};
