document.addEventListener('DOMContentLoaded', function () {
    // Example sales data (simulated)
    const salesData = [
        { date: '2023-01-05', category: 'Bakery', quantity: 3, total: 150 },
        { date: '2023-01-08', category: 'Dairy', quantity: 2, total: 1000 },
        { date: '2023-01-11', category: 'Meat', quantity: 2, total: 530 },
        { date: '2023-01-15', category: 'Produce', quantity: 2, total: 410 },
        { date: '2023-01-22', category: 'Frozen Foods', quantity: 2, total: 200 },
        { date: '2023-01-28', category: 'Cleaners', quantity: 2, total: 240 },
        // Add more sales data as needed
    ];

    const salesTable = document.getElementById('salesTable');

    // Populate sales table with data
    salesData.forEach((sale) => {
        const row = salesTable.insertRow(-1);
        const cellDate = row.insertCell(0);
        const cellCategory = row.insertCell(1);
        const cellQuantity = row.insertCell(2);
        const cellTotal = row.insertCell(3);

        cellDate.textContent = sale.date;
        cellCategory.textContent = sale.category;
        cellQuantity.textContent = sale.quantity;
        cellTotal.textContent = `$${sale.total.toFixed(2)}`;
    });
});''