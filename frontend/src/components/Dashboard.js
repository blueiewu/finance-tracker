import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const [summary, setSummary] = useState({
    total_expenses: 0,
    total_income: 0,
    net_balance: 0,
    expense_categories: {}
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/summary');
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching summary', error);
      }
    };

    fetchSummary();
  }, []);

  const expenseCategoryData = {
    labels: Object.keys(summary.expense_categories),
    datasets: [{
      data: Object.values(summary.expense_categories),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', 
        '#4BC0C0', '#9966FF', '#FF9F40'
      ]
    }]
  };

  const financialOverviewData = {
    labels: ['Income', 'Expenses', 'Net Balance'],
    datasets: [{
      label: 'Financial Overview',
      data: [
        summary.total_income, 
        summary.total_expenses, 
        summary.net_balance
      ],
      backgroundColor: ['#28a745', '#dc3545', '#17a2b8']
    }]
  };

  return (
    <Row>
      <Col md={6}>
        <Card className="mb-4">
          <Card.Header>Financial Summary</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <h5>Total Income</h5>
                <p className="text-success">${summary.total_income.toFixed(2)}</p>
              </Col>
              <Col>
                <h5>Total Expenses</h5>
                <p className="text-danger">${summary.total_expenses.toFixed(2)}</p>
              </Col>
              <Col>
                <h5>Net Balance</h5>
                <p className="text-info">${summary.net_balance.toFixed(2)}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Expense Categories</Card.Header>
          <Card.Body>
            <Pie data={expenseCategoryData} />
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Header>Financial Overview</Card.Header>
          <Card.Body>
            <Bar 
              data={financialOverviewData} 
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false }
                }
              }} 
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Dashboard;
