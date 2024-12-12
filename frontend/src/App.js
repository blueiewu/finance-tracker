import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <h1 className="text-center my-4">Personal Finance Tracker</h1>
        <Row>
          <Col md={4}>
            <TransactionForm />
          </Col>
          <Col md={8}>
            <Dashboard />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <TransactionList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;