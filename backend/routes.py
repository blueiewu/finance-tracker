from flask import request, jsonify
from app import app, db
from models import Transaction

@app.route('/transactions', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.order_by(Transaction.date.desc()).all()
    return jsonify([transaction.to_dict() for transaction in transactions])

@app.route('/transactions', methods=['POST'])
def add_transaction():
    data = request.json
    new_transaction = Transaction(
        amount=data['amount'],
        description=data['description'],
        category=data['category'],
        type=data['type']
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify(new_transaction.to_dict()), 201

@app.route('/transactions/<int:id>', methods=['DELETE'])
def delete_transaction(id):
    transaction = Transaction.query.get_or_404(id)
    db.session.delete(transaction)
    db.session.commit()
    return '', 204

@app.route('/summary', methods=['GET'])
def get_summary():
    expenses = Transaction.query.filter_by(type='expense').all()
    income = Transaction.query.filter_by(type='income').all()
    
    total_expenses = sum(exp.amount for exp in expenses)
    total_income = sum(inc.amount for inc in income)
    
    # Categorize expenses
    expense_categories = {}
    for exp in expenses:
        if exp.category in expense_categories:
            expense_categories[exp.category] += exp.amount
        else:
            expense_categories[exp.category] = exp.amount
    
    return jsonify({
        'total_expenses': total_expenses,
        'total_income': total_income,
        'net_balance': total_income - total_expenses,
        'expense_categories': expense_categories
    })