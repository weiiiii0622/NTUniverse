import {
  MehOutlined,
  RadarChartOutlined,
  AimOutlined,
  BankOutlined,
  CommentOutlined,
  ReadOutlined,
  SmileOutlined,
  TeamOutlined,
  VerifiedOutlined,
  TrophyOutlined
} from '@ant-design/icons';

export default (props) => {
  const { x } = props;
  if (x === 0)
    return <BankOutlined style={{ fontSize: '200%' }} />
  if (x === 1)
    return <RadarChartOutlined style={{ fontSize: '200%' }} />
  if (x === 2)
    return <AimOutlined style={{ fontSize: '200%' }} />
  if (x === 3)
    return <MehOutlined style={{ fontSize: '200%' }} />
  if (x === 4)
    return <CommentOutlined style={{ fontSize: '200%' }} />
  if (x === 5)
    return <ReadOutlined style={{ fontSize: '200%' }} />
  if (x === 6)
    return <SmileOutlined style={{ fontSize: '200%' }} />
  if (x === 7)
    return <TeamOutlined style={{ fontSize: '200%' }} />
  if (x === 8)
    return <VerifiedOutlined style={{ fontSize: '200%' }} />
  else
    return <TrophyOutlined style={{ fontSize: '200%' }} />

}