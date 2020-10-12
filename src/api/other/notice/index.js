/*
 * @Descripttion:公告服务
 * @Author: congz
 * @Date: 2020-09-26 19:04:22
 * @LastEditors: congz
 * @LastEditTime: 2020-10-12 16:59:57
 */
import axios from 'axios';

// 新建公告
const createNotice = form => axios.post('/api/v1/notices', form).then(res => res.data);
// 获取公告
const getNotice = notice_id => axios.get(`/api/v1/notices/${notice_id}`).then(res => res.data);
// 修改公告
const updateNotice = form => axios.put('/api/v1/notices', form).then(res => res.data);
// 删除公告
const deleteNotice = notice_id => axios.delete('/api/v1/notices', { data: { notice_id: notice_id } }).then(res => res.data);

export { createNotice, getNotice, updateNotice, deleteNotice };
