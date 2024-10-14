interface CryptoGraphData {
    labels: string[]; // X-axis (e.g., timestamps or dates)
    datasets: Array<{
      label: string; // Name of the data set (e.g., 'Price')
      data: number[]; // Y-axis values (e.g., prices)
      borderColor?: string; // Line color
      backgroundColor?: string; // Fill color
    }>;
  }