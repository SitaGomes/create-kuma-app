type MonthlyReportData = {
  email: string;
  userName: string;
  currentMonth: string;
  totalAmount: number;
  productOfMonth: string;
  totalInStock: number;
  totalScanned: number;
};

export const getMonthlyReportTemplate = ({
  email,
  userName,
  currentMonth,
  totalAmount,
  totalInStock,
  totalScanned,
  productOfMonth,
}: MonthlyReportData) => {
  return {
    to: email,
    subject: `Resumo do Estoque do mês de ${currentMonth} `,
    html: `
    <p>Prezado(a) ${userName},</p>
    <p>Esperamos que esteja bem. Gostaríamos de partilhar consigo o resumo do estoque do mês de ${currentMonth}.</p>
    
    <p>Resumo do Estoque do mês de ${currentMonth}:</p>
    <ul>
        <li><strong>Total Arrecadado:</strong> ${totalAmount}€</li>
        <li><strong>Produto do Mês:</strong> ${productOfMonth}</li>
        <li><strong>Total em Estoque:</strong> ${totalInStock}</li>
        <li><strong>Total Escaneado:</strong> ${totalScanned}</li>
    </ul>

    <p>Com os melhores cumprimentos,</p>
    <br/>
    <p><strong>IZACCI #LOGO</strong></p>
`,
  };
};
