"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { Table, Button,Form,Modal, Input, DatePicker} from "antd";
import { Expense} from "../interfaces/interface";
import { Summary } from "../interfaces/interface"; 
import {Row,Col} from "antd"
import moment from "moment";
const ExpenseSummary: FunctionComponent = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingExpense, setEditingExpense] = useState<Summary | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const accessToken = localStorage.getItem("accesstoken");
        const response = await axios.get("http://localhost:8000/api/user/expensessummary/", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setExpenses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleEdit = (record: Expense) => {
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
      await axios.delete(`http://localhost:8000/api/user/expensessummarydelete/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  const handleUpdate = async (values: any) => {
    try {
      const accessToken = localStorage.getItem("accesstoken");
      const response = await axios.put(`http://localhost:8000/api/user/expensessummaryedit/${editingExpense?.id}/`, {
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
        title:'Email Id',
        dataIndex:'email id',
        key :'emai id'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Summary) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <>
    <Table dataSource={expenses} columns={columns} rowKey="id" loading={loading} />
    <Modal
        title="Edit Expense"
        visible={!!editingExpense}
        onCancel={() => setEditingExpense(null)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleUpdate}>
            <Row>
                <Col md={6} sm={6} xl={6} lg={6}>
          <Form.Item name="amount" label="Amount" rules={[{ required: true, message: "Please input the amount!" }]}>
            <Input prefix="₹" suffix="INR" />
          </Form.Item>
          </Col>
          </Row>
          <Row>
              <Col md={6} sm={6} xl={6} lg={6}>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: "Please select the date!" }]}>
            <DatePicker />
          </Form.Item>
          </Col>
          </Row>
             <Row>
                <Col md={6} sm={6} xl={6} lg={6}>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input the description!" }]}>
            <Input />
          </Form.Item>
          </Col>
          </Row>
        </Form>
      </Modal>

    </>
    
  );
};

export default ExpenseSummary;
