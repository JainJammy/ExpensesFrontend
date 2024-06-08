"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { Table, Button ,Form,Input,Modal,DatePicker} from "antd";
import { Income } from "../interfaces/interface"; 
import moment from "moment";
const IncomeSummary: FunctionComponent = () => {
    const [form] = Form.useForm();  
  const [income, setIncome] = useState<Income[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expenses, setExpenses] = useState<Income[]>([]);
  const [editingExpense, setEditingExpense] = useState<Income | null>(null);
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const accessToken = localStorage.getItem("accesstoken");
        const response = await axios.get("http://localhost:8000/api/user/incomesummary/", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setIncome(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching income:", error);
        setLoading(false);
      }
    };

    fetchIncome();
  }, []);

  const handleEdit = (record: Income) => {
    // Handle edit logic here
    setEditingExpense(record);
    form.setFieldsValue({
      amount: record.amount,
      date: moment(record.date),
      description: record.description
    });
  };

  const handleDelete = async (id: number) => {
    try {
      const accessToken = localStorage.getItem("accesstoken");
      await axios.delete(`http://localhost:8000/api/user/incomesummarydelete/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setIncome(income.filter(inc => inc.id !== id));
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };
  const handleUpdate = async (values: any) => {
    try {
      const accessToken = localStorage.getItem("accesstoken");
      const response = await axios.put(`http://localhost:8000/api/user/incomesummaryedit/${editingExpense?.id}/`, {
        ...values,
        date: values.date.format("YYYY-MM-DD")
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setExpenses(expenses.map(exp => (exp.id === editingExpense?.id ? response.data : exp)));
      setEditingExpense(null);
      form.resetFields();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };
  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
        title:"Email",
        dataIndex:'Email',
        key:"Email",
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Income) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <>
    <Table dataSource={income} columns={columns} rowKey="id" loading={loading} />
    <Modal
        title="Edit Expense"
        visible={!!editingExpense}
        onCancel={() => setEditingExpense(null)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item name="amount" label="Amount" rules={[{ required: true, message: "Please input the amount!" }]}>
            <Input prefix="₹" suffix="INR" />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: "Please select the date!" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input the description!" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

    </>
  );
};

export default IncomeSummary;
