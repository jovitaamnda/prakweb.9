document.getElementById('generate-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Data penjualan produk selama satu minggu
    const salesData = [150, 123, 180, 240, 350, 210, 190];
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

    // Menambahkan judul
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text("Laporan Penjualan Mingguan", 20, 20);

    // Menambahkan subjudul
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text("Periode: 1 Jan 2024 - 7 Jan 2024", 20, 30);

    // Menambahkan grafik bar
    let barWidth = 20;
    let startX = 20;
    let startY = 50;
    let maxBarHeight = 60;

    // Menentukan skala
    let maxSale = Math.max(...salesData);
    let scale = maxBarHeight / maxSale;

    salesData.forEach((sale, index) => {
        let barHeight = sale * scale;
        doc.setFillColor(54, 209, 220); // Warna biru gradient-like
        doc.rect(startX + (index * (barWidth + 5)), startY + (maxBarHeight - barHeight), barWidth, barHeight, 'F');
        doc.setFontSize(10);
        doc.text(days[index], startX + (index * (barWidth + 5)) + 5, startY + maxBarHeight + 10);
    });

    // Menambahkan tabel
    const tableData = salesData.map((sale, index) => {
        return [days[index], sale, "Rp" + (sale * 1000)];
    });

    doc.autoTable({
        head: [['Hari', 'Produk Terjual', 'Pendapatan']],
        body: tableData,
        startY: startY + maxBarHeight + 20,
        styles: { fontSize: 12 },
        headStyles: { fillColor: [54, 209, 220] },
        bodyStyles: { fillColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    // Tampilkan PDF di browser
    doc.output('dataurlnewwindow');

    // Atau, gunakan kode ini untuk langsung mengunduh PDF
    // doc.save('Laporan_Penjualan.pdf');
});
