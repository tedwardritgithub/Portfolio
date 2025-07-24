// Sample data for charts
const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2,
        tension: 0.4
    }]
};

const usersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'New Users',
        data: [45, 60, 75, 90, 85, 100],
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        borderColor: 'rgba(46, 204, 113, 1)',
        borderWidth: 2,
        tension: 0.4
    }]
};

const revenueData = {
    labels: ['Direct', 'Referral', 'Social'],
    datasets: [{
        data: [55, 30, 15],
        backgroundColor: [
            'rgba(52, 152, 219, 0.8)',
            'rgba(46, 204, 113, 0.8)',
            'rgba(155, 89, 182, 0.8)'
        ]
    }]
};

// Chart configurations
const chartConfig = {
    sales: {
        type: 'line',
        data: salesData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    },
    users: {
        type: 'line',
        data: usersData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    },
    revenue: {
        type: 'doughnut',
        data: revenueData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    }
};

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all charts
    const salesChart = new Chart(
        document.getElementById('salesChart'),
        chartConfig.sales
    );

    const usersChart = new Chart(
        document.getElementById('usersChart'),
        chartConfig.users
    );

    const revenueChart = new Chart(
        document.getElementById('revenueChart'),
        chartConfig.revenue
    );

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Update stats with animation
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    });

    // Simulate real-time updates
    setInterval(() => {
        // Update sales data
        const newSalesData = [...salesData.datasets[0].data];
        newSalesData.shift();
        newSalesData.push(Math.floor(Math.random() * 100));
        salesData.datasets[0].data = newSalesData;
        salesChart.update();

        // Update users data
        const newUsersData = [...usersData.datasets[0].data];
        newUsersData.shift();
        newUsersData.push(Math.floor(Math.random() * 100));
        usersData.datasets[0].data = newUsersData;
        usersChart.update();
    }, 5000);
}); 