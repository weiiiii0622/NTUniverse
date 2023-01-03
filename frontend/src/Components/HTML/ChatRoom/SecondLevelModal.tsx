import { Button, Drawer } from "antd";
import { LeftOutlined } from '@ant-design/icons';

interface ISecondLevelModal {
  secondOpen: boolean,
  showSecond(x: number): void,
  onForward(): void,
}

const SecondLevelModal = (props: ISecondLevelModal) => {
  const { secondOpen, onForward } = props;

  return (
    <>
      <Drawer
        title="Two-level Drawer"
        mask={false}
        closeIcon={<LeftOutlined />}
        onClose={onForward}
        open={secondOpen}
      >
        This is two-level drawer
      </Drawer>
    </>
  )
}

export default SecondLevelModal;

