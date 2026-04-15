export default class PrintService {
  static printElement(elementId: string, title: string = 'Belge') {
    const element = document.getElementById(elementId)
    if (!element) return

    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: 'Plus Jakarta Sans', sans-serif; padding: 2rem; color: #1e293b; }
            h1 { color: #2d5a27; border-bottom: 2px solid #2d5a27; padding-bottom: 0.5rem; margin-bottom: 1rem; }
            .print-card { border: 1px solid #ccc; padding: 2rem; border-radius: 16px; margin-bottom: 2rem; page-break-inside: avoid; }
            .badge { background: #fcd34d; padding: 0.2rem 0.5rem; border-radius: 8px; font-size: 0.8rem; font-weight: bold; }
            p { line-height: 1.6; }
            @media print {
              .no-print { display: none !important; }
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `)

    printWindow.document.close()

    setTimeout(() => {
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  static downloadAsFile(content: string, filename: string) {
    alert(`${filename} indiriliyor... (PDF simülasyonu)`)

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
