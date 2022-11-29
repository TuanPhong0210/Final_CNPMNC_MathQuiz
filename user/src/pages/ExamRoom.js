import { styled } from '@mui/material';
import { ExamContent, SidebarRight, SidebarLeft } from '../components/examroom';

const questions = [
  {
    _id: '637fac6c2972695a85ad4540',
    content: '1 + 1 = ?',
    type: 'SINGLE',
    options: [
      {
        ans: '3',
        value: '1',
      },
      {
        ans: '2',
        value: '2',
      },
      {
        ans: '1',
        value: '3',
      },
      {
        ans: '4',
        value: '4',
      },
    ],
    value: '2',
    deleted: false,
  },
  {
    _id: '637fac902972695a85ad4542',
    content: '1 giờ = ?',
    type: 'MULTIPLE',
    options: [
      {
        ans: '60 phút',
        value: '1',
      },
      {
        ans: '30 phút',
        value: '2',
      },
      {
        ans: '3600 giây',
        value: '3',
      },
      {
        ans: '1800 giây',
        value: '4',
      },
      {
        ans: '5 ngàn',
        value: '5',
      },
    ],
    value: '1-3',
    deleted: false,
  },
  {
    _id: '637fad8d2a5a5fd4d46d6eec',
    content: 'Mệnh giá tiền tệ VNĐ lớn nhất là bao nhiêu? (Chỉ ghi số)',
    type: 'TEXT',
    options: '500000',
    value: '500000',
    deleted: false,
  },
  {
    _id: '637fac6c2972695a85ad4541',
    content: '1 + 1 = ?',
    type: 'SINGLE',
    options: [
      {
        ans: '3',
        value: '1',
      },
      {
        ans: '2',
        value: '2',
      },
      {
        ans: '1',
        value: '3',
      },
      {
        ans: '4',
        value: '4',
      },
    ],
    value: '2',
    deleted: false,
  },
];

const ExamRoom = () => {
  return (
    <RootStyle>
      <SidebarLeft questions={questions} />
      <ExamContent questions={questions} />
      <SidebarRight />
    </RootStyle>
  );
};

const RootStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

export default ExamRoom;
