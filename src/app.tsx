import { Layout, Menu, message } from "antd";
import { useEffect, useState } from "react";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { BellFilled, FallOutlined, RiseOutlined } from "@ant-design/icons";
import Incomes from "./pages/incomes";
import Expenses from "./pages/expenses";
import PaymentReminders from "./pages/payment-reminders";
import { MenuInfo } from "rc-menu/lib/interface";

const MENU_ITEMS: ItemType[] = [
  { key: "incomes", label: "Incomes", icon: <RiseOutlined /> },
  { key: "expenses", label: "Expenses", icon: <FallOutlined /> },
  { key: "reminders", label: "Payment Reminders", icon: <BellFilled /> },
];

const PAGES: { [key: string]: React.ComponentType } = {
  incomes: Incomes,
  expenses: Expenses,
  reminders: PaymentReminders,
};

const App = (): JSX.Element => {
  const [isCollapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed((isCollapsed) => !isCollapsed);

  const [activePage, setActivePage] = useState("incomes");

  useEffect(() => {
    message.warning(
      "This is a prototype. Your data will not be saved and is reset after refreshing or using the menu.",
      5
    );
  }, []);

  const onClickMenuItem = ({ key }: MenuInfo) => setActivePage(key);

  const Page = PAGES[activePage];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Layout.Sider collapsible collapsed={isCollapsed} onCollapse={toggleCollapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[activePage]}
          mode="inline"
          items={MENU_ITEMS}
          onClick={onClickMenuItem}
        />
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Layout.Content
          style={{
            margin: "16px",
          }}
        >
          <Page />
        </Layout.Content>
        <Layout.Footer
          style={{
            textAlign: "center",
          }}
        >
          © Expense Planner 2k22
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default App;
