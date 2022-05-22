import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Popconfirm, Table, Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PaymentReminder from "../types/payment-reminder";

const PaymentReminders = () => {
  const [paymentReminders, setPaymentReminders] = useState<PaymentReminder[]>([
    { id: uuidv4(), name: "OnlyFans", amount: 10, date: "2022-05-22" },
  ]);

  const columns: ColumnType<PaymentReminder>[] = [
    { title: "Name", dataIndex: "name", key: "name", align: "center" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${Number(amount).toFixed(2)}`,
      align: "center",
    },
    { title: "Date", dataIndex: "date", key: "date", align: "center" },
    {
      title: "Operations",
      align: "center",
      render: (_, income) => (
        <>
          <Button icon={<EditFilled />} type="primary" />{" "}
          <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteRow(income.id)}>
            <Button icon={<DeleteFilled />} type="primary" danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  const onDeleteRow = (id: string) => {
    setPaymentReminders((paymentReminders) => paymentReminders.filter((paymentReminder) => paymentReminder.id !== id));
  };

  return (
    <>
      <Typography.Title>Payment Reminders</Typography.Title>
      <Table<PaymentReminder> columns={columns} dataSource={paymentReminders} rowKey="id"></Table>
    </>
  );
};

export default PaymentReminders;
