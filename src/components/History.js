import { useState, useEffect } from "react";

const History = () => {
  
  const [transaction, setTransaction] = useState({
    title: '',
    expense: '',
    type: '',
  });

  const [transactions, setTransactions] = useState([]);

  let totalPositive = 0;
  let totalNegative = 0;
  let totalCombined = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === 'positive') {
      totalPositive += transaction.expense;
    } else if (transaction.type === 'negative') {
      totalNegative += transaction.expense;
    }
  });

  totalCombined = totalPositive + totalNegative;

  useEffect(() => {
    let storedTransactions = JSON.parse(localStorage.getItem('expense'));
    if (!storedTransactions || !storedTransactions.expense) {
      storedTransactions = { expense: [] };
      localStorage.setItem('expense', JSON.stringify(storedTransactions));
    }
    setTransactions(storedTransactions.expense || []);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
  
      const expenseValue = parseFloat(transaction.expense);
      const storedTransactions = JSON.parse(localStorage.getItem('expense'));
  
      const transactions = storedTransactions ? storedTransactions.expense : [];
  
      const type = expenseValue >= 0 ? 'positive' : 'negative';
  
      transactions.push({
        title: transaction.title,
        expense: expenseValue,
        type: type,
      });
  
      localStorage.setItem('expense', JSON.stringify({ expense: transactions }));
      setTransaction({
        title: '',
        expense: '',
        type: '',
      });
  
      setTransactions(transactions);
  
    } catch (error) {
      alert('Something went wrong! Please try again later.');
    }
  };

  const handleFormSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (!isNaN(parseFloat(transaction.expense)) && transaction.expense.trim() !== '') {
        handleSubmit(e);
      } 
    }
  };

  const [searchExpense, setExpense] = useState('');

  const handleSearchChange = (e) => {
    setExpense(e.target.value);
  }

  const filteredTransactions = transactions.filter((t) =>
    t.title.toLowerCase().includes(searchExpense.toLowerCase())
  );

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    localStorage.setItem('expense', JSON.stringify({ expense: updatedTransactions }));
    setTransactions(updatedTransactions);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-5"> 
      <div className="w-full md:w-6/12">
        <h3 className="text-xl font-medium">Budget Planner</h3>
        <div className="flex items-center bg-white border-indigo-100 rounded shadow p-2 mt-5 md:w-full overflow-hidden">
          <div className="flex items-center justify-center border-blue-400 bg-blue-400 shadow-md rounded-full h-10 w-10 md:h-14 md:w-14">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M7 6c0-1.1.9-2 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z" clipRule="evenodd"/>
              <path fillRule="evenodd" d="M2 11c0-1.1.9-2 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" clipRule="evenodd"/>
              <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
            </svg>
          </div>
          <div className="ml-3 text-center">
            <h4 className="text-base md:text-lg font-semibold">Balance: <span className="text-blue-400">₱{totalCombined}</span></h4>
          </div>
        </div>

        <div className="flex items-center bg-white border-indigo-100 rounded shadow p-2 mt-2 md:w-full overflow-hidden">
          <div className="flex items-center justify-center border-green-400 bg-green-400 shadow-md rounded-full h-10 w-10 md:h-14 md:w-14">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M4 5a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 6h16v6H4v-6Z" clipRule="evenodd"/>
              <path fillRule="evenodd" d="M5 14c0-.6.4-1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm5 0c0-.6.4-1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="ml-3 text-center">
            <h4 className="text-base md:text-lg font-semibold">Income: <span className="text-green-400">₱{totalPositive}</span></h4>
          </div>
        </div>

        <div className="flex items-center bg-white border-indigo-100 rounded shadow p-2 mt-2 md:w-full overflow-hidden">
          <div className="flex items-center justify-center border-red-400 bg-red-400 shadow-md rounded-full h-10 w-10 md:h-14 md:w-14">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M9 7V2.2a2 2 0 0 0-.5.4l-4 3.9a2 2 0 0 0-.3.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm2-2a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Zm0 3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Zm-6 4c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1H8a1 1 0 0 1-1-1v-6Zm8 1v1h-2v-1h2Zm0 3h-2v1h2v-1Zm-4-3v1H9v-1h2Zm0 3H9v1h2v-1Z" clipRule="evenodd"/>
            </svg> 
          </div>
          <div className="ml-3 text-center">
            <h4 className="text-base md:text-lg font-semibold">Expense: <span className="text-red-400">₱{Math.abs(totalNegative)}</span></h4>
          </div>
        </div>
      </div>

      <div className="w-full md:w-6/12">
        <h3 className="text-xl font-medium">Transactions</h3>
        
        <input
          type="text"
          placeholder="Type to search..."
          className="bg-white h-12 w-full px-3 mt-5 rounded shadow focus:outline-none hover:cursor-pointer"
          name="searchExpense"
          value={searchExpense}
          onChange={handleSearchChange}
        />
        
        {filteredTransactions.length > 0 && filteredTransactions.map((t, index) => (
          <div key={index} className="flex items-center justify-between h-12 bg-white border-indigo-100 rounded shadow p-3 mt-2 w-full overflow-hidden">
            <p>{t.title}</p>
            <div className="inline-flex items-center">
            <span className={` ${t.type >= 'positive' ? 'bg-green-100' : 'bg-red-100'}
              ${t.type >= 'positive' ? 'text-green-800' : 'text-red-800'} 
              text-sm font-medium me-2 px-2.5 py-0.5 rounded`
              }>₱ {t.expense}</span>
              <svg
                className="w-7 h-7 text-gray-800 hover:cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                onClick={() => handleDeleteTransaction(index)}
              >
                <path
                  fillRule="evenodd"
                  d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ))}

        <h3 className="text-xl font-medium mt-5">Add new transaction</h3>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-900 mt-5">Transaction name</label>
          <input
            type="text"
            placeholder="Type transaction"
            className="bg-white h-12 w-full px-3 mt-2 rounded shadow focus:outline-none hover:cursor-pointer"
            name="title"
            value={transaction.title}
            onChange={handleInputChange}
            required
          />
          <label className="block text-sm font-medium text-gray-900 mt-5">
            Amount: negative - expense, positive - income
          </label>
          <input
            type="number"
            placeholder="Type amount"
            className="bg-white h-12 w-full px-3 mt-2 rounded shadow focus:outline-none hover:cursor-pointer"
            name="expense"
            value={transaction.expense}
            onChange={handleInputChange}
            onKeyDown={handleFormSubmit}
            required
          />
          <button
            type="submit"
            className="w-full text-white bg-gradient-to-r mt-3 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 overflow-hidden"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div> 
  );
}
 
export default History;