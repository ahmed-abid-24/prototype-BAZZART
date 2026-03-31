(function () {
  function isSeller() {
    const user = window.BazzartStore.getUser();
    return user && user.role === 'seller';
  }

  function computeData() {
    const staticOrders = window.BAZZART_DATA.orders;
    const userOrders = JSON.parse(localStorage.getItem('bazzart_checkout_orders') || '[]').map((o) => ({
      id: o.id,
      customer: o.customer,
      total: o.total,
      status: 'Confirme',
      date: o.date,
      month: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'][new Date(o.date).getMonth()]
    }));

    const orders = staticOrders.concat(userOrders);
    const sales = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
    const visits = 1800 + orders.length * 37;
    const conversion = visits ? ((orders.length / visits) * 100).toFixed(2) : '0.00';

    return { orders, sales, visits, conversion };
  }

  function renderKpi(data) {
    document.getElementById('kpiSales').textContent = window.BazzartUtils.formatPrice(data.sales);
    document.getElementById('kpiOrders').textContent = data.orders.length;
    document.getElementById('kpiVisits').textContent = data.visits;
    document.getElementById('kpiConv').textContent = data.conversion + '%';
  }

  function renderTable(data) {
    const tbody = document.getElementById('ordersBody');
    tbody.innerHTML = data.orders
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6)
      .map((o) => '<tr><td>' + o.id + '</td><td>' + o.customer + '</td><td>' + window.BazzartUtils.formatPrice(o.total) + '</td><td>' + o.status + '</td></tr>')
      .join('');
  }

  function renderTopProducts() {
    const mount = document.getElementById('topProducts');
    const list = window.BAZZART_DATA.products.slice().sort((a, b) => b.rating - a.rating).slice(0, 3);
    mount.innerHTML = list.map((p, idx) => '<li>#' + (idx + 1) + ' ' + p.name + ' - ' + window.BazzartUtils.formatPrice(p.price) + '</li>').join('');
  }

  function getWeekdayData(data) {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const today = new Date();
    const dayOfWeek = today.getDay() || 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek + 1);

    const weekTotals = days.map((d, i) => {
      const checkDate = new Date(monday);
      checkDate.setDate(monday.getDate() + i);
      const dateStr = checkDate.toISOString().split('T')[0];
      return data.orders
        .filter((o) => o.date.startsWith(dateStr))
        .reduce((sum, o) => sum + Number(o.total || 0), 0) / 100;
    });

    return { days: days.slice(0, dayOfWeek), totals: weekTotals.slice(0, dayOfWeek) };
  }

  function getHourlyTraffic() {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i + ':00');
    }
    const traffic = [45, 38, 22, 15, 12, 18, 35, 62, 85, 92, 88, 76, 72, 78, 82, 91, 98, 87, 76, 65, 54, 48, 42, 38];
    return { hours, traffic };
  }

  function renderCharts(data) {
    const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun'];
    const monthTotals = months.map((m) =>
      data.orders.filter((o) => o.month === m).reduce((sum, o) => sum + Number(o.total || 0), 0) / 1000
    );

    const weekData = getWeekdayData(data);
    const hourlyData = getHourlyTraffic();

    const ctxLine = document.getElementById('salesChart');
    const ctxPie = document.getElementById('catChart');
    const ctxWeek = document.getElementById('weekChart');
    const ctxTraffic = document.getElementById('trafficChart');

    const chartConfig = {
      line: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } }
      },
      other: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } }
      }
    };

    if (window.Chart && ctxLine) {
      new window.Chart(ctxLine, {
        type: 'line',
        data: {
          labels: months,
          datasets: [{
            label: 'Ventes (TND)',
            data: monthTotals,
            borderColor: '#0e1a35',
            backgroundColor: 'rgba(201,168,76,0.15)',
            borderWidth: 2.5,
            tension: 0.35,
            fill: true,
            pointBackgroundColor: '#c9a84c',
            pointBorderColor: '#0e1a35',
            pointRadius: 5,
            pointHoverRadius: 7
          }]
        },
        options: chartConfig.line
      });
    }

    if (window.Chart && ctxPie) {
      new window.Chart(ctxPie, {
        type: 'doughnut',
        data: {
          labels: ['Artisanat', 'Mode', 'Alimentaire', 'Beaute', 'Deco', 'Tech'],
          datasets: [{
            data: [24, 18, 14, 12, 16, 16],
            backgroundColor: ['#0e1a35', '#c9a84c', '#e3c97a', '#fbf4e2', '#8a8fa8', '#1a2340'],
            borderColor: '#fff',
            borderWidth: 2
          }]
        },
        options: chartConfig.other
      });
    }

    if (window.Chart && ctxWeek) {
      new window.Chart(ctxWeek, {
        type: 'bar',
        data: {
          labels: weekData.days,
          datasets: [{
            label: 'Ventes (TND)',
            data: weekData.totals,
            backgroundColor: 'rgba(201, 168, 76, 0.7)',
            borderColor: '#c9a84c',
            borderWidth: 1.5,
            borderRadius: 6
          }]
        },
        options: {
          ...chartConfig.other,
          indexAxis: undefined,
          scales: {
            y: { beginAtZero: true, border: { display: false }, grid: { color: 'rgba(0,0,0,0.05)' } }
          }
        }
      });
    }

    if (window.Chart && ctxTraffic) {
      new window.Chart(ctxTraffic, {
        type: 'area',
        data: {
          labels: hourlyData.hours,
          datasets: [{
            label: 'Visiteurs',
            data: hourlyData.traffic,
            borderColor: '#0e1a35',
            backgroundColor: 'rgba(14, 26, 53, 0.12)',
            borderWidth: 2,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent'
          }]
        },
        options: {
          ...chartConfig.other,
          scales: {
            y: { beginAtZero: true, border: { display: false }, grid: { color: 'rgba(0,0,0,0.05)' } }
          }
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const mount = document.getElementById('dashboardMount');
    if (!mount) {
      return;
    }

    if (!isSeller()) {
      mount.innerHTML = '<p class="notice">Acces reserve aux vendeurs. Connectez-vous avec un profil vendeur.</p><a class="btn btn-primary" href="login.html">Aller a la connexion</a>';
      return;
    }

    const data = computeData();
    renderKpi(data);
    renderTable(data);
    renderTopProducts();
    renderCharts(data);
  });
})();
