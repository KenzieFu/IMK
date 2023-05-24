import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const SalesChart = () => {
  const chartoptions = {
    series: [
      {
        name: "Fisika IX",
        data: [0, 31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Biologi IX",
        data: [0, 11, 32, 45, 32, 34, 52, 41],
      },
      {
        name: "Kimia X",
        data: [0, 34, 22, 50, 32, 23, 52, 21],
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
        ],
      },
    },
  };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Chart Peminjaman Buku</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Laporan Tahunan 
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;
