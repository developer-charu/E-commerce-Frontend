import { Card } from "antd";
const { Meta } = Card;

const HomePageSectionCard = () => (
  <Card
    hoverable
    style={{ width: 250 }}
    cover={
      <img
        draggable={false}
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        height={200}
      />
    }
  >
    <Meta
      title="Europe Street beat"
      description="www.instagram.com"
    />
  </Card>
);
export default HomePageSectionCard;
