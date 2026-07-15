import { Button, Dropdown } from "antd";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];

const CategoryNavbar = () => {
  return (
    <section className="w-full lg:py-2 flex justify-evenly bg-[#011E38]">
      <Dropdown
        menu={{ items }}
        placement="bottom"
        arrow={{ pointAtCenter: true }}
      >
        <Button>Category</Button>
      </Dropdown>
    </section>
  );
};

export default CategoryNavbar;
