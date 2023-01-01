import { Button, Drawer } from "antd";
import { LeftOutlined } from '@ant-design/icons';

interface ISecondLevelModal {
  secondOpen: boolean,
  showSecondLevel(): void,
  onForward(): void,
}

const SecondLevelModal = (props: ISecondLevelModal) => {
  const { secondOpen, showSecondLevel, onForward } = props;

  return (
    <>
      <Button type="primary" onClick={showSecondLevel}>
        Two-level drawer
      </Button>
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

